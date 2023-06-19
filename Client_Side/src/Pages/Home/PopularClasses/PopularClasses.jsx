import React from "react";
import useClass from "../../../Hooks/useClass";
import PopularClass from "./PopularClass";
import SectionTitle from "../../Shared/SectionTitle /SectionTitle";

const PopularClasses = () => {
  const [classes] = useClass();
  const topClasses = classes
    .sort((a, b) => b.numberOfStudents - a.numberOfStudents)
    .slice(0, 6);
  return (
    <div>
      <SectionTitle
        Title="Popular Classes"
        SubTitle="Here Our popular Classes"
      ></SectionTitle>
      <div className="grid md:grid-cols-3 gap-10 ">
        {topClasses.map((classItem) => (
          <PopularClass
            key={classItem._id}
            classItem={classItem}
          ></PopularClass>
        ))}
      </div>
    </div>
  );
};

export default PopularClasses;
