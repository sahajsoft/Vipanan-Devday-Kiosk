"use client";

import { createContext, useState, ReactNode } from "react";

interface ConfirmationContextType {
  ask: boolean;
  change: (value: boolean) => void;
}

export const ConfirmationContext = createContext<ConfirmationContextType>({
  ask: false,
  change: () => {},
});

export function ConfirmationProvider({ children }: { children: ReactNode }) {
  const [ask, setAsk] = useState(false);

  const change = (value: boolean) => {
    setAsk(value);
  };

  return (
    <ConfirmationContext.Provider value={{ ask, change }}>
      {children}
    </ConfirmationContext.Provider>
  );
} 