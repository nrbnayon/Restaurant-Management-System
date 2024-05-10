import { Outlet } from "react-router-dom";
import Footer from "../Pages/Shared/Footer/Footer";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import NavBar from "./../Pages/Shared/Navbar/NavBar";
const Root = () => {
  return (
    <div>
      <div className="overflow-hidden">
        <div className="h-20">
          <NavBar />
        </div>
        <div>
          <Outlet />
        </div>
      </div>
      <div>
        <Footer />
      </div>
      <ToastContainer />
    </div>
  );
};

export default Root;
