import { useQuery } from "@tanstack/react-query";

const useInstructor = () => {
  const {
    data: instructors = [],
    isLoading: loading,
    refetch
  } = useQuery({
    queryKey: ["instructors"],
    queryFn: async () => {
      const res = await fetch(
        "https://b7a12-summer-camp-server-side-fayeja-fayeja.vercel.app/instructor"
      );
      return res.json();
    }
  });
  return [instructors, loading, refetch];
};

export default useInstructor;
