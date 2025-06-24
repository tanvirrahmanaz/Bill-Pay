// src/routes/Routes.jsx
import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../components/Layout/MainLayout";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Bills from "../pages/Bills";
import BillDetails from "../pages/BillDetails";
import MyProfile from "../pages/MyProfile";
import UpdateProfile from "../pages/UpdateProfile";
import ErrorPage from "../pages/ErrorPage";
import PrivateRoute from "./PrivateRoute";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <Home />
      },
      {
        path: "/login",
        element: <Login />
      },
      {
        path: "/register",
        element: <Register />
      },
      {
        path: "/bills",
        element: (
          <PrivateRoute>
            <Bills />
          </PrivateRoute>
        )
      },
      {
        path: "/bills/:id",
        element: (
          <PrivateRoute>
            <BillDetails />
          </PrivateRoute>
        )
      },
      {
        path: "/profile",
        element: (
          <PrivateRoute>
            <MyProfile />
          </PrivateRoute>
        )
      },
      {
        path: "/profile/update",
        element: (
          <PrivateRoute>
            <UpdateProfile />
          </PrivateRoute>
        )
      }
    ]
  }
]);

export default router;