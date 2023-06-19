import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../Provider/AuthProvider";
import Swal from "sweetalert2";
import { useLocation, useNavigate } from "react-router-dom";
import useSelectedClass from "../../Hooks/useSelectedClass";

const Class = ({ classItem }) => {
  const {
    image,
    name,
    instructor,
    seatsAvailable,
    price,
    _id,
    isDisabled,
    numberOfStudents
  } = classItem;
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  const [, refetch] = useSelectedClass();
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const [classCardClassName, setClassCardClassName] = useState(
    "card w-96 bg-base-100 shadow-xl "
  );

  const handleSelectedClass = (classItem) => {
    setIsButtonDisabled(true);
    console.log(classItem);
    if (user && user.email) {
      const selectedClassItem = {
        classItemId: _id,
        image,
        name,
        instructor,
        seatsAvailable,
        numberOfStudents,
        price,
        email: user.email,
        isDisabled: true
      };

      fetch(
        "https://b7a12-summer-camp-server-side-fayeja-fayeja.vercel.app/selectedClass",
        {
          method: "POST",
          headers: {
            "content-type": "application/json"
          },
          body: JSON.stringify(selectedClassItem)
        }
      )
        .then((res) => res.json())
        .then((data) => {
          if (data.insertedId) {
            refetch();
            Swal.fire({
              position: "top-end",
              icon: "success",
              title: "This class is selected!!!",
              showConfirmButton: false,
              timer: 1500
            });
          }
        });
    } else {
      Swal.fire({
        title: "Please login to select the class",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Login now!"
      }).then((result) => {
        if (result.isConfirmed) {
          navigate("/login", { state: { from: location } });
        }
      });
    }
  };
  // console.log(seatsAvailable);
  useEffect(() => {
    if (seatsAvailable === 0 || isDisabled) {
      setClassCardClassName("card w-96 bg-red-500 bg-opacity-50 shadow-xl ");
    }
  }, [seatsAvailable, isDisabled]);

  return (
    <div className={classCardClassName}>
      <figure>
        <img src={image} alt="Shoes" />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{name}</h2>
        <h3>
          <span className="font-semibold">Instructor: </span>
          {instructor}
        </h3>
        <div className="flex justify-between">
          <div>
            {" "}
            <p>Available Seat: {seatsAvailable}</p>
          </div>
          <div>
            <p>Price: ${price}</p>
          </div>
        </div>
        <div className="card-actions justify-end">
          {classCardClassName.includes("bg-red-500") ? null : (
            <button
              onClick={() => handleSelectedClass(classItem)}
              className={`btn btn-primary ${
                isButtonDisabled ? "bg-gray-300" : "bg-blue-100"
              } text-black`}
              disabled={isButtonDisabled}
            >
              {isButtonDisabled ? "Selected" : "Select"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Class;
