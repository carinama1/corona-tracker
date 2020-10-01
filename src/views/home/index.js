import React, { useState, useEffect } from "react";
import { Box, makeStyles, Button, TextField } from "@material-ui/core";
import SelectionMenu from "../../components/SelectionMenu";
import NewsView from "./NewsView";
import { getGlobal, getCountryData } from "../../api/getData";
import { getCountries } from "../../api/getCountry";
import { getNewsData } from "../../api/getData";
import sortingValue from "../../utils/sorting";
import timeAgo from "../../utils/time";
import PieView from "./PieView";

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
    alignItems: "flex-start",
    flexWrap: "wrap",
    justifyContent: "space-evenly",
    padding: 40,
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
  pagination: {
    "& .MuiPaginationItem-outlined": {
      border: "1px solid rgba(255,255,255,1)",
      color: "white",
    },
    "& .Mui-selected": {
      color: "white",
      background: "rgba(255,255,255,0.3)",
    },
    "& .MuiPaginationItem-ellipsis": {
      color: "white",
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
    fontWeight: "normal",
    fontSize: theme.textSize.xl,
    [theme.breakpoints.down("xs")]: { fontSize: theme.textSize.m },
  },
  selectionWrapper: {
    display: "flex",
  },
  selectionItem: {
    flex: 1,
    padding: 10,
    border: "1px solid white",
    borderLeft: "none",
    textAlign: "center",
    cursor: "pointer",
    "&:hover": {
      background: "white",
      color: "black",
    },
    "&:first-of-type": {
      borderRadius: "5px 0px 0px 5px",
      border: "1px solid white",
    },
    "&:last-of-type": {
      borderRadius: "0px 5px 5px 0px",
      border: "1px solid white",
      borderLeft: "none",
    },
  },
  active: {
    boxShadow: "0 0 0 0.2rem rgba(248,249,250,.5)",
    background: "white",
    color: "black",
  },
  th: {
    fontFamily: "'Iceland', monospace",
    fontSize: theme.textSize.bm,
    letterSpacing: 1,
    padding: 10,
  },
  td: {
    fontFamily: "'Iceland', monospace",
    fontSize: theme.textSize.bm,
    padding: 10,
    borderTop: "1px solid rgba(255,255,255,0.2)",
  },
  textfield: {
    color: "white",
    "& .MuiInput-input": {
      color: "white",
    },
    "& .MuiInput-underline:before": {
      borderBottom: "1px solid white",
    },
    "& .MuiInput-underline:after": {
      borderBottom: "2px solid #17a2b8",
    },
  },
}));

const optionLists = ["Overview", "Table", "Pie"];

