import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./Components/Login";
import OTPVerify from "./Components/OTPVerify";
import NotFound from "./Components/NotFound";
import Dashboard from "./Components/Dashboard";

const approute = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "/verify-otp",
    element: <OTPVerify />,
  },
  {
    path: "/dashboard",
    element: <Dashboard />,
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);

function App() {
  return <RouterProvider router={approute} />;
}

export default App;
