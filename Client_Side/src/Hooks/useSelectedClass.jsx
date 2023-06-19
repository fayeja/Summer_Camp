import React, { useContext } from "react";
import { AuthContext } from "../Provider/AuthProvider";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";

const useSelectedClass = () => {
  const { user, loading } = useContext(AuthContext);
  const [axiosSecure] = useAxiosSecure();
  //   const token = localStorage.getItem("access-token");

  const { refetch, data: selectedClass = [] } = useQuery({
    queryKey: ["selectedClass", user?.email],
    enabled: !loading,
    queryFn: async () => {
      const res = await axiosSecure(`/selectedClass?email=${user?.email}`);
      //   console.log("res from axios", res);
      return res.data;
    }
  });
  return [selectedClass, refetch];
};

export default useSelectedClass;

// queryFn: async () => {
//   const res = await fetch(
//     `https://b7a12-summer-camp-server-side-fayeja-fayeja.vercel.app/selectedClass?email=${user?.email}`,
//     {
//       headers: {
//         authorization: `bearer ${token}`
//       }
//     }
//   );
//   return res.json();
// }
