import Sidebar from "@/components/sidebar";
import ChatList from "@/components/chatlist";
import ChatSection from "@/components/chatSection";

export default function Home() {
  return (
    <div className="flex h-screen bg-base-200 gap-4 text-base-content">
      <Sidebar />
      <ChatList />
      <ChatSection />
    </div>
  );
}
