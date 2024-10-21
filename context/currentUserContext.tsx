import React, { createContext, useContext, useState, ReactNode } from "react";

interface Chat {
  id: number;
  username: string;
  position: string;
  address: string;
  phone: string;
  email: string;
  profileImage: string;
}

interface CurrentUserContextType {
  currentUser: Chat | null;
  setCurrentUser: (chat: Chat | null) => void;
}

const CurrentUserContext = createContext<CurrentUserContextType | undefined>(
  undefined
);

export const CurrentUserProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [currentUser, setCurrentUser] = useState<Chat | null>({
    id: 5,
    username: "Harry Potter",
    position: "Interviewee",
    address: "United Kingdom",
    phone: "+44 1617811222",
    email: "potter@test.com",
    profileImage: "https://picsum.photos/id/9/500/500",
  });

  return (
    <CurrentUserContext.Provider value={{ currentUser, setCurrentUser }}>
      {children}
    </CurrentUserContext.Provider>
  );
};

export const useCurrentUser = () => {
  const context = useContext(CurrentUserContext);
  if (context === undefined) {
    throw new Error("useCurrentUser must be used within a CurrentUserProvider");
  }
  return context;
};
