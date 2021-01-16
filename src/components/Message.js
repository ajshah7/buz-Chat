import React from "react";
import { formatRelative } from "date-fns";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";

import Avatar from "@material-ui/core/Avatar";

import Typography from "@material-ui/core/Typography";
import { red } from "@material-ui/core/colors";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(1),
    backgroundColor: "transparent",

    color: theme.palette.text.secondary,
  },
  avatar: {
    backgroundColor: red[500],
  },
}));

const Message = ({
  createdAt = null,
  text = "",
  displayName = "",
  photoURL = "",
  color = "",
}) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Grid container spacing={1} justify="center">
        <Grid item xs={12} sm={6}>
          <Paper className={classes.paper}>
            <Card className={classes.root} style={{ backgroundColor: color }}>
              <CardHeader
                avatar={
                  <Avatar aria-label="recipe" className={classes.avatar}>
                    {photoURL ? (
                      <img src={photoURL} alt="Avatar" width={45} height={45} />
                    ) : (
                      "A"
                    )}
                  </Avatar>
                }
                title={displayName ? <p>{displayName}</p> : null}
                subheader={
                  createdAt?.seconds ? (
                    <span>
                      {formatRelative(
                        new Date(createdAt.seconds * 1000),
                        new Date()
                      )}
                    </span>
                  ) : null
                }
              />

              <CardContent>
                <Typography variant="body2" color="textSecondary" component="p">
                  {text}
                </Typography>
              </CardContent>
            </Card>
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
};

export default Message;
