import React, { useContext } from "react";
import useClass from "../../../Hooks/useClass";
import { AuthContext } from "../../../Provider/AuthProvider";
import { FaRegEdit, FaRegTrashAlt } from "react-icons/fa";

const MyClasses = () => {
  const [classes] = useClass();
  const { user } = useContext(AuthContext);

  const instructorClasses = classes.filter(
    (item) => item.instructor_email === user.email
  );

  const handleUpdate = (item) => {
    // TODO:
  };

  return (
    <div className="p-3 h-full w-full ">
      <div className="flex text-blue-400 gap-20 pb-5 font-semibold uppercase font-serif">
        <h2>Total Selected Classes: {instructorClasses?.length || 0}</h2>
      </div>
      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th>#</th>
              <th>Picture</th>
              <th>Name</th>
              <th>Instructor Name</th>
              <th>Available Seat</th>
              <th>Total Enrolled Student</th>
              <th>price</th>
              <th>Status</th>
              <th>Feedback</th>
              <th>Update</th>
            </tr>
          </thead>
          <tbody className="text-center w-6">
            {instructorClasses.map((item, index) => (
              <tr key={item._id}>
                <th>{index + 1}</th>
                <td>
                  <div className="flex items-center space-x-3">
                    <div className="avatar">
                      <div className="mask mask-squircle w-12 h-12">
                        <img src={item.image} alt="class" />
                      </div>
                    </div>
                  </div>
                </td>
                <td>{item.name}</td>
                <td>{item.instructor}</td>
                <td>{item.seatsAvailable}</td>
                <td>{item.numberOfStudents}</td>
                <td>${item.price}</td>
                <td>{item.status}</td>
                <td>{item.feedback}</td>
                <th>
                  <button
                    onClick={() => handleUpdate(item)}
                    className="btn btn-circle  ml-2 text-white bg-red-800 btn-xs"
                  >
                    <FaRegEdit></FaRegEdit>
                  </button>
                </th>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyClasses;
