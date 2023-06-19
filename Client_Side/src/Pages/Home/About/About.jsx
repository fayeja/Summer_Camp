import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import SectionTitle from "../../Shared/SectionTitle /SectionTitle";
import { Link } from "react-router-dom";

const About = () => {
  return (
    <div>
      <SectionTitle Title={"About Our Summer Camp School"} SubTitle={""} />
      <div
        className="hero min-h-screen mb-10"
        style={{
          backgroundImage:
            "url(https://cdn.wallpapersafari.com/74/49/AlJ0Zw.jpg)"
        }}
      >
        <div className="hero-overlay bg-opacity-80"></div>
        <div className="hero-content text-center text-neutral-content">
          <div className="max-w-md">
            <h1 className="mb-5 text-5xl font-bold">SportsToday</h1>
            <p className="mb-5 text-justify">
              SportsToday is a website dedicated to sports academies,
              specifically designed for a summer camp school. It allows students
              to enroll and learn specific extra-curricular activities related
              to sports. The website provides a seamless user experience with
              features such as registration and login systems, instructor and
              class listings, student and instructor dashboards, payment
              processing, and an admin dashboard for managing classes and users.
            </p>
            <Link to="/login">
              <button className="btn bg-blue-100 text-black">
                Get Started
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
