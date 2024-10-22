"use client";
import { MapPin, MessageSquare, UserRoundPlus, Video } from "lucide-react";
import React from "react";
import { useSelectedChat } from "@/context/SelectedChatContext";
import LoadingSkeleton from "./loadingSkeleton";
function Profile() {
  const { selectedChat } = useSelectedChat();

  if (selectedChat == null) {
    return (
      <div className="hidden lg:block w-80 max-w-sm mx-auto bg-base-100 shadow-xl rounded-box overflow-hidden p-4 my-4">
        <LoadingSkeleton />
      </div>
    );
  }

  return (
    <div className="hidden lg:block w-80 bg-base-100 border border-base-300 my-4 overflow-scroll rounded-xl">
      <div className="avatar relative ">
        <div className="w-full ">
          <img src={selectedChat?.profileImage} alt="selected chat" />
        </div>
      </div>
      <div className=" relative z-10 -mt-16 flex items-center  justify-center ">
        <div className="w-64 text-center mb-4 bg-base-100 rounded-3xl">
          <h2 className="text-xl font-bold mt-4">{selectedChat?.username}</h2>
          <p className="text-base-content/70">{selectedChat?.position}</p>
          <p className="flex justify-center gap-2 items-center mt-2">
            <MapPin />
            {selectedChat?.address}
          </p>
          <div className="flex justify-center mt-4 space-x-2">
            <button className="btn btn-circle btn-outline">
              <UserRoundPlus className="h-6 w-6" />
            </button>
            <button className="btn btn-circle btn-primary">
              <MessageSquare className="h-6 w-6" />
            </button>
            <button className="btn btn-circle btn-error">
              <Video className="h-6 w-6" />
            </button>
          </div>
        </div>
      </div>
      <div className=" flex flex-col p-4 border-t gap-3 border-base-300">
        <h3 className="font-bold mb-2">User Information</h3>
        <p className="flex flex-col justify-between">
          <span className="text-sm font-semibold text-gray-500">Phone</span>
          <span className="font-medium">{selectedChat?.phone}</span>
        </p>
        <p className="flex flex-col justify-between">
          <span className="text-sm font-semibold text-gray-500">Email</span>
          <span className="font-medium">{selectedChat?.email}</span>
        </p>
      </div>
      <div className="p-4 border-t border-base-300">
        <h3 className="font-bold mb-2">Group Participants</h3>
        <div className="flex items-center space-x-2">
          <div className="avatar placeholder">
            <div className="bg-yellow-200 text-black rounded-full w-8">
              <span>M</span>
            </div>
          </div>
          <span>Marketing</span>
          <span className="badge badge-sm badge-neutral">+2</span>
        </div>
      </div>
      <div className="p-4 border-t border-base-300">
        <h3 className="font-bold mb-2">Media</h3>
        <div className="grid grid-cols-3 gap-2">
          <img
            src="/images/picture1.jpg"
            alt="Media 1"
            className="rounded object-cover w-full h-full"
          />
          <img
            src="/images/picture2.jpg"
            alt="Media 2"
            className="rounded object-cover w-full h-full"
          />
          <img
            src="/images/picture3.jpg"
            alt="Media 3"
            className="rounded object-cover w-full h-full"
          />
        </div>
      </div>
    </div>
  );
}

export default Profile;
