"use client";
import React, { ReactNode } from "react";

import { SelectedChatProvider } from "@/context/SelectedChatContext";
import { CurrentUserProvider } from "@/context/currentUserContext";

interface ProvidersProps {
  children: ReactNode;
}

export function Providers({ children }: ProvidersProps) {
  return (
    <SelectedChatProvider>
      <CurrentUserProvider>{children}</CurrentUserProvider>
    </SelectedChatProvider>
  );
}
