import React from "react";

const PopularClass = ({ classItem }) => {
  const { image, name, instructor, seatsAvailable, price, numberOfStudents } =
    classItem;
  return (
    <div className="card w-96 bg-base-100 shadow-xl image-full">
      <figure>
        <img src={image} alt="Popular Class" />
      </figure>
      <div className="card-body border border-4 ">
        <h2 className="card-title font-serif">{name}</h2>
        <div className="font-extralight ">
          <p>Number of Student: {numberOfStudents}</p>
          <p>Available Seat: {seatsAvailable}</p>
          <p>Price: ${price}</p>
        </div>
      </div>
    </div>
  );
};

export default PopularClass;
