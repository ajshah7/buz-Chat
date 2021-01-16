import React from "react";
import Buttons from "@material-ui/core/Button";

const Button = ({ onClick = null, children = null }) => (
  <Buttons onClick={onClick} variant="contained" color="primary">
    {children}
  </Buttons>
);

export default Button;
