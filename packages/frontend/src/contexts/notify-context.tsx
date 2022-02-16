import React from "react";

/**
 * Context corresponding to showing alerts in overlay
 */
const NotifyContext = React.createContext<{
  success: (title: string, description?: string) => void;
  error: (title: string, description?: string) => void;
  warning: (title: string, description?: string) => void;
  info: (title: string, description?: string) => void;
}>({
  success: (title: string, description?: string) => {},
  error: (title: string, description?: string) => {},
  warning: (title: string, description?: string) => {},
  info: (title: string, description?: string) => {},
});

export default NotifyContext;
