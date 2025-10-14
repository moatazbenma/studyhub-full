import React from "react";
import { motion } from "framer-motion";

const About = () => {
  return (
    <section id="about" className="py-20 bg-white text-center">
      <motion.h2
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-4xl font-bold text-gray-800 mb-6"
      >
        About <span className="text-purple-600">StudyHub</span>
      </motion.h2>

      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="max-w-3xl mx-auto text-gray-600 text-lg leading-relaxed px-4"
      >
        StudyHub is an AI-powered platform that helps students and learners stay
        consistent, track progress, and unlock achievements while studying.
        Whether you're learning a language, coding, or preparing for exams, we
        keep you motivated every step of the way.
      </motion.p>
    </section>
  );
};

export default About;
