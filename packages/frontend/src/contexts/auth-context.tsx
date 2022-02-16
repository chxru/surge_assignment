import { createContext, useContext, useEffect, useState } from "react";
import type { API } from "@chxru/types";

const AuthContext = createContext<{
  user: API.Auth.PublicUserData | null;
  initiating: boolean;
  OnSignIn: (user: API.Auth.PublicUserData) => void;
  OnSignOut: () => void;
}>({
  user: null,
  initiating: true,
  OnSignIn: () => {},
  OnSignOut: () => {},
});

const AuthProvider = ({ children }: { children: JSX.Element }) => {
  const [user, setUser] = useState<API.Auth.PublicUserData | null>(null);
  const [initiating, setInitiating] = useState<boolean>(true);

  /**
   * Update user context when login
   *
   * @param {API.Auth.PublicUserData} user
   */
  const OnSignIn = (user: API.Auth.PublicUserData) => {
    setUser(user);
  };

  /**
   * Update user context when logout
   *
   */
  const OnSignOut = () => {
    setUser(null);
  };

  const RefreshData = async () => {
    const res = await fetch("/api/auth/refresh", {
      method: "GET",
      credentials: "include",
    });

    try {
      if (res.ok) {
        const { data }: { data: API.Auth.PublicUserData } = await res.json();
        setUser(data);
      }
    } catch (error) {
      // fail silently
    } finally {
      setInitiating(false);
    }
  };

  useEffect(() => {
    RefreshData();
  }, []);

  return (
    <AuthContext.Provider value={{ user, initiating, OnSignIn, OnSignOut }}>
      {children}
    </AuthContext.Provider>
  );
};

/**
 * Custom authentication hook
 *
 * @return {*}
 */
const useAuth = () => {
  return useContext(AuthContext);
};

export { AuthProvider, useAuth };
