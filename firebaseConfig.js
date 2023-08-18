
  // Import the functions you need from the SDKs you need
  import { initializeApp } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-app.js";
  import { getFirestore ,  doc, setDoc, getDoc, collection, getDocs, updateDoc,addDoc,serverTimestamp} from "https://www.gstatic.com/firebasejs/10.1.0/firebase-firestore.js";
  import { getAuth , createUserWithEmailAndPassword, signInWithEmailAndPassword} from "https://www.gstatic.com/firebasejs/10.1.0/firebase-auth.js";
  import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-storage.js";

  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries

  // Your web app's Firebase configuration
  const firebaseConfig = {
    apiKey: "AIzaSyDUVdObC_kVHLFoV1jgqMmu1SnfibzU0mQ",
    authDomain: "food-app-7f879.firebaseapp.com",
    projectId: "food-app-7f879",
    storageBucket: "food-app-7f879.appspot.com",
    messagingSenderId: "436596150830",
    appId: "1:436596150830:web:3fd1f43ea68ca41dcec5bf"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);
  const db = getFirestore(app)
  const storage = getStorage();
  export{
      auth,
      createUserWithEmailAndPassword,
      db,
      doc,
      setDoc,
      getDoc,
      signInWithEmailAndPassword,
      collection,
      getDocs,
      updateDoc,
      storage,
      ref,
       uploadBytesResumable,
       getDownloadURL,
       addDoc,
       serverTimestamp
  }