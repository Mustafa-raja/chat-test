import Sidebar from "@/app/components/sidebar";
import ChatList from "./components/chatlist";

export default function Home() {
  return (
    <div className="flex h-screen bg-base-200 text-base-content">
      <Sidebar />
      <ChatList />
    </div>
  );
}
