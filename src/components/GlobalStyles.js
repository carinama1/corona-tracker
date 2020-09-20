import { createStyles, makeStyles } from "@material-ui/core";

const useStyles = makeStyles(() =>
  createStyles({
    "@global": {
      "*": {
        boxSizing: "border-box",
        margin: 0,
        padding: 0,
        fontFamily: "'Roboto', sans-serif",
        color: "white",
      },

      "*::-webkit-scrollbar": {
        width: "10px",
      },

      /* Track */
      "*::-webkit-scrollbar-track": {
        background: "#f1f1f1",
      },

      /* Handle */
      "*::-webkit-scrollbar-thumb": {
        background: "#888",
      },

      /* Handle on hover */
      "*::-webkit-scrollbar-thumb:hover": {
        background: "#555",
      },
      html: {
        "-webkit-font-smoothing": "antialiased",
        "-moz-osx-font-smoothing": "grayscale",
        height: "100%",
        width: "100%",
      },
      body: {
        backgroundColor: "#212529",
        height: "100%",
        width: "100%",
      },
      a: {
        textDecoration: "none",
      },
      "#root": {
        height: "100%",
        width: "100%",
      },
      h1: {
        fontSize: 56,
      },
    },
  })
);

const GlobalStyles = () => {
  useStyles();

  return null;
};

export default GlobalStyles;
