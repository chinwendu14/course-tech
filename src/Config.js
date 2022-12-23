// const BASE_URL = "https://sampleapi.coure-tech.com/api";
// export default BASE_URL;

import axios from "axios";

const BASE_URL = axios.create({
  baseURL: "https://sampleapi.coure-tech.com/api",
});

export default BASE_URL;
