import { Outlet, useLocation } from "react-router-dom";
import Footer from "../Pages/Shared/Footer/Footer";
import NavBar from "../Pages/Shared/NavBar/NavBar";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useEffect, useState } from "react";
const Root = () => {
  const location = useLocation();
  const [pageTitle, setPageTitle] = useState("");

  useEffect(() => {
    if (location.pathname === "/") {
      setPageTitle("e-MENU | HOME");
    } else if (
      location.state === "/myOrderFood" ||
      location.state === "/addFood" ||
      location.state === "/myAddedFoods" ||
      location.pathname === "/foodPurchase"
    ) {
      setPageTitle("e-MENU | Login");
    } else if (location.state) {
      setPageTitle(location.state);
    } else {
      setPageTitle(
        `e-MENU | ${location.pathname.replace("/", "").toUpperCase()}`
      );
    }
  }, [location]);

  useEffect(() => {
    document.title = pageTitle;
  }, [pageTitle]);
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
