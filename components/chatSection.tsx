"use client";
import {
  AtSign,
  MoreVertical,
  Paperclip,
  Phone,
  Search,
  Send,
  Smile,
  Video,
  Image,
} from "lucide-react";
import React, { useEffect, useState } from "react";
import { useSelectedChat } from "@/context/SelectedChatContext";
import { getChatByUser } from "@/app/apis/getApis";
import LoadingSkeleton from "./loadingSkeleton";
import { useCurrentUser } from "@/context/currentUserContext";

interface Chat {
  id: number;
  fromUser: number;
  toUser: number;
  message: string;
  image?: string | null;
  timestamp: number;
}

function ChatSection() {
  const { selectedChat } = useSelectedChat();
  const [chat, setChat] = useState<Chat[]>([]);
  const [loading, setLoading] = useState(true);
  const { currentUser } = useCurrentUser();
  const currentUserId = 5;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const chatData = await getChatByUser(selectedChat?.id ?? 0);
        setChat(chatData);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [selectedChat]);

  useEffect(() => {
    console.log(chat);
  }, [chat]);

  if (loading) {
    return (
      <div className="w-full max-w-md mx-auto bg-base-100 shadow-xl rounded-box overflow-hidden p-4 my-4">
        <LoadingSkeleton />
      </div>
    );
  }

  return (
    <div className="flex-1 flex my-4 flex-col rounded-xl shadow-xl overflow-hidden">
      <div className="bg-base-100 p-4 flex items-center justify-between border-b border-base-300">
        <div className="flex items-center space-x-4">
          <div className="avatar">
            <div className="w-10 rounded-full">
              <img src={selectedChat?.profileImage} alt="Kevin's avatar" />
            </div>
          </div>
          <div>
            <h2 className="font-bold">{selectedChat?.username}</h2>
            <p className="text-sm text-base-content/70">
              {selectedChat?.position}
            </p>
          </div>
        </div>
        <div className="flex space-x-2">
          <button className="btn btn-circle btn-ghost">
            <Search className="h-6 w-6" />
          </button>
          <button className="btn btn-circle btn-ghost">
            <Phone className="h-6 w-6" />
          </button>
          <button className="btn btn-circle btn-ghost">
            <Video className="h-6 w-6" />
          </button>
          <button className="btn btn-circle btn-ghost">
            <MoreVertical className="h-6 w-6" />
          </button>
        </div>
      </div>

      {/* Chat Messages */}
      <div className="flex-1 bg-base-100 overflow-y-auto p-4 space-y-4">
        {chat.map((message) => {
          const isCurrentUser = message.fromUser === currentUserId;
          const messageTimestamp = new Date(message.timestamp).toLocaleString();

          return (
            <div
              key={message.id}
              className={`chat ${isCurrentUser ? "chat-end" : "chat-start"}`}
            >
              <div className="chat-image avatar">
                <div className="w-10 rounded-full">
                  <img
                    src={`${
                      isCurrentUser
                        ? currentUser?.profileImage
                        : selectedChat?.profileImage
                    }`}
                    alt={`${
                      isCurrentUser ? currentUser?.username : selectedChat?.username
                    } avatar`}
                  />
                </div>
              </div>
              <div className="chat-header">
                {isCurrentUser ? currentUser?.username : selectedChat?.username}
                <time className="text-xs opacity-50 ml-2">
                  {messageTimestamp}
                </time>
              </div>
              <div
                className={`chat-bubble ${
                  isCurrentUser ? "chat-bubble-primary" : "chat-bubble-white"
                }`}
              >
                {message.message}
                {message.image && (
                  <div className="mt-2">
                    <img
                      src={message.image}
                      alt="Message content"
                      className="rounded"
                    />
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Message Input */}
      <div className="bg-base-100 p-4 border-t border-base-300">
        <div className="flex items-center space-x-2">
          <input
            type="text"
            placeholder="Type a message here..."
            className="input input-bordered flex-1"
          />
          <button className="btn btn-circle btn-ghost">
            <AtSign className="h-6 w-6" />
          </button>
          <button className="btn btn-circle btn-ghost">
            <Paperclip className="h-6 w-6" />
          </button>
          <button className="btn btn-circle btn-ghost">
            <Image className="h-6 w-6" />
          </button>
          <button className="btn btn-circle btn-ghost">
            <Smile className="h-6 w-6" />
          </button>
          <button className="btn btn-circle btn-primary">
            <Send className="h-6 w-6" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default ChatSection;
