import { createBrowserRouter, redirect } from "react-router-dom";

import HomePage from "./views/home-page";
import LoginPage from "./views/login-page";
import RegisterPage from "./views/page-register";
import MyPage from "./views/page-my";
import MyEditPage from "./views/page-my-edit";
import RootLayout from "./layout/rootLayout";
import FourOFourPage from "./views/404-page";
import DetailAnimePage from "./views/page-detailAnime";
import SuccessPay from "./views/page-success-pay";
import FailedPay from "./views/page-fail-pay";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    loader: () => {
      const isLoggedIn = localStorage.getItem("access_token");
      if (!isLoggedIn) {
        throw redirect("/login");
      } else {
        return null;
      }
    },
    children: [
      {
        path: "",
        element: <HomePage />,
      },
    ],
  }, //CHECKED, OK




  {
    path: "/anime/:id",
    element: <RootLayout />,
    loader: () => {
      const isLoggedIn = localStorage.getItem("access_token");
      if (!isLoggedIn) {
        throw redirect("/login");
      } else {
        return null;
      }
    },
    children: [
      {
        path: "",
        element: <DetailAnimePage />,
      },
    ],
  }, //CHECKED, OK


  {
    path: "/login",
    element: <LoginPage />,
    loader: () => {
      const isLoggedIn = localStorage.getItem("access_token");
      if (isLoggedIn) {
        throw redirect("/");
      } else {
        return null;
      }
    },
  }, //CHECKED OK


  {
    path: "register",
    element: <RegisterPage />,
  }, //CHECKED OK


  {
    path: "success",
    element: <SuccessPay />,
    loader: () => {
      const isLoggedIn = localStorage.getItem("access_token");
      if (!isLoggedIn) {
        throw redirect("/login");
      } else {
        return null;
      }
    },
    
  }, //CHECKED OK


  {
    path: "fail",
    element: <FailedPay />,
  }, //CHECKED OK


  {
    path: "my/:id",
    element: <RootLayout />,
    loader: () => {
      const isLoggedIn = localStorage.getItem("access_token");
      if (isLoggedIn) {
        return null;
      } else {
        throw redirect("/login");
      }
    },
    children: [
      {
        path: "",
        element: <MyPage />,
      },
    ],
  }, //CHECKED 
  

  {
    path: "my/:id/edit",
    element: <RootLayout />,
    loader: () => {
      const isLoggedIn = localStorage.getItem("access_token");
      if (isLoggedIn) {
        return null;
      } else {
        throw redirect("/login");
      }
    },
    children: [
      {
        path: "",
        element: <MyEditPage />,
      },
    ],
  },
  {
    path: "/*",
    element: <FourOFourPage />,
  }, //CHECKED OK
]);

export { router };
