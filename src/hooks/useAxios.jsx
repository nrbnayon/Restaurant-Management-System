import axios from "axios";
const axiosSecure = axios.create({
  baseURL: "http://localhost:8080",
  withCredentials: true,
});

const useAxios = () => {
  return axiosSecure;
};

export default useAxios;
