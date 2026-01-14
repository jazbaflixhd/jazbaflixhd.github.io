<script>
firebase.initializeApp({
  apiKey: "AIzaSyDg9nJ36YnxwcSY0CPAIKXnc_9MDltlVRw",
  authDomain: "jazbaflix-push.firebaseapp.com",
  projectId: "jazbaflix-push",
  messagingSenderId: "294121382918",
  appId: "1:294121382918:web:c2a12d0485d56b754f0f87"
});

const messaging = firebase.messaging();

function requestPermission(){
Notification.requestPermission().then(permission=>{
if(permission==="granted"){
messaging.getToken({vapidKey:"BFGi7vl0HCYRweWv4qGWBIArkTZoOJVun-JFYhcJws7qdtB5QkKo19TRqbcd3Jd6A6oKdC585S-Who1fsBpQAk4"}).then(token=>{
console.log("TOKEN:",token);
});
}
});
}
</script>
