import React from "react";
import {
  Home,
  Building2,
  Users,
  Mail,
  Calendar,
  MessageSquare,
  Settings,
  HelpCircle,
} from "lucide-react";
import Image from "next/image";

function Sidebar() {
  return (
    <div className="hidden lg:flex flex-col w-16  text-primary-content mt-4 ">
      <div className="flex flex-col items-center justify-start p-5 gap-8 bg-primary rounded-r-xl">
        <Home />
        <Building2 />
        <Users />
        <Mail />
        <Calendar />
        <MessageSquare className="text-primary-content" />
        <Settings />
        <HelpCircle />
      </div>
      <div className="flex-1 flex items-end p-5">
        <div className="avatar online">
          <div className="w-10 rounded-full">
            <Image
              src="/placeholder.svg?height=40&width=40"
              alt="User avatar"
              height={20}
              width={20}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
