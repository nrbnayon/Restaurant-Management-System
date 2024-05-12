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

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <p>Not Found</p>,
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
        path: "/gallery",
        element: <Gallery />,
      },
      {
        path: "/foodDetails/:id",
        loader: ({ params }) =>
          fetch(`http://localhost:8080/foods/${params.id}`),
        element: <FoodDetails />,
      },
      {
        path: "/foodPurchase/:id",
        loader: ({ params }) =>
          fetch(`http://localhost:8080/foods/${params.id}`),
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
