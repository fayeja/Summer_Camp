import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useContext, useEffect } from "react";
import { useState } from "react";
import { AuthContext } from "../../../Provider/AuthProvider";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import "./Checkout.css";
import Swal from "sweetalert2";
import { useLocation, useNavigate } from "react-router-dom";
import useClass from "../../../Hooks/useClass";
const Checkout = ({ selectedClass, price }) => {
  const stripe = useStripe();
  const navigate = useNavigate();
  const location = useLocation();
  const elements = useElements();
  const { user } = useContext(AuthContext);
  const [axiosSecure] = useAxiosSecure();
  const [cardError, setCardError] = useState("");
  const [clientSecret, setClientSecret] = useState("");
  const [processing, setProcessing] = useState(false);
  const [transactionId, setTransactionId] = useState("");
  const [classes] = useClass();

  useEffect(() => {
    if (price > 0) {
      axiosSecure.post("/create-payment-intent", { price }).then((res) => {
        // console.log(res.data.clientSecret);
        setClientSecret(res.data.clientSecret);
      });
    }
  }, [price, axiosSecure]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    const card = elements.getElement(CardElement);
    if (card === null) {
      return;
    }

    const { error } = await stripe.createPaymentMethod({
      type: "card",
      card
    });

    if (error) {
      console.log("error", error);
      setCardError(error.message);
    } else {
      setCardError("");
      // console.log('payment method', paymentMethod)
    }

    setProcessing(true);

    const { paymentIntent, error: confirmError } =
      await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: card,
          billing_details: {
            email: user?.email || "unknown",
            name: user?.displayName || "anonymous"
          }
        }
      });

    if (confirmError) {
      console.log(confirmError);
    }

    console.log("payment intent", paymentIntent.status);
    setProcessing(false);
    if (paymentIntent.status === "succeeded") {
      setTransactionId(paymentIntent.id);

      // add in enrollments table
      const payment = {
        email: user?.email,
        transactionId: paymentIntent.id,
        price,
        date: new Date(),
        classItems: selectedClass._id,
        classItemId: selectedClass.classItemId,
        classNames: selectedClass.name,
        classPicture: selectedClass.image,
        seatsAvailable: selectedClass.seatsAvailable - 1,
        numberOfStudents: selectedClass.numberOfStudents + 1,
        instructor: selectedClass.instructor,
        status: "service pending"
      };

      // Remove from selected class
      fetch(
        `https://b7a12-summer-camp-server-side-fayeja-fayeja.vercel.app/selectedClass/${selectedClass._id}`,
        {
          method: "DELETE"
        }
      ).then((res) => res.json());

      // Post to payment server
      axiosSecure.post("/payments", payment).then((res) => {
        if (res.data.insertedId.insertedId) {
          //Update: increment by 1
          const reduceAvailableSeat = classes.filter(
            (item) => item._id == selectedClass.classItemId
          );
          const updateClass = {
            seatsAvailable: reduceAvailableSeat[0].seatsAvailable - 1,
            numberOfStudents: selectedClass.numberOfStudents + 1
          };
          fetch(
            `https://b7a12-summer-camp-server-side-fayeja-fayeja.vercel.app/class/${reduceAvailableSeat[0]._id}`,
            {
              method: "PUT",
              headers: {
                "content-type": "application/json"
              },
              body: JSON.stringify(updateClass)
            }
          ).then((res) => res.json());

          // display confirm sms
          Swal.fire({
            title: "Your Payment is Successful",
            icon: "success",
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Ok!"
          }).then((result) => {
            if (result.isConfirmed) {
              navigate("/dashboard/selectedClasses", {
                state: { from: location }
              });
            }
          });
        }
      });
    }
  };
  return (
    <>
      <form
        className="w-2/3 text-center  border border-4"
        onSubmit={handleSubmit}
      >
        <CardElement
          options={{
            style: {
              base: {
                fontSize: "16px",
                color: "#424770",
                "::placeholder": {
                  color: "#aab7c4"
                }
              },
              invalid: {
                color: "#9e2146"
              }
            }
          }}
        />
        <button
          className="btn btn-primary btn-sm mt-4"
          type="submit"
          disabled={!stripe || !clientSecret || processing}
        >
          Pay
        </button>
      </form>
      {cardError && <p className="text-red-600 ml-8">{cardError}</p>}
      {transactionId && (
        <p className="text-green-500">
          Transaction complete with transactionId: {transactionId}
        </p>
      )}
    </>
  );
};

export default Checkout;
