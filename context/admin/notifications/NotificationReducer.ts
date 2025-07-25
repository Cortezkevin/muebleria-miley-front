
import { NotificationDTO } from "@/types";
import { NotificationState } from "./";

type NotificationAction =
  | {
      type: "[Notification] - Loading Notifications";
      payload: boolean;
    }
  | {
      type: "[Notification] - Add Notification";
      payload: NotificationDTO;
    }
  | {
      type: "[Notification] - Load Notifications";
      payload: NotificationDTO[];
    };

export const NotificationReducer = (
  state: NotificationState,
  action: NotificationAction
): NotificationState => {
  switch (action.type) {
    case "[Notification] - Add Notification":
      const newNotifications = [
          ...state.notifications,
          action.payload
      ];
      return {
        ...state,
        notifications: newNotifications,
        count: newNotifications.length
      }
    case "[Notification] - Loading Notifications":
      return {
        ...state,
        loadingNotifications: action.payload
      }
    case "[Notification] - Load Notifications":
      console.log("Notifications " , action.payload)
      return {
        ...state,
        count: action.payload.length,
        loadingNotifications: false,
        notifications: action.payload
      }
    default:
      return state;
  }
};
