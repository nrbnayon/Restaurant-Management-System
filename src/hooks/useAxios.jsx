import axios from "axios";
import { useEffect } from "react";
import { toast } from "react-toastify";
const axiosSecure = axios.create({
  baseURL: "https://restaurant-management-server-three-gules.vercel.app",
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
          toast.warn("Unauthorized Action");
        }
      }
    );
  }, []);
  return axiosSecure;
};

export default useAxios;
