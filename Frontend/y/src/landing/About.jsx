import React from "react";
import { motion } from "framer-motion";

const About = () => {
  return (
    <section id="about" className="py-24 bg-gradient-to-r from-white via-purple-50 to-white text-center">
      <div className="max-w-5xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-6"
        >
          <span className="text-purple-600 font-semibold text-sm uppercase tracking-wider">About Us</span>
        </motion.div>
        
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-5xl md:text-6xl font-bold text-gray-900 mb-8 leading-tight"
        >
          About <span className="bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">StudyHub</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="max-w-3xl mx-auto text-gray-700 text-xl leading-relaxed mb-8 font-light"
        >
          StudyHub is an AI-powered platform that helps students and learners stay
          consistent, track progress, and unlock achievements while studying.
          Whether you're learning a language, coding, or preparing for exams, we
          keep you motivated every step of the way.
        </motion.p>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="flex justify-center gap-12 mt-12 flex-wrap"
        >
          <div className="text-center">
            <div className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent mb-2">10K+</div>
            <p className="text-gray-600">Active Users</p>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent mb-2">50K+</div>
            <p className="text-gray-600">Study Hours</p>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent mb-2">100%</div>
            <p className="text-gray-600">Success Rate</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;
