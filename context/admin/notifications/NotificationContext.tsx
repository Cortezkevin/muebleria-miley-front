"use client";

import { NotificationDTO } from "@/types";
import { createContext } from "react";

export interface NotificationProps {
  loadingNotifications: boolean;
  notifications: NotificationDTO[];
  count: number;

  requestPermission: () => void;
}
export const NotificationContext = createContext({} as NotificationProps);
