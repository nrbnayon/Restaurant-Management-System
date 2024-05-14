import axios from "axios";
import { useEffect } from "react";
const axiosSecure = axios.create({
  baseURL: "http://localhost:8080",
  withCredentials: true,
});

const useAxios = () => {
  useEffect(() => {
    axiosSecure.interceptors.response.use(
      (res) => {
        return res;
      },
      (error) => {
        if (error.response.status === 401 || error.response.status === 403) {
          console.log("Logout user");
        }
        // console.log("Track error interceptor: ", error.response);
      }
    );
  }, []);
  return axiosSecure;
};

export default useAxios;
