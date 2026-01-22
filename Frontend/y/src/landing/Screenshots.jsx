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
      className="py-24 bg-gradient-to-b from-white via-purple-50 to-white text-center"
    >
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-6"
        >
          <span className="text-purple-600 font-semibold text-sm uppercase tracking-wider">App Preview</span>
        </motion.div>

        {/* Title */}
        <motion.h2
          className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          See StudyHub in <span className="bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">Action</span>
        </motion.h2>

        {/* Subtitle */}
        <motion.p
          className="text-gray-700 text-xl max-w-2xl mx-auto mb-16 leading-relaxed"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          Get a glimpse of how <span className="font-semibold text-purple-600">StudyHub</span> 
          helps you stay productive, organized, and inspired — anytime, anywhere.
        </motion.p>

        {/* Screenshot Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
          {screenshots.map((src, index) => (
            <motion.div
              key={index}
              className="rounded-2xl overflow-hidden shadow-lg border border-gray-200 hover:shadow-2xl hover:scale-[1.02] transition-all duration-300 group"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <img
                src={src}
                alt={`App preview ${index + 1}`}
                className="w-full h-[350px] object-cover group-hover:brightness-110 transition duration-300"
              />
            </motion.div>
          ))}
        </div>

        {/* CTA Text */}
        <motion.p
          className="mt-16 text-gray-700 text-lg font-medium"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          Experience a clean, modern, and fast interface designed for students. ✨
        </motion.p>
      </div>
    </section>
  );
};

export default Screenshots;
