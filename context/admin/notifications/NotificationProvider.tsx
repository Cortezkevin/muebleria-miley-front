"use client";

import React, { FC, ReactElement, useReducer } from "react";
import { NotificationContext, NotificationReducer } from "./";
import { useAuth } from "@/hooks/useAuth";
import { initializeApp } from 'firebase/app';
import { getMessaging, getToken, Messaging, onMessage } from "firebase/messaging";
import { onBackgroundMessage } from "firebase/messaging/sw";
import toast from "react-hot-toast";

interface Props {
  children: ReactElement | ReactElement[];
}
export interface NotificationState {
  notifications: string[];
  count: number;
}

const Notification_INITIAL_STATE: NotificationState = {
  notifications: [],
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
  const { isLogged } = useAuth();
  const [firebaseMessaging, setfirebaseMessaging] = React.useState<Messaging | undefined>(undefined);
  const [state, dispatch] = useReducer(NotificationReducer, Notification_INITIAL_STATE);
  
  React.useEffect(() => {
    if(!isLogged) return;
    initFirebase();
  }, [isLogged]);

  React.useEffect(() => {
    if(firebaseMessaging){
      requestPermission();
    }
  }, [firebaseMessaging])

  React.useEffect(() => {
    if(!firebaseMessaging) return;
    onMessage(firebaseMessaging, (payload) => {
      console.log("NOTIFICACION ENTRANTE")
      console.log('Message received. ', payload.notification);
      if(payload.notification){
        toast.success(payload.notification.body!);
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
            // TODO: Send to server

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