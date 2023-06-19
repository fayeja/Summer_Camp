import React from "react";
import useInstructor from "../../Hooks/useInstructor";
import Instructor from "./Instructor";

const Instructors = () => {
  const [instructors] = useInstructor();
  return (
    <div className="grid md:grid-cols-3 gap-10 py-28">
      {instructors.map((instructorItem) => (
        <Instructor
          key={instructorItem._id}
          instructorItem={instructorItem}
        ></Instructor>
      ))}
    </div>
  );
};

export default Instructors;
