"use client";

import { createContext, useState, ReactNode, useContext } from "react";

interface ConfirmationContextType {
  ask: boolean;
  change: (value: boolean) => void;
}

const ConfirmationContext = createContext<ConfirmationContextType>({
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

// Custom hook for using the confirmation context
export function useConfirmation() {
  const context = useContext(ConfirmationContext);
  
  if (context === undefined) {
    throw new Error("useConfirmation must be used within a ConfirmationProvider");
  }
  
  return context;
}

export { ConfirmationContext }; 