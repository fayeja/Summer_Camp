import { createBrowserRouter } from "react-router-dom";
import Main from "../Layout/Main";
import Home from "../Pages/Home/Home/Home";
import Login from "../Pages/Login/Login";
import SignUp from "../Pages/SignUp/SignUp";
import Dashboard from "../Layout/Dashboard";
import PrivateRoute from "./PrivateRoute";
import Classes from "../Pages/Classes/Classes";
import Instructors from "../Pages/Instructors/Instructors ";
import SelectedClasses from "../Pages/Dashboard/Student/SelectedClasses";
import EnrolledClasses from "../Pages/Dashboard/Student/EnrolledClasses";
import PaymentHistory from "../Pages/Dashboard/Student/PaymentHistory";
import ManageClasses from "../Pages/Dashboard/Admin/ManageClasses";
import ManageUsers from "../Pages/Dashboard/Admin/ManageUsers";
import AdminRoute from "./AdminRoute";
import MyClasses from "../Pages/Dashboard/Instructor/MyClasses";
import AddClass from "../Pages/Dashboard/Instructor/AddClass";
import Payment from "../Pages/Dashboard/Student/Payment";
import StudentHome from "../Pages/Dashboard/Student/StudentHome";
import InstructorHome from "../Pages/Dashboard/Instructor/InstructorHome";
import AdminHome from "../Pages/Dashboard/Admin/AdminHome";
import Error404 from "../Pages/Error404/Error404";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Main></Main>,
    children: [
      {
        path: "/",
        element: <Home></Home>
      },
      {
        path: "login",
        element: <Login></Login>
      },
      {
        path: "signup",
        element: <SignUp></SignUp>
      },
      {
        path: "classes",
        element: <Classes></Classes>
      },
      {
        path: "instructors",
        element: <Instructors></Instructors>
      }
    ]
  },
  {
    path: "dashboard",
    element: (
      <PrivateRoute>
        <Dashboard></Dashboard>
      </PrivateRoute>
    ),
    children: [
      // Student route
      {
        path: "studentHome",
        element: <StudentHome></StudentHome>
      },
      {
        path: "selectedClasses",
        element: <SelectedClasses></SelectedClasses>
      },
      {
        path: "enrolledClasses",
        element: <EnrolledClasses></EnrolledClasses>
      },
      {
        path: "paymentHistory",
        element: <PaymentHistory></PaymentHistory>
      },
      {
        path: "payment",
        element: <Payment></Payment>
        // loader: ({ params }) =>fetch(`https://b7a12-summer-camp-server-side-fayeja-fayeja.vercel.app/selectedClass/${params.id}`)
      },
      // Admin route
      {
        path: "adminHome",
        element: (
          <AdminRoute>
            <AdminHome></AdminHome>
          </AdminRoute>
        )
      },
      {
        path: "manageClasses",
        element: (
          <AdminRoute>
            <ManageClasses></ManageClasses>
          </AdminRoute>
        )
      },
      {
        path: "manageUsers",
        element: (
          <AdminRoute>
            <ManageUsers></ManageUsers>
          </AdminRoute>
        )
      },
      // Instructors route
      {
        path: "instructorHome",
        element: <InstructorHome></InstructorHome>
      },
      {
        path: "addClass",
        element: <AddClass></AddClass>
      },
      {
        path: "myClasses",
        element: <MyClasses></MyClasses>
      }
    ]
  },
  {
    path: "*",
    element: <Error404></Error404>
  }
]);
