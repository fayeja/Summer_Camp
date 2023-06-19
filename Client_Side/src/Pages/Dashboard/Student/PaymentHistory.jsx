import React from "react";
import usePayment from "../../../Hooks/usePayment";

const PaymentHistory = () => {
  const [paymentHistory] = usePayment();
  const payments = paymentHistory.sort(
    (a, b) => new Date(b.date) - new Date(a.date)
  );

  return (
    <div className="p-10 h-full w-full ">
      <div className="flex text-blue-400 gap-20 pb-5 font-semibold uppercase font-serif">
        <h2>Total Payment: {payments?.length || 0}</h2>
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
              <th>Number of Students</th>
              <th>price</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {payments.map((item, index) => (
              <tr key={item._id}>
                <th>{index + 1}</th>
                <td>
                  <div className="flex items-center space-x-3">
                    <div className="avatar">
                      <div className="mask mask-squircle w-12 h-12">
                        <img src={item.classPicture} alt="class" />
                      </div>
                    </div>
                  </div>
                </td>
                <td>{item.classNames}</td>
                <td>{item.instructor}</td>
                <td className="text-center w-6">{item.seatsAvailable}</td>
                <td className="text-center w-6">{item.numberOfStudents}</td>
                <td>${item.price}</td>
                <td>
                  {new Date(item.date).toLocaleString(undefined, {
                    dateStyle: "short",
                    timeStyle: "short"
                  })}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PaymentHistory;
