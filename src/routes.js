import React from "react";
import { Navigate } from "react-router-dom";
// import DashboardLayout from "src/layouts/DashboardLayout";
import MainLayout from "./layouts/MainLayout";
import HomeView from "./views/home";
// import CustomerListView from "src/views/customer/CustomerListView";
// import DashboardView from "src/views/reports/DashboardView";
// import LoginView from "src/views/auth/LoginView";
// import NotFoundView from "src/views/errors/NotFoundView";
// import ProductListView from "src/views/product/ProductListView";
// import RegisterView from "src/views/auth/RegisterView";
// import SettingsView from "src/views/settings/SettingsView";

const routes = [
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "home",
        element: <HomeView />,
      },
      {
        path: "/",
        element: <Navigate to="/home" />,
      },
      //   {
      //     path: "customers",
      //     element: <CustomerListView />,
      //   },
      //   {
      //     path: "dashboard",
      //     element: <DashboardView />,
      //   },
      //   {
      //     path: "products",
      //     element: <ProductListView />,
      //   },
      //   {
      //     path: "settings",
      //     element: <SettingsView />,
      //   },
      //   {
      //     path: "*",
      //     element: <Navigate to="/404" />,
      //   },
    ],
  },
  //   {
  //     path: "/",
  //     element: <MainLayout />,
  //     children: [
  //       {
  //         path: "login",
  //         element: <LoginView />,
  //       },
  //       {
  //         path: "register",
  //         element: <RegisterView />,
  //       },
  //       {
  //         path: "404",
  //         element: <NotFoundView />,
  //       },
  //       {
  //         path: "/",
  //         element: <Navigate to="/app/dashboard" />,
  //       },
  //       {
  //         path: "*",
  //         element: <Navigate to="/404" />,
  //       },
  //     ],
  //   },
];

export default routes;
