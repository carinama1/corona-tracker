import React, { useState, useEffect } from "react";
import { Box, makeStyles, Button } from "@material-ui/core";
import SelectionMenu from "../../components/SelectionMenu";
import { getGlobal, getCountryData } from "../../api/getData";
import { getCountries } from "../../api/getCountry";

const useStyles = makeStyles((theme) => ({
  root: {},
  wrapper: {
    display: "flex",
    alignItems: "center",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginBottom: 30,
  },
  dataContentWrapper: {
    display: "flex",
    alignItems: "center",
    flexWrap: "wrap",
    justifyContent: "space-evenly",
    marginBottom: 30,
    padding: 40,
    paddintTop: 0,
    [theme.breakpoints.down("xs")]: {
      padding: 0,
      paddingTop: 20,
    },
  },
  buttonPrimary: {
    background: theme.btn.primary,
    "&:hover": {
      opacity: 0.9,
      background: theme.btn.primary,
    },
  },
  contentWrapper: {
    "& > *": {
      "&:not(last-child)": {
        marginBottom: 20,
      },
    },
    // display: "flex",
  },
  dataWrapper: {
    width: "30%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 40,
    [theme.breakpoints.down("xs")]: {
      marginBottom: 20,
    },
    "& > *": {
      marginBottom: 20,
    },
  },
  l: {
    fontSize: theme.textSize.l,
    [theme.breakpoints.down("xs")]: { fontSize: theme.textSize.s },
  },
  m: { fontSize: theme.textSize.m },
  bm: { fontSize: theme.textSize.bm },
  data: {
    fontFamily: "'Iceland', monospace",
    fontSize: theme.textSize.xl,
    [theme.breakpoints.down("xs")]: { fontSize: theme.textSize.m },
  },
}));

const HomeView = () => {
  const [data, setData] = useState({});
  const [menuValue, setMenuValue] = useState("Global");
  const [countryList, setCountryList] = useState([]);

  const handleChange = (countryCode) => {
    setMenuValue(countryCode);
    getCountryData(countryCode).then(({ data }) => {
      if (data[0]) {
        setData(data[0]);
        return;
      }
      setData(data);
    });
  };

  const stringToInt = (val) => {
    if (val) {
      val = val.toString();
      let result = "";
      let temp = "";
      for (let i = 0; i < val.length; i++) {
        temp = `${val[val.length - i - 1]}${temp}`;
        if ((i + 1) % 3 === 0 && i !== val.length) {
          if (i === val.length - 1) {
            break;
          }
          result = `,${temp}${result}`;
          temp = "";
        }
      }
      return `${temp}${result}`;
    }
    return 0;
  };

  const getWordwideData = () => {
    getGlobal().then(({ data }) => {
      setData(data);
    });
  };

  const getCountry = () => {
    getCountries().then((data) => {
      setCountryList(data.data);
    });
  };

  useEffect(() => {
    getCountry();
    getWordwideData();
  }, []);

  const classes = useStyles();

  return (
    <Box>
      <div className={classes.wrapper}>
        <div className={classes.contentWrapper}>
          <h2 className={classes.m} style={{ fontWeight: "normal" }}>
            LATEST DATA
          </h2>
          <div className={classes.bm} style={{ color: "grey" }}>
            Updated 12 min ago
          </div>
          <div
            style={{
              height: "5px",
              width: "60px",
              background: "white",
              marginBottom: 0,
            }}
          ></div>
        </div>
        <Button className={classes.buttonPrimary}>ABOUT THE DATA</Button>
      </div>

      <SelectionMenu
        countryList={countryList}
        onChange={handleChange}
        value={menuValue}
      />
      {/* <Hidden xsDown> */}
      <div className={classes.dataContentWrapper}>
        <div className={classes.dataWrapper}>
          <h1 className={classes.data}>{stringToInt(data.totalConfirmed)}</h1>
          <div className={classes.l} style={{ color: "grey" }}>
            Confirmed
          </div>
        </div>
        <div className={classes.dataWrapper}>
          <h1 className={classes.data} style={{ color: "rgb(214, 102, 121)" }}>
            {stringToInt(data.totalDeaths)}
          </h1>
          <div className={classes.l} style={{ color: "grey" }}>
            Dead
          </div>
        </div>
        <div className={classes.dataWrapper}>
          <h1 className={classes.data} style={{ color: "rgb(113, 255, 47)" }}>
            {stringToInt(data.totalRecovered)}
          </h1>
          <div className={classes.l} style={{ color: "grey" }}>
            Recovered
          </div>
        </div>
        <div className={classes.dataWrapper}>
          <h1 className={classes.data}>{stringToInt(data.totalActiveCases)}</h1>
          <div className={classes.l} style={{ color: "grey" }}>
            Active Cases
          </div>
        </div>
        <div className={classes.dataWrapper}>
          <h1 className={classes.data}>
            {stringToInt(data.totalNewDeaths || data.dailyDeaths)}
          </h1>
          <div className={classes.l} style={{ color: "grey" }}>
            New Deaths
          </div>
        </div>
      </div>
      {/* </Hidden> */}
    </Box>
  );
};

export default HomeView;
