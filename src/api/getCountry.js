import fetch from "./index";

const getCountries = async () => {
  return await fetch("https://api.coronatracker.com/v2/analytics/country");
};

export { getCountries };
