import axios from "axios";

const api = axios.create({
  baseURL: "https://backend-gerenciador-clientes.onrender.com"
});
export default api;
