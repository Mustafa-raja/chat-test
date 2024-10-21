"use client";
import React, { useState, useEffect } from "react";
import { Check, Plus, Search } from "lucide-react";
import { getUsers, getGroups } from "../apis/getApis";

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

  const LoadingSkeleton = () => (
    <div className="animate-pulse">
      <div className="h-10 bg-base-300 rounded mb-4"></div>
      {[...Array(4)].map((_, i) => (
        <div key={i} className="flex items-center space-x-4 mb-4">
          <div className="w-12 h-12 bg-base-300 rounded-full"></div>
          <div className="flex-1">
            <div className="h-4 bg-base-300 rounded w-3/4 mb-2"></div>
            <div className="h-3 bg-base-300 rounded w-1/2"></div>
          </div>
        </div>
      ))}
    </div>
  );

  if (loading) {
    return (
      <div className="w-full max-w-md mx-auto bg-base-100 shadow-xl rounded-box overflow-hidden p-4">
        <LoadingSkeleton />
      </div>
    );
  }

  return (
    <div className="w-full max-w-md  mx-auto flex flex-1 flex-col gap-4 p-4 my-4">
      <div className="p-4 gap-2 flex flex-[10] overflow-scroll flex-col bg-base-100 rounded-2xl">
        <div className="relative">
          <input
            type="text"
            placeholder="Search Contact"
            className="input input-bordered w-full pl-10"
          />
          <Search className="absolute left-3 top-3 h-5 w-5 text-base-content opacity-60" />
        </div>
        {users.map((user) => (
          <div key={user.id} className="flex items-center space-x-4">
            <div className="avatar">
              <div className="w-12 h-12 rounded-full">
                <img src={user.profileImage} alt={user.username} />
              </div>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium truncate">{user.username}</p>
              <p className="text-sm text-base-content text-opacity-60 truncate">
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
      <div className="p-4 flex flex-[10] overflow-scroll flex-col gap-2 bg-base-100 ">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">Groups ({groups.length})</h2>
          <button className="btn btn-ghost btn-square btn-sm">
            <Plus className="h-5 w-5" />
          </button>
        </div>
        {groups.map((group, index) => (
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
                      <span className="text-xs">+{group.users.length - 2}</span>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
