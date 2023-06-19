import React, { useContext } from "react";
import useSelectedClass from "../../../Hooks/useSelectedClass";
import { AuthContext } from "../../../Provider/AuthProvider";
import { FaRegTrashAlt } from "react-icons/fa";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";

const SelectedClasses = () => {
  const { user } = useContext(AuthContext);
  const [selectedClass, refetch] = useSelectedClass();
  //   console.log(selectedClass);
  const totalPrice = selectedClass.reduce((sum, item) => item.price + sum, 0);

  const handleDelete = (item) => {
    // console.log(item);
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(
          `https://b7a12-summer-camp-server-side-fayeja-fayeja.vercel.app/selectedClass/${item._id}`,
          {
            method: "DELETE"
          }
        )
          .then((res) => res.json())
          .then((data) => {
            if (data.deletedCount > 0) {
              refetch();
              Swal.fire("Deleted!", "Your class has been deleted.", "success");
            }
          });
      }
    });
  };

  return (
    <div className="p-10 h-full w-full">
      <div className="flex text-blue-400 gap-20 pb-5 font-semibold uppercase font-serif">
        <h2>Total Selected Classes: {selectedClass?.length || 0}</h2>
        <h2>Total price: ${totalPrice}</h2>
      </div>
      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th>#</th>
              <th>Picture</th>
              <th>Name</th>
              <th>Instructor</th>
              <th>Available Seat</th>
              <th>Number Of Student</th>
              <th>price</th>
              <th>Action</th>
              <th>Pay</th>
            </tr>
          </thead>
          <tbody>
            {selectedClass.map((item, index) => (
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
                <td className="text-center w-6">{item.seatsAvailable}</td>
                <td className="text-center w-6">{item.numberOfStudents}</td>
                <td>${item.price}</td>
                <th>
                  <button
                    onClick={() => handleDelete(item)}
                    className="btn btn-circle  ml-2 text-white bg-red-800 btn-xs"
                  >
                    <FaRegTrashAlt></FaRegTrashAlt>
                  </button>
                </th>
                <th>
                  <Link to="/dashboard/payment" state={item}>
                    <button className="btn btn-primary bg-blue-100  text-black ">
                      Pay
                    </button>
                  </Link>
                </th>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SelectedClasses;
