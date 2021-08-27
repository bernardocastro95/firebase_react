import firebase from 'firebase/app'
import 'firebase/firestore'

const firebaseConfig = {

    apiKey: "AIzaSyBiKPBoOjtKCR214a_ypmeRz6piAynbRi8",
  
    authDomain: "curso-20096.firebaseapp.com",
  
    projectId: "curso-20096",
  
    storageBucket: "curso-20096.appspot.com",
  
    messagingSenderId: "475247050718",
  
    appId: "1:475247050718:web:392bb7c83a61d6217ca74f",
  
    measurementId: "G-EH5XVNRNCB"
  
  };
  
  if(!firebase.apps.length){
    firebase.initializeApp(firebaseConfig);
  }
  
export default firebase;
  
  
  