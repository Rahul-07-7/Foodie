import axios from "axios";

const instance = axios.create({
  baseURL: "https://foodie-kb4r.onrender.com/api",
});

export default instance;
