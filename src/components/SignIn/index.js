import React from "react";
import { Button, Grid, Header, Icon } from "semantic-ui-react";
import "./styles.scss";

const SignIn = ({ signInWithGoogle }) => (
  <Grid textAlign="center" verticalAlign="middle" className="sign-in-component">
    <Grid.Column className="col">
      <Header as="h2" color="teal" textAlign="center">
        Welcome user
      </Header>

      <Button color="blue" onClick={signInWithGoogle}>
        <Icon name="google" /> Sign In with Google
      </Button>
    </Grid.Column>
  </Grid>
);

export default SignIn;
