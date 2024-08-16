import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";

import reportWebVitals from "./reportWebVitals";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./components/authentication/Login";
import Register from "./components/authentication/Register";
import { Home } from "./components/Home";
import DetailJob from "./components/DetailJob";
import ErrorPage from "./ErrorPage";
import Dashbord from "./components/Dashbord";
import DeleteForm from "./components/Form/DeleteForm";

// const root = ReactDOM.createRoot(document.getElementById("root"));

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/detailjob/:id",
    element: <DetailJob />,
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
    path: "/list-job-vacancy",
    element: <Dashbord />,
  },
  {
    path: "/list-job-vacancy/form",
    element: <Dashbord />,
  },
  {
    path: "/dashboard/profile",
    element: <Dashbord />,
  },
  {
    path: "/dashboard/change-password",
    element: <Dashbord />,
  },
  {
    path: "/dashboard/list-job-vacancy/edit/:id",
    element: <Dashbord />,
  },
  {
    path: "/testing",
    element: <DeleteForm />,
  },
  {
    path: "*",
    element: <ErrorPage />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

reportWebVitals();
