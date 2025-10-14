import React from "react";
import { motion } from "framer-motion";
import ai from "../images/ai.png";
import english from "../images/english.png";
import chat from "../images/chat.png";
import flashcards from "../images/flashcards.png";

const Screenshots = () => {
  const screenshots = [ai, english, chat, flashcards];

  return (
    <section
      id="screenshots"
      className="py-20 bg-gradient-to-b from-white to-gray-50 text-center"
    >
      {/* Title */}
      <motion.h2
        className="text-4xl sm:text-5xl font-extrabold text-gray-800 mb-4"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        App Preview
      </motion.h2>

      {/* Subtitle */}
      <motion.p
        className="text-gray-600 text-lg max-w-2xl mx-auto mb-12"
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.6 }}
      >
        Get a glimpse of how <span className="text-indigo-600 font-semibold">StudyHub</span> 
        helps you stay productive, organized, and inspired — anytime, anywhere.
      </motion.p>

      {/* Screenshot Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-8 max-w-5xl mx-auto px-6">
        {screenshots.map((src, index) => (
          <motion.div
            key={index}
            className="rounded-2xl overflow-hidden shadow-lg border border-gray-200 hover:shadow-2xl hover:scale-[1.03] transition-transform duration-300"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <img
              src={src}
              alt={`App preview ${index + 1}`}
              className="w-full h-[280px] object-cover"
            />
          </motion.div>
        ))}
      </div>

      {/* CTA Text */}
      <motion.p
        className="mt-12 text-gray-700 text-lg"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        Experience a clean, modern, and fast interface designed for students. 🚀
      </motion.p>
    </section>
  );
};

export default Screenshots;
