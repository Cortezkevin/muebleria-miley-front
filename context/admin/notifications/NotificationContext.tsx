"use client";

import { createContext } from "react";

export interface NotificationProps {
  notifications: string[];
  count: number;

  requestPermission: () => void;
}
export const NotificationContext = createContext({} as NotificationProps);
