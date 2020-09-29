import fetch from "./index";

const getGlobal = async () => {
  return await fetch(
    "https://api.coronatracker.com/v3/stats/worldometer/global"
  );
};

const getCountryData = async (countryCode) => {
  if (countryCode === "Global") {
    return await getGlobal();
  }
  return await fetch(
    `https://api.coronatracker.com/v3/stats/worldometer/country?countryCode=${countryCode}`
  );
};

const getNewsData = async () => {
  return await fetch(
    "https://api.coronatracker.com/news/trending?limit=9&offset=0&language=en"
  );
};

export { getGlobal, getCountryData, getNewsData };
