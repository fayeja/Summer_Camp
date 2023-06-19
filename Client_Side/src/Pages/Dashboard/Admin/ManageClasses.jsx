import React from "react";
import useClass from "../../../Hooks/useClass";
import {
  FaCommentDots,
  FaRegCheckCircle,
  FaRegWindowClose
} from "react-icons/fa";
import Swal from "sweetalert2";

const ManageClasses = () => {
  const [classes, refetch] = useClass();

  const handleApprove = (classId) => {
    // Make an API call to update the class status
    fetch(
      `https://b7a12-summer-camp-server-side-fayeja-fayeja.vercel.app/class/${classId}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ status: "approved" })
      }
    )
      .then((res) => {
        if (res.ok) {
          refetch();
          Swal.fire("Updated!", "Your class has been updated.", "success");
        } else {
          throw new Error("Failed to update class status");
        }
      })
      .catch((error) => {
        // Handle any errors that occur during the API call
        console.error("Error:", error);
      });
  };
  const handleDeny = (classId) => {
    // Make an API call to update the class status
    fetch(
      `https://b7a12-summer-camp-server-side-fayeja-fayeja.vercel.app/class/${classId}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ status: "denied" })
      }
    )
      .then((res) => {
        if (res.ok) {
          refetch();
          Swal.fire("Updated!", "Your class has been updated.", "success");
        } else {
          throw new Error("Failed to update class status");
        }
      })
      .catch((error) => {
        // Handle any errors that occur during the API call
        console.error("Error:", error);
      });
  };

  const handleSendFeedback = (classId) => {
    Swal.fire({
      title: "Send Feedback",
      input: "textarea",
      inputLabel: "Feedback",
      inputPlaceholder: "Enter your feedback here...",
      showCancelButton: true,
      confirmButtonText: "Send",
      cancelButtonText: "Cancel",
      preConfirm: (feedback) => {
        if (feedback) {
          // Make an API call to send the feedback to the server
          fetch(
            `https://b7a12-summer-camp-server-side-fayeja-fayeja.vercel.app/class/${classId}/feedback`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json"
              },
              body: JSON.stringify({ feedback })
            }
          )
            .then((res) => {
              if (res.ok) {
                Swal.fire({
                  position: "top-end",
                  icon: "success",
                  title: "Feedback sent successfully!",
                  showConfirmButton: false,
                  timer: 1500
                });
              } else {
                throw new Error("Failed to send feedback");
              }
            })
            .catch((error) => {
              // Handle any errors that occur during the API call
              console.error("Error:", error);
            });
        }
      }
    });
  };

  return (
    <div className="p-2 text-center h-full w-full">
      <div>
        <div className="flex text-blue-400 gap-20 pb-5 font-semibold uppercase font-serif">
          <h2>Total Classes:{classes.length}</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="table">
            {/* head */}
            <thead>
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Image</th>
                <th>Instructor Name</th>
                <th>Instructor Email</th>
                <th>Available seats</th>
                <th>Price</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {classes.map((item, index) => (
                <tr key={item._id}>
                  <th>{index + 1}</th>
                  <td>{item.name}</td>
                  <td>
                    <div className="flex items-center space-x-3">
                      <div className="avatar">
                        <div className="mask mask-squircle w-12 h-12">
                          <img src={item.image} alt="class" />
                        </div>
                      </div>
                    </div>
                  </td>
                  <td>{item.instructor}</td>
                  <td>{item.instructor_email}</td>
                  <td>{item.seatsAvailable}</td>
                  <td>{item.price}</td>
                  <td>{item.status}</td>
                  <th>
                    {item.status === "pending" && (
                      <>
                        <button
                          onClick={() => handleApprove(item._id)}
                          disabled={item.status !== "pending"}
                          className="btn ml-7 text-black bg-blue-400 btn-xs"
                        >
                          <FaRegCheckCircle></FaRegCheckCircle>
                        </button>
                        <button
                          onClick={() => handleDeny(item._id)}
                          disabled={item.status !== "pending"}
                          className="btn ml-7 text-black bg-blue-400 btn-xs"
                        >
                          <FaRegWindowClose></FaRegWindowClose>
                        </button>
                      </>
                    )}
                    <button
                      onClick={() => handleSendFeedback(item._id)}
                      className="btn ml-7 text-black bg-blue-400 btn-xs"
                    >
                      <FaCommentDots></FaCommentDots>
                    </button>
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

export default ManageClasses;
