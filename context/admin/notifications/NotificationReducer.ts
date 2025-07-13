
import { NotificationState } from "./";

type NotificationAction =
  | {
      type: "[Notification] - Select Grocer";
      payload: undefined;
    };

export const NotificationReducer = (
  state: NotificationState,
  action: NotificationAction
): NotificationState => {
  switch (action.type) {
    default:
      return state;
  }
};
