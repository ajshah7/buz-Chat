import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Button from "./components/Button";
import Channel from "./components/Channel";
import "./App.css";

import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(1),
    color: "blue",
    textAlign: "center",
    height: "100vh",
  },
}));

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
  const classes = useStyles();
  const [user, setUser] = useState(() => auth.currentUser);
  const [initializing, setInitializing] = useState(true);

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
      await auth.signInWithPopup(provider);
      console.log("hi");
    } catch (error) {
      console.error(error);
    }
  };

  const signOut = async () => {
    try {
      await firebase.auth().signOut();
    } catch (error) {
      console.log(error.message);
    }
  };

  if (initializing)
    return (
      <p style={{ color: "white", textAlign: "center" }}>Loading chat..</p>
    );

  return (
    <div style={{ color: "black" }}>
      {user ? (
        <>
          <div className="navbar">
            <ul>
              <li>
                {" "}
                <h2>BuzzChat</h2>
              </li>

              <li className="signOut">
                <Button onClick={signOut}> Sign out </Button>
              </li>
            </ul>
          </div>
          <br />

          <Channel user={user} db={db} />
        </>
      ) : (
        <Grid container spacing={1} justify="center">
          <Grid item xs={11} sm={6}>
            <Paper className={classes.paper}>
              <div className="signInButton">
                <h1 className="signInHeader">Welcome to BuzChat</h1>
                <Button className="signInButton" onClick={signInWithGoogle}>
                  {" "}
                  Sign in with google{" "}
                </Button>
              </div>
            </Paper>
          </Grid>
        </Grid>
      )}
    </div>
  );
}

export default App;
