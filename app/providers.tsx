"use client";
import React, { ReactNode } from "react";

import { SelectedChatProvider } from "@/context/SelectedChatContext";
import { CurrentUserProvider } from "@/context/currentUserContext";
import { MobileChatProvider } from "@/context/mobileChatContext";
interface ProvidersProps {
  children: ReactNode;
}

export function Providers({ children }: ProvidersProps) {
  return (
    <MobileChatProvider>
      <SelectedChatProvider>
        <CurrentUserProvider>{children}</CurrentUserProvider>
      </SelectedChatProvider>
    </MobileChatProvider>
  );
}
