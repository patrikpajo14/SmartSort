import { createContext, useContext } from "react";
import type { PropsWithChildren } from "react";
import { useStorageState } from "@/hooks/useStorageState";
import { router } from "expo-router";

// 1. Define the AuthContext and its types
const AuthContext = createContext<{
  signIn: () => void;
  signOut: () => void;
  session?: string | null;
  isLoading: boolean;
} | null>(null);

// 2. Hook to consume context safely
export function useSession() {
  const value = useContext(AuthContext); // useContext instead of use()
  if (!value) {
    throw new Error("useSession must be wrapped in a <SessionProvider />");
  }
  return value;
}

// 3. Provider to wrap your app
export function SessionProvider({ children }: PropsWithChildren) {
  const [[isLoading, session], setSession] = useStorageState("session");

  const authContextValue = {
    signIn: () => {
      // Perform sign-in logic here
      setSession("xxx");
    },
    signOut: () => {
      setSession(null);
    },
    session,
    isLoading,
  };

  return (
    <AuthContext.Provider value={authContextValue}>
      {children}
    </AuthContext.Provider>
  );
}
