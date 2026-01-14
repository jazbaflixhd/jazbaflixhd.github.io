importScripts('https://www.gstatic.com/firebasejs/9.23.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/9.23.0/firebase-messaging-compat.js');

firebase.initializeApp({
  apiKey: "AIzaSyDg9nJ36YnxwcSY0CPAIKXnc_9MDltlVRw",
  authDomain: "jazbaflix-push.firebaseapp.com",
  projectId: "jazbaflix-push",
  messagingSenderId: "294121382918",
  appId: "1:294121382918:web:c2a12d0485d56b754f0f87"
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage(function(payload) {
  self.registration.showNotification(payload.notification.title, {
    body: payload.notification.body,
    icon: payload.notification.icon,
    data:{url:payload.notification.click_action}
  });
});