const HomeView = () => {
  const [data, setData] = useState({});
  const [menuValue, setMenuValue] = useState("Global");
  const [countryList, setCountryList] = useState([]);
  const [activeOption, setActiveOption] = useState(0);
  const [countryValue, setCountryValue] = useState("");
  const [newsData, setNewsData] = useState(0);
  const [filteredData, setFilteredData] = useState([]);

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

  const sortBytable = (key, isasc) => {
    const sortedData = countryList.sort(sortingValue(key, isasc));
    setFilteredData(JSON.parse(JSON.stringify(sortedData)));
    // setFilteredData(sortedData);
  };

  const handleSearchCountry = (e) => {
    if (e.target.value) {
      const results = countryList.filter((item) => {
        return item.countryName.includes(e.target.value);
      });
      setFilteredData(results);
    } else {
      setFilteredData(countryList);
    }
    setCountryValue(e.target.value);
  };

  const DisplayPieView = () => {
    return <PieView data={countryList} />;
  };

  const TableView = () => {
    return (
      <>
        <div
          style={{
            width: "100%",
            height: 380,
            overflow: "auto",
          }}
        >
          <div style={{ minWidth: 780 }}>
            <table style={{ width: "100%", borderSpacing: 0 }}>
              <thead>
                <tr>
                  <th className={classes.th} align="left">
                    <span
                      style={{ cursor: "pointer", fontFamily: "inherit" }}
                      onClick={() => sortBytable("countryName")}
                    >
                      Location
                    </span>
                  </th>
                  <th className={classes.th} align="left">
                    <span
                      style={{ cursor: "pointer", fontFamily: "inherit" }}
                      onClick={() => sortBytable("confirmed", "desc")}
                    >
                      Confirmed
                    </span>
                  </th>
                  <th
                    style={{ color: "rgb(214, 102, 121)" }}
                    className={classes.th}
                    align="left"
                  >
                    <span
                      style={{ cursor: "pointer", fontFamily: "inherit" }}
                      onClick={() => sortBytable("deaths", "desc")}
                    >
                      Dead
                    </span>
                  </th>
                  <th
                    style={{ color: "rgb(113, 255, 47)" }}
                    className={classes.th}
                    align="left"
                  >
                    <span
                      style={{ cursor: "pointer", fontFamily: "inherit" }}
                      onClick={() => sortBytable("recovered", "desc")}
                    >
                      Recovered
                    </span>
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredData.map((item, index) => {
                  return (
                    <tr key={index}>
                      <td className={classes.td}>
                        <img
                          style={{ width: 20, marginRight: 20 }}
                          src={`https://www.countryflags.io/${item.countryCode}/flat/64.png`}
                          alt=" "
                        />
                        {item.countryName}
                      </td>
                      <td className={classes.td}>
                        {stringToInt(item.confirmed)}
                      </td>
                      <td
                        className={classes.td}
                        style={{ color: "rgb(214, 102, 121)" }}
                      >
                        {stringToInt(item.deaths)}
                      </td>
                      <td
                        className={classes.td}
                        style={{ color: "rgb(113, 255, 47)" }}
                      >
                        {stringToInt(item.recovered)}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </>
    );
  };

  const OverView = () => {
    console.log(data);
    return (
      <>
        <div
          style={{
            display: "flex",
            alignItems: "flex-start",
            flexWrap: "wrap",
            justifyContent: "space-evenly",
          }}
        >
          <div className={classes.dataWrapper}>
            <h1 className={classes.data}>{stringToInt(data.totalConfirmed)}</h1>
            <div className={classes.l} style={{ color: "grey" }}>
              Confirmed
            </div>
          </div>
          <div className={classes.dataWrapper}>
            <h1
              className={classes.data}
              style={{ color: "rgb(214, 102, 121)" }}
            >
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
            <h1 className={classes.data}>
              {stringToInt(data.totalActiveCases || data.activeCases)}
            </h1>
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
      </>
    );
  };

  const RenderOption = () => {
    const Option = [OverView, TableView, DisplayPieView];
    const ToRender = Option[activeOption];
    return <ToRender />;
  };

  const handleChangeOption = (value) => {
    if (value === 0 || value === 1) {
      setCountryList(countryList.sort(sortingValue("countryName")));
    }
    if (value === 2) {
      setCountryList(countryList.sort(sortingValue("confirmed", "desc")));
    }
    setActiveOption(value);
  };

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

  const getLastNewsData = () => {
    getNewsData().then(({ data }) => {
      setNewsData(data);
    });
  };

  const handleChangeNewsPage = (page) => {
    getNewsData(page).then(({ data }) => {
      setNewsData(data);
    });
  };

  const getWordwideData = () => {
    getGlobal().then(({ data }) => {
      setData(data);
    });
  };

  const getCountry = () => {
    getCountries().then(({ data }) => {
      const sortedData = data.sort(sortingValue("countryName"));
      setCountryList(sortedData);
      setFilteredData(sortedData);
    });
  };

  useEffect(() => {
    getCountry();
    getWordwideData();
    getLastNewsData();
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
            Updated {timeAgo(data.created || data.lastUpdated)}
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
        <Button className={classes.buttonPrimary}>
          <a
            href="http://api.coronatracker.com/"
            target="_blank"
            rel="noopener noreferrer"
          >
            ABOUT THE DATA
          </a>
        </Button>
      </div>
      <div
        style={{
          height: 450,
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-around",
        }}
      >
        {activeOption === 0 && (
          <SelectionMenu
            countryList={countryList}
            onChange={handleChange}
            value={menuValue}
          />
        )}
        {activeOption === 1 && (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              marginBottom: -10,
            }}
          >
            <span style={{ marginRight: 10 }}>Search : </span>
            <TextField
              onChange={handleSearchCountry}
              classes={{ root: classes.textfield }}
              value={countryValue}
            />
          </div>
        )}

        {/* <Hidden xsDown> */}
        <div className={classes.dataContentWrapper}>
          <RenderOption />
        </div>
      </div>
      <div className={classes.selectionWrapper}>
        {optionLists.map((list, index) => {
          return (
            <div
              className={`${classes.selectionItem} ${
                activeOption === index ? classes.active : ""
              }`}
              onClick={() => handleChangeOption(index)}
              key={index}
            >
              {list}
            </div>
          );
        })}
      </div>
      <NewsView handleChange={handleChangeNewsPage} data={newsData} />
      {/* </Hidden> */}
    </Box>
  );
};

export default HomeView;
