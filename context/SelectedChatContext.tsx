// SelectedChatContext.tsx
import React, { createContext, useContext, useState, ReactNode } from 'react';

interface Chat {
  id: number;
  name: string;
}

interface SelectedChatContextType {
  selectedChat: Chat | null;
  setSelectedChat: (chat: Chat | null) => void;
}

const SelectedChatContext = createContext<SelectedChatContextType | undefined>(undefined);

export const SelectedChatProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [selectedChat, setSelectedChat] = useState<Chat | null>(null);

  return (
    <SelectedChatContext.Provider value={{ selectedChat, setSelectedChat }}>
      {children}
    </SelectedChatContext.Provider>
  );
};

export const useSelectedChat = () => {
  const context = useContext(SelectedChatContext);
  if (context === undefined) {
    throw new Error('useSelectedChat must be used within a SelectedChatProvider');
  }
  return context;
};
