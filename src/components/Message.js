import React from "react";
import { formatRelative } from "date-fns";

import "./styles.scss";

import { Message as Messages } from "semantic-ui-react";

const Message = ({
  createdAt = null,
  text = "",
  displayName = "",
  email = "",
  photoURL = "",

  user,
}) => {
  return (
    <div
      className={
        user.email === email ? "message-wapper-right" : "message-wapper"
      }
    >
      <Messages icon>
        {photoURL ? (
          <img
            src={photoURL}
            className="avatar-img"
            alt="Avatar"
            width={45}
            height={45}
          />
        ) : (
          displayName && displayName
        )}
        <Messages.Content>
          <Messages.Header>
            <div className="message-box-header">
              {displayName ? <p>{displayName}</p> : "Anonymous"}{" "}
              {createdAt?.seconds ? (
                <span>
                  {formatRelative(
                    new Date(createdAt.seconds * 1000),
                    new Date()
                  )}
                </span>
              ) : null}
            </div>
          </Messages.Header>
          {text}
        </Messages.Content>
      </Messages>
    </div>
  );
};

export default Message;
