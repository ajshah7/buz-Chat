import React from "react";

import { Button as Buttons } from "semantic-ui-react";

const Button = ({ onClick = null, children = null, loading = null }) => (
  <Buttons
    loading={loading}
    onClick={onClick}
    variant="contained"
    color="primary"
  >
    {children}
  </Buttons>
);

export default Button;
