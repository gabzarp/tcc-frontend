import axios from "axios";

const api = axios.create({
  baseURL: "https://tcc-cooperativa-backend.herokuapp.com/",
});

export default api;
