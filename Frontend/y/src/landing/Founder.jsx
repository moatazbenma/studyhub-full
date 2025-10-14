import React from "react";
import { motion } from "framer-motion";
import founder from "../images/founder.jpeg"; // Replace with your photo

const Founder = () => {
  return (
    <section id="founder" className="py-20 bg-gradient-to-br from-indigo-50 to-white text-center">
      <h2 className="text-4xl font-bold text-gray-800 mb-10">Meet the Founder</h2>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="flex flex-col items-center"
      >
        <img
          src={founder}
          alt="Founder"
          className="w-40 h-40 rounded-full shadow-lg border-4 border-purple-300 object-cover mb-4"
        />
        <h3 className="text-2xl font-semibold text-gray-800">El Mouataz Benmanssour</h3>
        <p className="text-gray-600 max-w-2xl mt-2">
          A passionate software engineer and AI enthusiast dedicated to
          transforming learning through technology. StudyHub represents his
          vision for smarter, more human learning experiences.
        </p>
      </motion.div>
    </section>
  );
};

export default Founder;
