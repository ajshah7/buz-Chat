import React from "react";
import "./styles.scss";
import { Label, Popup, Image } from "semantic-ui-react";

function NavBar({ loading, signOut, user }) {
  return (
    <div className="navbar-component">
      <h2>BuzzChat</h2>
      <Popup
        on="click"
        pinned
        className="options-wrapper"
        trigger={
          <Label as="a" className="profile-link">
            <Image avatar spaced="right" src={user?.photoURL} />
            {user?.displayName?.toUpperCase().length > 10
              ? user?.displayName
                  ?.toUpperCase()
                  .split(" ")
                  .slice(0, -1)
                  .join(" ")
              : user?.displayName}
          </Label>
        }
        position="bottom center"
      >
        <p className="logout-navbar-button" onClick={signOut}>
          Log out
        </p>
      </Popup>
    </div>
  );
}

export default NavBar;
