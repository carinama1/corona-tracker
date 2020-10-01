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

const getNewsData = async (page = 0, limit = 9) => {
  return await fetch(
    `https://api.coronatracker.com/news/trending?limit=${limit}&offset=${
      page * limit
    }&language=en`
  );
};

export { getGlobal, getCountryData, getNewsData };
