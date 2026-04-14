import axios from "axios";

const api = axios.create({
  baseURL: "https://backend-gerenciador-cliente.onrender.com"
});
export default api;
