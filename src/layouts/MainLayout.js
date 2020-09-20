import React from "react";
import { Outlet } from "react-router-dom";
import { makeStyles } from "@material-ui/core";
import Header from "./Header";

const useStyles = makeStyles(() => ({
  root: {
    display: "flex",
    height: "100%",
    overflow: "hidden",
    width: "100%",
  },
  wrapper: {
    display: "flex",
    flex: "1 1 auto",
    overflow: "hidden",
    paddingTop: 64,
  },
  contentContainer: {
    display: "flex",
    flex: "1 1 auto",
    overflow: "hidden",
  },
  content: {
    flex: "1 1 auto",
    margin: "auto",
    height: "100%",
    overflow: "auto",
    maxWidth: 1440,
    padding: 24,
  },
}));

const MainLayout = () => {
  const classes = useStyles();

  return (
    <div>
      <Header />
      <div className={classes.wrapper}>
        <div className={classes.content}>
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default MainLayout;
