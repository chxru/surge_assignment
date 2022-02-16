import React from "react";
import { useToast, UseToastOptions } from "@chakra-ui/react";

import NotificationContext from "../contexts/notify-context";

/**
 * Overlay for chakra-toasts
 *
 * @param {*} { children }
 * @return {*}
 */
const NotificationOverlay: React.FC = ({ children }) => {
  const toast = useToast();

  // common settings for toasts
  const common: UseToastOptions = {
    position: "bottom-right",
    isClosable: true,
    duration: 2500,
  };

  const success = (title: string, description?: string) => {
    toast({
      title,
      description,
      status: "success",
      ...common,
    });
  };

  const error = (title: string, description?: string) => {
    toast({
      title,
      description,
      status: "error",
      ...common,
    });
  };

  const warning = (title: string, description?: string) => {
    toast({
      title,
      description,
      status: "warning",
      ...common,
    });
  };

  const info = (title: string, description?: string) => {
    toast({
      title,
      description,
      status: "info",
      ...common,
    });
  };

  return (
    <NotificationContext.Provider value={{ success, error, warning, info }}>
      <div style={{ width: "100vw", height: "100vh" }}>{children}</div>
    </NotificationContext.Provider>
  );
};

export default NotificationOverlay;
