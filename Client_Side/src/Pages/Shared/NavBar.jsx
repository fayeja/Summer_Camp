import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import logo from "../../assets/logo.webp";
import { AuthContext } from "../../Provider/AuthProvider";
import useAdmin from "../../Hooks/useAdmin";
import useInstructors from "../../Hooks/useInstructors";
import { FaMoon } from "react-icons/fa";
import { ThemeContext } from "../../Pages/Shared/ThemeContext.jsx";

const NavBar = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const { user, logOut } = useContext(AuthContext);
  const [isAdmin] = useAdmin();
  const [isInstructor] = useInstructors();

  const toggleTheme = () => {
    setIsDarkMode((prevMode) => !prevMode);
  };

  const handleLogOut = () => {
    logOut()
      .then(() => {
        toggleTheme();
      })
      .catch((error) => console.log(error));
  };

  const navOptions = [
    { label: "Home", link: "/" },
    { label: "Instructors", link: "/instructors" },
    { label: "Classes", link: "/classes" },
    {
      label: "Dashboard",
      link: isAdmin
        ? "/dashboard/adminHome"
        : isInstructor
        ? "/dashboard/instructorHome"
        : "/dashboard/studentHome"
    }
  ];

  return (
    <nav
      className={`navbar fixed z-10 bg-opacity-30 max-w-screen-xl ${
        isDarkMode ? "bg-blue-100 text-white" : "bg-gray-700 text-black"
      }`}
    >
      <div className="container mx-auto flex justify-between items-center py-4">
        <div className="flex items-center">
          <div className="dropdown mr-4">
            <label tabIndex={0} className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </label>
            <ul className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-blue-300 rounded-box w-52">
              {navOptions.map((option, index) => (
                <li key={index}>
                  <Link to={option.link}>{option.label}</Link>
                </li>
              ))}
            </ul>
          </div>
          <Link to="/" className="flex items-center">
            <img className="rounded-full w-12 mr-2" src={logo} alt="Logo" />
            <p className="text-2xl font-serif">SportsToday</p>
          </Link>
        </div>
        <div className="flex items-center space-x-4">
          <ul className="menu menu-horizontal hidden lg:flex">
            {navOptions.map((option, index) => (
              <li key={index}>
                <Link to={option.link}>{option.label}</Link>
              </li>
            ))}
          </ul>
          <button className="btn btn-circle bg-blue-100" onClick={toggleTheme}>
            <FaMoon></FaMoon>
          </button>
          {user && (
            <img
              className="rounded-full w-12 mr-4"
              src={user?.photoURL}
              alt="Profile"
            />
          )}
          {user ? (
            <button onClick={handleLogOut} className="btn bg-blue-100">
              Logout
            </button>
          ) : (
            <Link to="/login" className="btn bg-blue-100">
              Login
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
