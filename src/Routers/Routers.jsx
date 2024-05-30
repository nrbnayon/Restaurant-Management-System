import { createBrowserRouter } from "react-router-dom";
import Login from "./../Pages/Auth/Login";
import Register from "./../Pages/Auth/Register";
import Home from "../Pages/Home/Home";
import Root from "./../Layout/Root";
import AllFoods from "../Pages/AllFood/AllFoods";
import FoodDetails from "../Pages/AllFood/FoodDetails";
import PrivateRouter from "./PrivateRouter";
import PurchaseForm from "../Pages/FoodPurchase/FoodPurchaseForm";
import Gallery from "../Pages/MyGallery/Gallery";
import MyAddedFood from "../Pages/MyProfile/MyAddedFood";
import MyPurchase from "../Pages/MyProfile/MyPurchase";
import AddNewFood from "../Pages/MyProfile/AddNewFood";
import NotFound from "./../Pages/NotFound/NotFound";
import ContactSection from "../Pages/ContactForm/ContactSection";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <NotFound />,
    children: [
      {
        path: "/",
        element: <Home />,
      },

      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/register",
        element: <Register />,
      },
      {
        path: "/allFoods",
        element: <AllFoods />,
      },
      {
        path: "/contact",
        element: <ContactSection />,
      },
      {
        path: "/gallery",
        element: <Gallery />,
      },
      {
        path: "/myAddedFoods",
        element: (
          <PrivateRouter>
            <MyAddedFood />
          </PrivateRouter>
        ),
      },
      {
        path: "/myOrderFood",
        element: (
          <PrivateRouter>
            <MyPurchase />
          </PrivateRouter>
        ),
      },
      {
        path: "/addFood",
        element: (
          <PrivateRouter>
            <AddNewFood />
          </PrivateRouter>
        ),
      },
      {
        path: "/foodDetails/:id",
        loader: ({ params }) =>
          fetch(
            `https://restaurant-management-server-three-gules.vercel.app/foods/${params.id}`
          ),
        element: <FoodDetails />,
      },
      {
        path: "/foodPurchase/:id",
        loader: ({ params }) =>
          fetch(
            `https://restaurant-management-server-three-gules.vercel.app/foods/${params.id}`
          ),
        element: (
          <PrivateRouter>
            <PurchaseForm />
          </PrivateRouter>
        ),
      },
    ],
  },
]);

export default router;
