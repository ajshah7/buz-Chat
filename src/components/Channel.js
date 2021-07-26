import React, { useState, useEffect } from "react";
import firebase from "firebase/app";
import Message from "./Message";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(1),
    backgroundColor: "transparent",

    color: theme.palette.text.secondary,
  },
}));

function Channel({ user, db }) {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");

  const [color, setColor] = useState("");

  const { uid, displayName, photoURL } = user;
  useEffect(() => {
    var messageBody = document.querySelector("#messageBody");
    messageBody.scrollTop = messageBody.scrollHeight - messageBody.clientHeight;
    if (db) {
      const unsubscribe = db
        .collection("messages")
        .orderBy("createdAt")
        .limit(100)
        .onSnapshot((querySnapshot) => {
          const data = querySnapshot.docs.map((doc) => ({
            ...doc.data(),
            id: doc.id,
          }));
          setMessages(data);
          console.log("*", messages);
        });
      return unsubscribe;
    }
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, [db]);

  const handleOnChange = (e) => {
    setNewMessage(e.target.value);
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();
    const colors = [
      { color: "red" },
      { color: "green" },
      { color: "blue" },
      { color: "yellow" },
    ];

    colors.map((color) => setColor(color));

    if (db) {
      db.collection("messages").add({
        text: newMessage,
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
        uid,
        displayName,
        photoURL,
        color,
      });
    }
  };
  const classes = useStyles();
  return (
    <>
      <div className="messageScroller" id="messageBody">
        {messages.map((message) => (
          <div key={message.id}>
            {" "}
            <Message {...message} />
          </div>
        ))}
      </div>

      <Grid container spacing={1} justify="center">
        <Grid item xs={12} sm={6}>
          <Paper className={classes.paper}>
            <form onSubmit={handleOnSubmit} className="formContainer">
              <input
                className="inputField"
                type="text"
                name="message"
                value={newMessage}
                onChange={handleOnChange}
                placeholder="Enter you messages"
              />
              <button
                className="sendButton"
                type="submit"
                disabled={!newMessage}
              >
                {" "}
                Sent
              </button>
            </form>
          </Paper>
        </Grid>
      </Grid>
    </>
  );
}

export default Channel;
