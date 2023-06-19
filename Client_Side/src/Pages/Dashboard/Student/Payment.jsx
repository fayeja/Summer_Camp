import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import React from "react";
import Checkout from "./Checkout";
import useSelectedClass from "../../../Hooks/useSelectedClass";
import { useLocation, useParams } from "react-router-dom";
import SectionTitle from "../../Shared/SectionTitle /SectionTitle";

const stripePromise = loadStripe(import.meta.env.VITE_Payment_Gateway_PK);
// console.log(stripePromise);
const Payment = () => {
  const [selectedClass] = useSelectedClass();
  const location = useLocation();
  const item = location.state;
  // console.log(item);
  const singlePayment = selectedClass.find(
    (payment) => payment._id == item._id
  );

  const price = parseFloat(singlePayment.price.toFixed(2));

  return (
    <div className="flex flex-col justify-center items-center w-full h-full">
      <SectionTitle
        Title={"Payment"}
        SubTitle={"Please clear your paymnet"}
      ></SectionTitle>
      <img
        className="w-40 mb-5"
        src="https://media2.giphy.com/media/v1.Y2lkPTc5MGI3NjExNTgyMDRjZmNlMDc5YTY4MWQxZjQzODE0NzI3NGRjZDI0OWY3MjkxZiZlcD12MV9pbnRlcm5hbF9naWZzX2dpZklkJmN0PXM/URd2XgYe4nfFrXUGzw/giphy.gif"
        alt=""
      />
      <Elements stripe={stripePromise}>
        <Checkout selectedClass={singlePayment} price={price}></Checkout>
      </Elements>
    </div>
  );
};

export default Payment;
