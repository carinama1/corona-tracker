import { createMuiTheme } from "@material-ui/core";
// import shadows from './shadows';
// import typography from './typography';

const theme = createMuiTheme({
  palette: {
    // background: {
    //   dark: '#F4F6F8',
    //   default: colors.common.white,
    //   paper: colors.common.white
    // },
    // primary: {
    //   main: colors.indigo[500]
    // },
    // secondary: {
    //   main: colors.indigo[500]
    // },
    // text: {
    //   primary: colors.blueGrey[900],
    //   secondary: colors.blueGrey[600]
    // }
  },
  background: {
    primary: "#212529",
  },
  btn: {
    primary: "#17a2b8",
  },
  mainTheme: {
    primary: "#17a2b8",
  },
  textColor: {
    primary: "primary",
  },
  textSize: {
    xl: 56,
    l: 36,
    m: 24,
    bm: 19,
    s: 16,
    xs: 12,
  },
  //   shadows,
  //   typography
});

export default theme;
