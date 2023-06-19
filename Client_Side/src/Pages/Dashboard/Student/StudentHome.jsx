import React from "react";
import SectionTitle from "../../Shared/SectionTitle /SectionTitle";

const StudentHome = () => {
  return (
    <div className=" h-full w-full">
      <div>
        <SectionTitle
          Title={"Welcome!!!"}
          SubTitle={"Explore and Enroll Your Classes"}
        ></SectionTitle>
      </div>
      <div>
        <img
          className="w-8/12 ml-40 rounded-md border border-4 "
          src="https://cdn.dribbble.com/users/1294594/screenshots/5460287/campan2.gif"
          alt=""
        />
      </div>
    </div>
  );
};

export default StudentHome;
