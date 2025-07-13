importScripts('https://www.gstatic.com/firebasejs/10.3.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.3.0/firebase-messaging-compat.js');

firebase.initializeApp({
  apiKey: "AIzaSyDQajbxY9jGYSrs-2bX2hW6k_NiJGPwfcM",
  authDomain: "miley-notifications.firebaseapp.com",
  projectId: "miley-notifications",
  storageBucket: "miley-notifications.firebasestorage.app",
  messagingSenderId: "1049096847240",
  appId: "1:1049096847240:web:aa48c7880ce6229ceb843d",
  measurementId: "G-3BDNQFMH7K"
});

const messaging = firebase.messaging();

// Este callback es opcional, solo si quieres manejar notificaciones personalizadas
messaging.onBackgroundMessage(function (payload) {
  console.log('[firebase-messaging-sw.js] Received background message ', payload);

  const notificationTitle = payload.notification?.title || 'Título por defecto';
  const notificationOptions = {
    body: payload.notification?.body || 'Cuerpo por defecto',
    icon: '/firebase-logo.png'
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});
