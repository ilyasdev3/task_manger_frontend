import axios from "axios";
const env = import.meta.env;

const axiosInstance = () => {
  const token = localStorage.getItem("taskManagerToken");

  //setting the enviroment
  let url: any = env.VITE_APP_BACKEND_URL;

  const enviroment = `${url}/api`;
  return axios.create({
    baseURL: enviroment,
    headers: {
      authorization: token ? `Bearer ${token}` : null,
    },
  });
};

export default axiosInstance;
