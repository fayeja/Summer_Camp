import React from "react";
import { motion } from "framer-motion";

const SectionTitle = ({ Title, SubTitle }) => {
  return (
    <motion.div
      className="mx-auto text-center text-gray-600 font-serif md:w-4/12 my-12"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <motion.h3
        className="text-3xl uppercase border-y-4 py-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.5 }}
      >
        {Title}
      </motion.h3>
      <motion.p
        className="text-cyan-800 my-2"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.5 }}
      >
        ------{SubTitle}------
      </motion.p>
    </motion.div>
  );
};

export default SectionTitle;
