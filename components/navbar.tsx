"use client";
import { ArrowLeft } from "lucide-react";
import React from "react";
import { useMobileChat } from "@/context/mobileChatContext";

function Navbar() {
  const { mobileChat, setMobileChat } = useMobileChat();

  const handleNav = () => {
    if (mobileChat?.showChatSection) {
      setMobileChat({
        isMobileView: true,
        showChatSection: !mobileChat?.showChatSection,
      });
    }
  };

  return (
    <div className="lg:hidden navbar bg-primary">
      <div className="flex-none">
        <button
          className={`btn btn-square ${
            !mobileChat?.showChatSection ? "btn-disabled" : ""
          } btn-ghost text-white`}
          onClick={handleNav}
        >
          <ArrowLeft />
        </button>
      </div>
      <div className="flex-1">
        <a className="btn btn-ghost text-xl text-white">Chat</a>
      </div>
    </div>
  );
}

export default Navbar;
