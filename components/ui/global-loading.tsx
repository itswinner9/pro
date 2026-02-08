"use client";

import { createContext, useContext, useState, ReactNode } from "react";
import { FormLoading } from "./loading";

interface LoadingContextType {
  isLoading: boolean;
  message: string;
  setLoading: (loading: boolean, message?: string) => void;
}

const LoadingContext = createContext<LoadingContextType | undefined>(undefined);

export function LoadingProvider({ children }: { children: ReactNode }) {
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("Loading...");

  const setLoading = (loading: boolean, msg?: string) => {
    setIsLoading(loading);
    if (msg) setMessage(msg);
  };

  return (
    <LoadingContext.Provider value={{ isLoading, message, setLoading }}>
      {children}
      {isLoading && <FormLoading message={message} />}
    </LoadingContext.Provider>
  );
}

export function useLoading() {
  const context = useContext(LoadingContext);
  if (context === undefined) {
    throw new Error('useLoading must be used within a LoadingProvider');
  }
  return context;
}
