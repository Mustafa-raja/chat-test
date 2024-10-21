import Sidebar from "@/components/sidebar";
import ChatList from "@/components/chatlist";
import ChatSection from "@/components/chatSection";
import Profile from "@/components/profile";

export default function Home() {
  return (
    <div className="flex h-screen bg-base-200 gap-4 text-base-content pr-4">
      <Sidebar />
      <ChatList />
      <ChatSection />
      <Profile/>
    </div>
  );
}
