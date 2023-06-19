import React from "react";
import Banner from "../Banner/Banner";
import PopularClasses from "../PopularClasses/PopularClasses";
import PopularInstructor from "../PopularInstructor/PopularInstructor";
import About from "../About/About";
import Gallery from "../Gallery/Gallery";

const Home = () => {
  return (
    <div>
      <Banner></Banner>
      <Gallery></Gallery>
      <PopularClasses></PopularClasses>
      <PopularInstructor></PopularInstructor>
      <About></About>
    </div>
  );
};

export default Home;
