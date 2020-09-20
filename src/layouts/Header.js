import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  makeStyles,
  IconButton,
  List,
  ListItem,
  Hidden,
  Drawer,
} from "@material-ui/core";

import MenuIcon from "@material-ui/icons/Menu";

const useStyles = makeStyles((theme) => ({
  root: {
    background: theme.background.primary,
    zIndex: 1400,
  },
  wrapper: {
    margin: "auto",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    maxWidth: 1440,
  },
  mobileList: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  list: {
    display: "flex",
    justifyContent: "space-evenly",
    alignItems: "center",
  },
  item: {
    width: "auto",
    cursor: "pointer",
    height: "100%",
    textAlign: "center",
    fontSize: theme.textSize.s,
    "&:hover": {
      fontWeight: "bold",
      borderBottom: "2px solid white",
    },
  },
  mobileDrawer: {
    width: "100%",
    height: "auto",
    top: 54,
    background: theme.background.primary,
  },
}));

const Header = () => {
  const [isMobileNavOpen, setMobileNavOpen] = useState(false);
  const classes = useStyles();
  return (
    <AppBar
      style={isMobileNavOpen ? { boxShadow: "none" } : {}}
      className={classes.root}
    >
      <Toolbar className={classes.wrapper}>
        <span style={{ cursor: "pointer" }}>CoronaTracker</span>
        <Hidden smDown>
          <List className={classes.list}>
            <ListItem className={classes.item}>Home</ListItem>
            <ListItem className={classes.item}>Travel</ListItem>
            <ListItem className={classes.item}>What is Covid-19</ListItem>
            <ListItem className={classes.item}>Analytic</ListItem>
            <ListItem className={classes.item}>About</ListItem>
          </List>
        </Hidden>
        <Hidden mdUp>
          <IconButton onClick={() => setMobileNavOpen(!isMobileNavOpen)}>
            <MenuIcon></MenuIcon>
          </IconButton>
          <Drawer
            anchor="top"
            classes={{
              paperAnchorTop: classes.mobileDrawer,
            }}
            onClose={() => setMobileNavOpen(false)}
            open={isMobileNavOpen}
            variant="temporary"
          >
            <List className={classes.mobileList}>
              <ListItem className={classes.item}>Home</ListItem>
              <ListItem className={classes.item}>Travel</ListItem>
              <ListItem className={classes.item}>What is Covid-19</ListItem>
              <ListItem className={classes.item}>Analytic</ListItem>
              <ListItem className={classes.item}>About</ListItem>
            </List>
          </Drawer>
        </Hidden>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
