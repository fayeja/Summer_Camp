import React from "react";
import SectionTitle from "../../Shared/SectionTitle /SectionTitle";

const AdminHome = () => {
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
          src="https://cdn.dribbble.com/users/1706519/screenshots/4605983/final-2.gif"
          alt=""
        />
      </div>
    </div>
  );
};

export default AdminHome;
