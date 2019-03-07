import firebase from 'firebase';
require  ("firebase/firestore");
  
  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyANlqBkCHMr27u0cx1nWyWCrjfvcPdG8yA",
    authDomain: "vue-commerce-700d8.firebaseapp.com",
    databaseURL: "https://vue-commerce-700d8.firebaseio.com",
    projectId: "vue-commerce-700d8",
    storageBucket: "vue-commerce-700d8.appspot.com",
    messagingSenderId: "921069063606"
  };
 const fb = firebase.initializeApp(config);
 const db = firebase.firestore();

 export {fb, db}
  