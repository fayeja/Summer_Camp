import React, { useContext } from "react";
import { AuthContext } from "../Provider/AuthProvider";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";
const usePayment = () => {
  const { user, loading } = useContext(AuthContext);
  const [axiosSecure] = useAxiosSecure();
  //   const token = localStorage.getItem("access-token");

  const { refetch, data: payments = [] } = useQuery({
    queryKey: ["payments", user?.email],
    enabled: !loading,
    queryFn: async () => {
      const res = await axiosSecure(`/payments?email=${user?.email}`);
      //   console.log("res from axios", res);
      return res.data;
    }
  });
  return [payments, refetch];
};

export default usePayment;
