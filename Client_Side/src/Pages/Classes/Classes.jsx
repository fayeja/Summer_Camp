import React from "react";
import useClass from "../../Hooks/useClass";
import Class from "./Class";

const Classes = () => {
  const [classes] = useClass();
  return (
    <div className="grid md:grid-cols-3 gap-10 py-28">
      {classes.map((classItem) => (
        <Class key={classItem._id} classItem={classItem}></Class>
      ))}
    </div>
  );
};

export default Classes;
