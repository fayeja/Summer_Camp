import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";
import { useContext } from "react";
import { AuthContext } from "../Provider/AuthProvider";

const useClass = () => {
  const { user, loading } = useContext(AuthContext);
  const [axiosSecure] = useAxiosSecure();
  //   const token = localStorage.getItem("access-token");

  const { refetch, data: classes = [] } = useQuery({
    queryKey: ["classes", user?.email],
    enabled: !loading,
    queryFn: async () => {
      const res = await axiosSecure("/class");
      //   console.log("res from axios", res);
      return res.data;
    }
  });
  return [classes, refetch];
};

export default useClass;

// const {
//   data: classes = [],
//   isLoading: loading,
//   refetch
// } = useQuery({
//   queryKey: ["classes"],
//   queryFn: async () => {
//     const res = await fetch("https://b7a12-summer-camp-server-side-fayeja-fayeja.vercel.app/class");
//     return res.json();
//   }
// });
// return [classes, loading, refetch];
