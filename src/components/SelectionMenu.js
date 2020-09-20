import React, { useState, useEffect } from "react";

import { MenuItem, Select, makeStyles } from "@material-ui/core";
import { getCountries } from "../api/getCountry";
import GlobeIcon from "../images/globe.png";
const useStyle = makeStyles(() => ({
  root: {},
  wrapper: {
    width: "100%",
    borderRadius: 5,
    color: "white",
    maxHeight: 200,
  },
  item: {
    color: "black",
    display: "flex",
    alignSelf: "center",
  },
}));

const SelectionMenu = ({ value, onChange, countryList }) => {
  const [isMenuOpen, setMenuOpen] = useState(false);
  const classes = useStyle();

  return (
    <Select
      className={classes.wrapper}
      open={isMenuOpen}
      onClose={() => setMenuOpen(false)}
      onOpen={() => setMenuOpen(true)}
      width="100%"
      value={value}
      onChange={(e) => {
        onChange(e.target.value);
      }}
    >
      <MenuItem className={classes.item} value={"Global"}>
        <img
          style={{ width: 20, height: 20, marginRight: 20 }}
          src={GlobeIcon}
          alt="🌐"
        ></img>
        Global
      </MenuItem>
      {countryList.map((country, index) => {
        return (
          <MenuItem
            key={index}
            className={classes.item}
            value={country.countryCode}
          >
            <img
              style={{ width: 20, marginRight: 20 }}
              src={`https://www.countryflags.io/${country.countryCode}/flat/64.png`}
              alt=" "
            />
            {country.countryName}
          </MenuItem>
        );
      })}
    </Select>
  );
};

export default SelectionMenu;
