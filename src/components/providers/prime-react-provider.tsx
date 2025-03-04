"use client";

import { PrimeReactProvider } from "primereact/api";
import React from "react";

export function PrimeReactProviders({ children }: { children: React.ReactNode }) {
  return (
    <PrimeReactProvider>
      {children}
    </PrimeReactProvider>
  );
} 