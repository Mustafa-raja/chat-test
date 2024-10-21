import React from "react";
import { Home, Building2, Users, Mail, Calendar, MessageSquare, Settings, HelpCircle} from 'lucide-react'


function Sidebar() {
  return (
    <div className="hidden lg:flex flex-col w-16 bg-primary text-primary-content">
      <div className="flex-1 flex flex-col items-center justify-start pt-5 gap-6">
        <Home />
        <Building2 />
        <Users />
        <Mail />
        <Calendar />
        <MessageSquare className="text-primary-content" />
        <Settings />
        <HelpCircle />
      </div>
      <div className="pb-5">
        <div className="avatar online">
          <div className="w-10 rounded-full">
            <img src="/placeholder.svg?height=40&width=40" alt="User avatar" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
