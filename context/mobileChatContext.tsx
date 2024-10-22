import React, { createContext, useContext, useState, ReactNode } from "react";

interface Mobile {
  isMobileView: boolean;
  showChatSection: boolean;
}

interface MobileChatContextType {
  mobileChat: Mobile | null;
  setMobileChat: (chat: Mobile | null) => void;
}

const MobileChatContext = createContext<MobileChatContextType | undefined>(
  undefined
);

export const MobileChatProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [mobileChat, setMobileChat] = useState<Mobile | null>({
    isMobileView: false,
    showChatSection: false,
  });

  return (
    <MobileChatContext.Provider value={{ mobileChat, setMobileChat }}>
      {children}
    </MobileChatContext.Provider>
  );
};

export const useMobileChat = () => {
  const context = useContext(MobileChatContext);
  if (context === undefined) {
    throw new Error("useMobileChat must be used within a MobileChatProvider");
  }
  return context;
};
