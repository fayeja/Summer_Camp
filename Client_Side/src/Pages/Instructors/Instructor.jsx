import React from "react";
import { Link } from "react-router-dom";

const Instructor = ({ instructorItem }) => {
  const { image, name, email, numberOfClasses, classes } = instructorItem;
  return (
    <div className="card w-96 bg-base-100 shadow-xl">
      <figure>
        <img src={image} alt="Shoes" />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{name}</h2>
        <h3>
          <span className="font-semibold">Email: </span>
          {email}
        </h3>
        <h3>
          <span className="font-semibold">Number of Classes: </span>
          {numberOfClasses}
        </h3>
        <span className="font-semibold">Name of Classes: </span>{" "}
        <div className="flex gap-2">
          {classes.map((item) => (
            <p key={item._id} className="border border-2 p-2">
              {item}
            </p>
          ))}
        </div>
      </div>
      <div className="card-actions justify-end p-5">
        <Link to="/classes">
          <button className="btn btn-primary bg-blue-100 text-black">
            See Classes
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Instructor;
