import React from "react";
import { motion } from "framer-motion";
import founder from "../images/founder.jpeg"; // Replace with your photo

const Founder = () => {
  return (
    <section id="founder" className="py-24 bg-gradient-to-br from-indigo-50 via-white to-purple-50 text-center">
      <div className="max-w-4xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-6"
        >
          <span className="text-purple-600 font-semibold text-sm uppercase tracking-wider">Our Founder</span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-5xl md:text-6xl font-bold text-gray-900 mb-16 leading-tight"
        >
          Meet the <span className="bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">Founder</span>
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-col items-center"
        >
          <motion.img
            src={founder}
            alt="Founder"
            whileHover={{ scale: 1.05 }}
            className="w-48 h-48 rounded-full shadow-2xl border-4 border-purple-500 object-cover mb-6"
          />
          <h3 className="text-3xl font-bold text-gray-900 mb-3">El Mouataz Benmanssour</h3>
          <p className="text-purple-600 font-semibold text-lg mb-6">Founder & AI Enthusiast</p>
          <p className="text-gray-700 max-w-2xl text-lg leading-relaxed">
            A passionate software engineer and AI enthusiast dedicated to
            transforming learning through technology. StudyHub represents his
            vision for smarter, more human learning experiences that empower
            students worldwide to achieve their goals.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default Founder;
