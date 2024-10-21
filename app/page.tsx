import Sidebar from "@/components/sidebar";
import ChatList from "@/components/chatlist";
import ChatSection from "@/components/chatSection";
import Profile from "@/components/profile";
import Navbar from "@/components/navbar";

export default function Home() {
  return (
    <div className="flex h-screen bg-base-200 lg:gap-4 text-base-content lg:pr-4 lg:flex-row flex-col">
      <Navbar />
      <Sidebar />
      <ChatList />
      <ChatSection />
      <Profile/>
    </div>
  );
}
