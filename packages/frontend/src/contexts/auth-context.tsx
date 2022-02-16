import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useNotify } from "./notify-context";
import type { API } from "@chxru/types";

import Splash from "../components/splash";

const AuthContext = createContext<{
  user: API.Auth.PublicUserData | null;
  initiating: boolean;
  OnSignIn: (user: API.Auth.PublicUserData) => void;
  OnSignOut: () => Promise<void>;
  UpdateUser: (user: API.Auth.PublicUserData) => void;
}>({
  user: null,
  initiating: true,
  OnSignIn: () => {},
  OnSignOut: async () => {},
  UpdateUser: () => {},
});

const AuthProvider = ({ children }: { children: JSX.Element }) => {
  const [user, setUser] = useState<API.Auth.PublicUserData | null>(null);
  const [initiating, setInitiating] = useState<boolean>(true);
  const navigate = useNavigate();
  const notify = useNotify();

  /**
   * Update user context when login
   *
   * @param {API.Auth.PublicUserData} u
   */
  const OnSignIn = (u: API.Auth.PublicUserData) => {
    setUser(u);
    window.open("/", "_self");
  };

  /**
   * Update user context when logout
   *
   */
  const OnSignOut = async () => {
    try {
      const res = await fetch("/api/auth/logout", {
        method: "POST",
        credentials: "include",
      });

      if (res.ok) {
        notify.success("Logged out successfully");
        setUser(null);
        navigate("/");
        return;
      }

      throw new Error("Res not okay");
    } catch (error) {
      if (error instanceof Error) {
        notify.error("Logging out failed", error.message);
      } else {
        notify.error("Logging out failed");
        console.error(error);
      }
    }
  };

  /**
   * Update auth context's user object
   *
   * @param {API.Auth.PublicUserData} u
   */
  const UpdateUser = (u: API.Auth.PublicUserData) => {
    setUser(u);
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
    <AuthContext.Provider
      value={{ user, initiating, OnSignIn, OnSignOut, UpdateUser }}
    >
      {initiating ? <Splash /> : children}
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
