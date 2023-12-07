import axios from "axios";

const axiosInstance = () => {
  const token = localStorage.getItem("taskManagerToken");

  //setting the enviroment
  let url: any = "http://localhost:5000";

  const enviroment = `${url}/api`;
  return axios.create({
    baseURL: enviroment,
    headers: {
      authorization: token ? `Bearer ${token}` : null,
    },
  });
};

export default axiosInstance;
