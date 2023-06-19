import React from "react";
import SectionTitle from "../../Shared/SectionTitle /SectionTitle";

const InstructorHome = () => {
  return (
    <div className=" h-full w-full">
      <div>
        <SectionTitle
          Title={"Welcome!!!"}
          SubTitle={"Explore and Add Your Classes"}
        ></SectionTitle>
      </div>
      <div>
        <img
          className="w-8/12 ml-40 rounded-md border border-4 "
          src="https://cdn.dribbble.com/users/1910217/screenshots/5425631/media/cb056329e98f827a7311bacfed7609e4.gif"
          alt=""
        />
      </div>
    </div>
  );
};

export default InstructorHome;
