import React, { useState } from "react";
import { motion } from "framer-motion";
import SectionTitle from "../../Shared/SectionTitle /SectionTitle";

const pictureVariants = {
  initial: { x: "100%" },
  animate: {
    x: "-100%",
    transition: {
      duration: 10,
      repeat: Infinity,
      repeatType: "loop",
      ease: "linear"
    }
  }
};

const images = [
  "https://i.ibb.co/jDCp0W3/2.jpg",
  "https://i.ibb.co/mt3nrQG/3.jpg",
  "https://i.ibb.co/L8XF56r/6.jpg",
  "https://i.ibb.co/f0DS9ZB/1.jpg",
  "https://i.ibb.co/LrpS3JH/4.jpg",
  "https://i.ibb.co/DtxTn4H/5.jpg"
];
const imageWidth = 300;

const Gallery = () => {
  return (
    <div>
      <SectionTitle Title={"Gallery"} SubTitle={""}></SectionTitle>
      <div style={{ width: "100%", overflow: "hidden" }}>
        <motion.div
          style={{
            display: "flex",
            width: `${imageWidth * images.length}px`,
            position: "relative"
          }}
          variants={pictureVariants}
          initial="initial"
          animate="animate"
        >
          {images.map((image, index) => (
            <motion.img
              key={index}
              src={image}
              alt={`Image ${index + 1}`}
              style={{
                flex: "none",
                width: `${imageWidth}px`,
                height: "auto",
                marginRight: "10px",
                border: "1px solid black",
                borderRadius: "5px"
              }}
            />
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default Gallery;
