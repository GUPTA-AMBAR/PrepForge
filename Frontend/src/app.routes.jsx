import { createBrowserRouter } from "react-router";
import Register from "./features/auth/pages/Register";
import Login from "./features/auth/pages/Login";
import Protected from "./features/auth/components/Protected";
import GuestOnly from "./features/auth/components/GuestOnly";
import Home from "./features/interview/pages/Home";
import Interview from "./features/interview/pages/Interview";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Protected><Home/></Protected>,
  },
  {
    path: "/register",
    element: <GuestOnly><Register /></GuestOnly>,
  },
  {
    path: "/login",
    element: <GuestOnly><Login /></GuestOnly>,
  },
  {
    path: "/interview/:interviewId",
    element: <Protected><Interview/></Protected>
  }
]);
