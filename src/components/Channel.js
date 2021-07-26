import React, { useState, useEffect } from "react";
import firebase from "firebase/app";
import Message from "./Message";
import { Grid, Form, Segment, Dimmer, Loader } from "semantic-ui-react";
import "./styles.scss";

function Channel({ user, db }) {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const { uid, displayName, email, photoURL } = user;
  useEffect(() => {
    setLoading(true);
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

          var objDiv = document.getElementById("messageBody");
          objDiv.scrollTop = objDiv.scrollHeight;
          navigator.vibrate(200);
        });
      setLoading(false);
      return unsubscribe;
    }
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, [db]);

  const handleOnChange = (e) => {
    setNewMessage(e.target.value);
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();

    if (db) {
      db.collection("messages").add({
        text: newMessage,
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
        uid,
        displayName,
        photoURL,
        email,
      });
      setNewMessage("");
    }
  };

  return (
    <Grid columns={1} centered>
      {loading ? (
        <Dimmer active>
          <Loader> please wait...</Loader>
        </Dimmer>
      ) : null}
      <Grid.Column>
        <Segment>
          <div className="messageScroller" id="messageBody">
            {messages.map((message) => (
              <div key={message.id}>
                <Message user={user} {...message} />
              </div>
            ))}
          </div>
        </Segment>
      </Grid.Column>
      <Grid.Column computer={8} mobile={16} className="send-message-wrapper">
        <Segment>
          <Form onSubmit={handleOnSubmit}>
            <Form.Group>
              <Form.Input
                className="message-field"
                type="text"
                name="message"
                value={newMessage}
                onChange={handleOnChange}
                placeholder="Enter you messages"
              />
              <Form.Button
                floated="right"
                className="btn"
                content="Send"
                type="submit"
                disabled={!newMessage}
              />
            </Form.Group>
          </Form>
        </Segment>
      </Grid.Column>
    </Grid>
  );
}

export default Channel;
