import { createBrowserRouter } from "react-router-dom";
import Login from "./../Pages/Auth/Login";
import Register from "./../Pages/Auth/Register";
import Home from "../Pages/Home/Home";
import Root from "./../Layout/Root";

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
    ],
  },
]);

export default router;
