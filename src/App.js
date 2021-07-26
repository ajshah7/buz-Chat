import React, { useState, useEffect } from "react";

import Channel from "./components/Channel";
import "./App.css";
import {} from "semantic-ui-react";
import { Dimmer, Loader } from "semantic-ui-react";
import SignIn from "./components/SignIn";
import NavBar from "./components/NavBar";

import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

firebase.initializeApp({
  apiKey: "AIzaSyB9Zh-j_0ORyoLTKTm5CmmAdsEl698tvJg",
  authDomain: "buzchat-bcf23.firebaseapp.com",
  projectId: "buzchat-bcf23",
  storageBucket: "buzchat-bcf23.appspot.com",
  messagingSenderId: "640695160081",
  appId: "1:640695160081:web:978c7655b323ab0a0590b0",
  measurementId: "G-YDMVJ48QEC",
});

const auth = firebase.auth();
const db = firebase.firestore();
function App() {
  const [user, setUser] = useState(() => auth.currentUser);
  const [initializing, setInitializing] = useState(true);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
      if (initializing) {
        setInitializing(false);
      }
    });
    return unsubscribe;
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const signInWithGoogle = async () => {
    const provider = new firebase.auth.GoogleAuthProvider();

    auth.useDeviceLanguage();
    try {
      setLoading(true);
      await auth.signInWithPopup(provider);
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  const signOut = async () => {
    try {
      setLoading(true);
      await firebase.auth().signOut();
      setLoading(false);
    } catch (error) {
      console.log(error.message);
      setLoading(false);
    }
  };

  if (initializing)
    return (
      <Dimmer active>
        <Loader> fetching messages...</Loader>
      </Dimmer>
    );

  return (
    <div style={{ color: "black" }}>
      {user ? (
        <>
          <NavBar user={user} loading={loading} signOut={signOut} />

          <Channel user={user} db={db} />
        </>
      ) : (
        <SignIn signInWithGoogle={signInWithGoogle} />
      )}
    </div>
  );
}

export default App;
