"use client";

import React, { FC, ReactElement, useReducer } from "react";
import { NotificationContext, NotificationReducer } from "./";
import { useAuth } from "@/hooks/useAuth";
import { initializeApp } from 'firebase/app';
import { getMessaging, getToken, Messaging, onMessage } from "firebase/messaging";
import { onBackgroundMessage } from "firebase/messaging/sw";
import toast from "react-hot-toast";
import { AuthAPI, NotificationAPI } from "@/api";
import { NotificationDTO, SuccessResponseDTO } from "@/types";

interface Props {
  children: ReactElement | ReactElement[];
}
export interface NotificationState {
  notifications: NotificationDTO[];
  loadingNotifications: boolean;
  count: number;
}

const Notification_INITIAL_STATE: NotificationState = {
  notifications: [],
  loadingNotifications: false,
  count: 0
};

const firebaseConfig = {
  apiKey: "AIzaSyDQajbxY9jGYSrs-2bX2hW6k_NiJGPwfcM",
  authDomain: "miley-notifications.firebaseapp.com",
  projectId: "miley-notifications",
  storageBucket: "miley-notifications.firebasestorage.app",
  messagingSenderId: "1049096847240",
  appId: "1:1049096847240:web:aa48c7880ce6229ceb843d",
  measurementId: "G-3BDNQFMH7K"
};

export const NotificationProvider: FC<Props> = ({ children }) => {
  const { isLogged, userId } = useAuth();
  const [firebaseMessaging, setfirebaseMessaging] = React.useState<Messaging | undefined>(undefined);
  const [state, dispatch] = useReducer(NotificationReducer, Notification_INITIAL_STATE);
  
  React.useEffect(() => {
    if(!isLogged) {
      dispatch({
        type: "[Notification] - Load Notifications",
        payload: []
      });
      return;
    };
    initFirebase();
    loadNotifications();
  }, [isLogged]);

  React.useEffect(() => {
    if(firebaseMessaging){
      requestPermission();
    }
  }, [firebaseMessaging])

  React.useEffect(() => {
    if(!firebaseMessaging) return;
    onMessage(firebaseMessaging, (payload) => {
      console.log('Message received. ', payload.notification);
      if(payload.data && payload.notification){
        const extraData = payload.data as { date: string; id: string };
        dispatch({
          type: '[Notification] - Add Notification',
          payload: {
            body: payload.notification.body!,
            date: extraData.date,
            id: extraData.id,
            title: payload.notification.title!
          }
        })
        toast.success("Nueva notificacion entrante");
      }
    });
  }, [firebaseMessaging]);

  const initFirebase = async () => {
    const app = initializeApp(firebaseConfig);
    setfirebaseMessaging(getMessaging(app));
  }

  const getDeviceToken = async () => {
    if(firebaseMessaging && 'serviceWorker' in navigator){
        const registration = await navigator.serviceWorker.register('/firebase-messaging-sw.js');
        const token = await getToken(firebaseMessaging, { 
          vapidKey: "BE2A3xysE0JTXg4eE54EMLpbYj3LJSLsnEwLzJC1OrykIwa_1F8cwyjYS3N8-vWHEjAursyr0vfTpvqHbtHR0DQ", 
          serviceWorkerRegistration: registration
        });
        if(token){
          console.log("TOKEN IS READY: ", token);
          await AuthAPI.saveDeviceWebToken(userId!, token)
        }else {
          console.log("No registration token available.")
        }
        return;
    }
  }

  const requestPermission = async () => {
    console.log('Requesting permission...');
    Notification.requestPermission().then((permission) => {
      if (permission === 'granted') {
          console.log('Notification permission granted.');
          getDeviceToken();
      }
    });
  }

  const loadNotifications = async () => {
    dispatch({
      type: "[Notification] - Loading Notifications",
      payload: true
    });

    const response = await NotificationAPI.getFromSession();
    if( response.statusCode === "201" || response.success ){
      const data = response as SuccessResponseDTO<NotificationDTO[]>;
      dispatch({
        type: "[Notification] - Load Notifications",
        payload: data.content
      });
    }else {
      dispatch({
        type: "[Notification] - Loading Notifications",
        payload: false
      });
      toast.error(response.message);
    }
  }

  return (
    <NotificationContext.Provider
      value={{
        ...state,
        requestPermission
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
};