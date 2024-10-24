"use client";
import React, { useState, useEffect } from "react";
import { Check, Plus, Search } from "lucide-react";
import { getUsers, getGroups } from "../app/apis/getApis";
import LoadingSkeleton from "./loadingSkeleton";
import { useSelectedChat } from "@/context/SelectedChatContext";
import { useMobileChat } from "@/context/mobileChatContext";

interface User {
  id: number;
  username: string;
  position: string;
  address: string;
  phone: string;
  email: string;
  profileImage: string;
}

interface Group {
  id: number;
  name: string;
  users: number[];
}

export default function ChatList() {
  const [users, setUsers] = useState<User[]>([]);
  const [groups, setGroups] = useState<Group[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState(""); 
  const { selectedChat, setSelectedChat } = useSelectedChat();
  const { mobileChat, setMobileChat } = useMobileChat();

  useEffect(() => {
    const handleResize = () => {
      setMobileChat({
        isMobileView: window.innerWidth < 1024,
        showChatSection: mobileChat?.showChatSection ?? true,
      });
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [usersData, groupsData] = await Promise.all([
          getUsers(),
          getGroups(),
        ]);
        setUsers(usersData);
        setGroups(groupsData);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleSelectUser = (user: User) => {
    setSelectedChat(user);
    if (mobileChat?.isMobileView) {
      setMobileChat({ isMobileView: true, showChatSection: true });
    }
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const filteredUsers = users.filter((user) =>
    user.username.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredGroups = groups.filter((group) =>
    group.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div className="w-full max-w-sm mx-auto bg-base-100 shadow-xl rounded-box overflow-hidden p-4 my-4">
        <LoadingSkeleton />
      </div>
    );
  }

  return (
    <div
      className={`${
        mobileChat?.showChatSection ? "hidden lg:" : ""
      }flex w-full lg:max-w-[300px] px-auto flex-col flex-1 gap-3 p-4 lg:p-0 lg:py-4 `}
    >
      <div
        className={`p-4 flex flex-col flex-[65] bg-base-100 shadow-xl rounded-box `}
      >
        <div className="sticky top-0 bg-transparent z-10 relative">
          <input
            type="text"
            placeholder="Search Contact"
            className="input input-bordered w-full pl-10"
            value={searchTerm}
            onChange={handleSearchChange}
          />
          <Search className="absolute left-3 top-3 h-5 w-5 text-base-content opacity-60" />
        </div>
        <div className="mt-4 flex flex-[90] flex-col space-y-2 overflow-scroll">
          {filteredUsers.map((user) => (
            <div
              onClick={() => handleSelectUser(user)}
              key={user.id}
              className={`btn ${
                user.id == selectedChat?.id ? "btn-active" : "btn-ghost"
              } btn-lg items-center text-left space-x-1 px-1`}
            >
              <div className="avatar">
                <div className="w-12 h-12 rounded-full">
                  <img src={user.profileImage} alt={user.username} />
                </div>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate">
                  {user.username}
                  {user.id == 5 ? " (You)" : ""}
                </p>
                <p className="text-xs font-light text-base-content text-opacity-60 truncate">
                  {user.position}
                </p>
              </div>
              <div className="flex flex-col items-end">
                <p className="text-xs text-base-content text-opacity-60">
                  {new Date().toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </p>
                <div className="badge badge-primary badge-sm mt-1">
                  {Math.floor(Math.random() * 3)}
                </div>
              </div>
              <Check className="h-4 w-4 text-primary" />
            </div>
          ))}
        </div>
        <div className="mt-6 flex flex-[10] space-x-4">
          <button className="btn btn-md btn-primary flex-1">Meeting</button>
          <button className="btn btn-md btn-outline flex-1">Schedule</button>
        </div>
      </div>
      <div className="hidden px-4 pb-4 lg:flex flex-col flex-[35] bg-base-100 shadow-xl rounded-box overflow-scroll">
        <div className="flex sticky top-0 bg-base-100 z-10 justify-between items-center pt-4 mb-4">
          <h2 className="text-lg font-semibold">
            Groups ({filteredGroups.length})
          </h2>
          <button className="btn btn-ghost btn-square btn-sm">
            <Plus className="h-5 w-5" />
          </button>
        </div>
        <div className="space-y-3">
          {filteredGroups.map((group, index) => (
            <div key={group.id} className="flex items-center space-x-3">
              <div
                className={`w-8 h-8 rounded-lg bg-${
                  ["purple", "yellow", "pink", "green", "orange"][index % 5]
                }-200 flex items-center justify-center`}
              >
                <span className="text-sm font-medium">{group.name[0]}</span>
              </div>
              <span className="text-sm flex-1">{group.name}</span>
              {group.users.length > 0 && (
                <div className="avatar-group -space-x-6">
                  {group.users.slice(0, 2).map((userId) => (
                    <div key={userId} className="avatar">
                      <div className="w-6">
                        <img
                          src={
                            users.find((u) => u.id === userId)?.profileImage ||
                            "/placeholder.svg?height=24&width=24"
                          }
                          alt={`Member ${userId}`}
                        />
                      </div>
                    </div>
                  ))}
                  {group.users.length > 2 && (
                    <div className="avatar placeholder">
                      <div className="w-6 bg-neutral-focus text-neutral-content">
                        <span className="text-xs">
                          +{group.users.length - 2}
                        </span>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
