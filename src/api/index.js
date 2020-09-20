import axios from "axios";

const fetch = async (url, headers) => {
  try {
    return await axios.request(url, { headers }).then((data) => {
      return data;
    });
  } catch (err) {
    return err;
  }
};

export default fetch;
