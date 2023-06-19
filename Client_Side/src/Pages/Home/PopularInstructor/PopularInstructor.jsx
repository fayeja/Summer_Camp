import React from "react";
import useInstructor from "../../../Hooks/useInstructor";
import SectionTitle from "../../Shared/SectionTitle /SectionTitle";

const PopularInstructor = () => {
  const [instructors] = useInstructor();
  const topInstructors = instructors.slice(0, 6);
  return (
    <div>
      <SectionTitle
        Title="Popular Instructors"
        SubTitle="Here Our popular Instractor"
      ></SectionTitle>

      <div className="grid md:grid-cols-3 gap-10 pb-5">
        {topInstructors.map((instructor) => (
          <div key={instructor._id} className="flex space-x-2">
            <img
              className="w-[200px] rounded-md"
              src={instructor.image}
              alt=""
            />
            <div>
              <h3 className="font-serif font-semibold">{instructor.name}</h3>
              <p className="text-xs">
                <span className="font-semibold">Email: </span>
                {instructor.email}
              </p>
              <p className="text-xs">
                <span className="font-semibold">Number of Classes: </span>
                {instructor.numberOfClasses}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PopularInstructor;
