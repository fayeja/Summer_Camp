import React from "react";
import { Link } from "react-router-dom";

const Error404 = () => {
  return (
    <div className="container text-center p-3">
      <img
        className="w-1/2 mx-auto h-96 m-5 rounded-xl"
        src="https://cdn.svgator.com/images/2022/01/404-page-animation-example.gif"
        alt=""
      />
      <h1 className="text-danger ">Page Not Found</h1>
      <p className="m-3">
        Oops!Looks like the page you are looking for does not exist.
      </p>
      <Link href="/">
        <button className="py-3 px-4 bg-blue-100 rounded-xl text-black">
          Return Home
        </button>
      </Link>
    </div>
  );
};

export default Error404;
