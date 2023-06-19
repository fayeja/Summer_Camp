import React, { useContext } from "react";
import {
  FaChalkboardTeacher,
  FaHome,
  FaRegEdit,
  FaRegFile,
  FaRegFileAlt,
  FaRegFileCode,
  FaRegUserCircle,
  FaWallet
} from "react-icons/fa";
import { Link, NavLink, Outlet } from "react-router-dom";
import useSelectedClass from "../Hooks/useSelectedClass";
import { AuthContext } from "../Provider/AuthProvider";
import useAdmin from "../Hooks/useAdmin";
import useInstructors from "../Hooks/useInstructors";

const Dashboard = () => {
  const { user } = useContext(AuthContext);
  const [selectedClass, refetch] = useSelectedClass();

  const [isAdmin] = useAdmin();
  const [isInstructor] = useInstructors();

  return (
    <div className="drawer lg:drawer-open">
      <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content flex flex-col items-center justify-center">
        {/* Page content here */}
        <Outlet></Outlet>
        <label
          htmlFor="my-drawer-2"
          className="btn btn-primary drawer-button lg:hidden"
        >
          Open drawer
        </label>
      </div>
      <div className="drawer-side">
        <label htmlFor="my-drawer-2" className="drawer-overlay"></label>
        <ul className="menu p-4 w-80 h-full bg-blue-100 text-base  font-serif font-semibold py-10">
          {/* Sidebar content here */}
          {isAdmin ? (
            <>
              {" "}
              <li>
                <NavLink to="/dashboard/adminHome">
                  <FaHome></FaHome> Admin Home
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/manageClasses">
                  <FaRegEdit></FaRegEdit> Manage Classes
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/manageUsers">
                  <FaRegUserCircle></FaRegUserCircle>Manage Users
                </NavLink>
              </li>
            </>
          ) : isInstructor ? (
            <>
              {" "}
              <li>
                <NavLink to="/dashboard/instructorHome">
                  <FaHome></FaHome> Instructor Home
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/addClass">
                  <FaRegEdit></FaRegEdit> Add Class
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/myClasses">
                  <FaRegFileCode></FaRegFileCode>My Classes
                </NavLink>
              </li>
            </>
          ) : (
            <>
              {" "}
              <li>
                <NavLink to="/dashboard/studentHome">
                  <FaHome></FaHome>Student Home
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/selectedClasses">
                  <FaRegFileAlt></FaRegFileAlt>
                  <p>
                    My Selected Classes
                    <span className="border border-4 bg-red-800 rounded-xl p-1 m-3">
                      +{selectedClass?.length || 0}
                    </span>
                  </p>
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/enrolledClasses">
                  <FaRegEdit></FaRegEdit> My Enrolled Classes
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/paymentHistory">
                  <FaWallet></FaWallet>Payment History
                </NavLink>
              </li>
            </>
          )}
          <div className="divider"></div>
          <li>
            <NavLink to="/">
              <FaHome></FaHome>Home
            </NavLink>
          </li>
          <li>
            <NavLink to="/instructors">
              <FaChalkboardTeacher></FaChalkboardTeacher>Instructors
            </NavLink>
          </li>
          <li>
            <NavLink to="/classes">
              <FaRegFile></FaRegFile>Classes
            </NavLink>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Dashboard;
