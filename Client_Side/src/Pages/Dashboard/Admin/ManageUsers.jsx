import { useQuery } from "@tanstack/react-query";
import React from "react";
import { FaChalkboardTeacher, FaRegTrashAlt, FaUsers } from "react-icons/fa";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";

const ManageUsers = () => {
  const [axiosSecure] = useAxiosSecure();
  const { data: users = [], refetch } = useQuery(["users"], async () => {
    const res = await axiosSecure.get("/users");
    return res.data;
  });

  const handleMakeInstructor = (user) => {
    fetch(
      `https://b7a12-summer-camp-server-side-fayeja-fayeja.vercel.app/users/instructor/${user._id}`,
      {
        method: "PATCH"
      }
    )
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.modifiedCount) {
          refetch();
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: `Wow!!! ${user.name} is an Admin Now!`,
            showConfirmButton: false,
            timer: 1500
          });
        }
      });
  };
  const handleMakeAdmin = (user) => {
    fetch(
      `https://b7a12-summer-camp-server-side-fayeja-fayeja.vercel.app/users/admin/${user._id}`,
      {
        method: "PATCH"
      }
    )
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.modifiedCount) {
          refetch();
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: `Wow!!! ${user.name} is an Admin Now!`,
            showConfirmButton: false,
            timer: 1500
          });
        }
      });
  };

  return (
    <div className="p-5 h-full  w-full">
      <div>
        <div className="flex text-blue-400 gap-20 pb-5 font-semibold uppercase font-serif">
          <h2>Total User:{users.length}</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="table">
            {/* head */}
            <thead>
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Email</th>
                <th>Roll(Instructor)</th>
                <th>Roll(Admin)</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, index) => (
                <tr key={user._id}>
                  <th>{index + 1}</th>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <th>
                    {user.role == "instructor" ? (
                      "instructor"
                    ) : (
                      <button
                        onClick={() => handleMakeInstructor(user)}
                        className="btn btn-circle ml-7 text-black bg-blue-400 btn-xs"
                      >
                        <FaChalkboardTeacher></FaChalkboardTeacher>
                      </button>
                    )}
                  </th>
                  <th>
                    {user.role == "admin" ? (
                      "admin"
                    ) : (
                      <button
                        onClick={() => handleMakeAdmin(user)}
                        className="btn btn-circle  ml-7 text-black bg-blue-400 bg-red-800 btn-xs"
                      >
                        <FaUsers></FaUsers>
                      </button>
                    )}
                  </th>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ManageUsers;
