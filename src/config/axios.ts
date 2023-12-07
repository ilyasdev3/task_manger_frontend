import axios from "axios";

const axiosInstance = () => {
  const token = localStorage.getItem("taskManagerToken");

  //setting the enviroment
  let url: any = "http://localhost:5000";
  if (process.env.NODE_ENV === "production") {
    url = process.env.REACT_APP_BACKEND_URL;
  } else if (process.env.NODE_ENV === "development") {
    url = process.env.REACT_APP_BACKEND_URL;
  } else {
    url = process.env.REACT_APP_BACKEND_URL;
  }

  const enviroment = `${url}/api`;
  return axios.create({
    baseURL: enviroment,
    headers: {
      authorization: token ? `Bearer ${token}` : null,
    },
  });
};

export default axiosInstance;
