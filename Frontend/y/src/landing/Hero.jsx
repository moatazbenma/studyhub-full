import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const Hero = () => {
  const navigate = useNavigate();

  return (
    <section className="relative w-full min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-0 w-96 h-96 bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
        <div className="absolute top-20 right-0 w-96 h-96 bg-indigo-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-20 left-1/2 w-96 h-96 bg-pink-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>
      
      {/* Navbar */}
      <nav className="fixed top-0 left-0 w-full bg-gradient-to-b from-white/90 to-white/80 backdrop-blur-xl shadow-lg z-50 flex justify-between items-center px-4 sm:px-8 py-3 sm:py-4 border-b border-purple-200/50">
        <motion.h1
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="text-xl sm:text-2xl md:text-3xl font-extrabold bg-gradient-to-r from-purple-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent"
        >
          StudyHub
        </motion.h1>

        <div className="hidden md:flex items-center gap-2 lg:gap-8 text-gray-700 font-medium">
          <a href="#about" className="text-sm lg:text-base hover:text-purple-600 transition duration-300 px-3 py-2 rounded-lg hover:bg-purple-100">About</a>
          <a href="#features" className="text-sm lg:text-base hover:text-purple-600 transition duration-300 px-3 py-2 rounded-lg hover:bg-purple-100">Features</a>
          <a href="#screenshots" className="text-sm lg:text-base hover:text-purple-600 transition duration-300 px-3 py-2 rounded-lg hover:bg-purple-100">Screenshots</a>
          <a href="#pricing" className="text-sm lg:text-base hover:text-purple-600 transition duration-300 px-3 py-2 rounded-lg hover:bg-purple-100">Prices</a>
          <a href="#contact" className="text-sm lg:text-base hover:text-purple-600 transition duration-300 px-3 py-2 rounded-lg hover:bg-purple-100">Contact Us</a>

          <Button
            onClick={() => navigate("/login")}
            className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white rounded-xl px-6 py-2.5 text-sm font-semibold shadow-lg hover:shadow-xl transition duration-300"
          >
            Sign In
          </Button>
        </div>

        {/* Mobile menu button */}
        <div className="md:hidden flex items-center gap-3">
          <Button
            onClick={() => navigate("/login")}
            className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white rounded-lg px-4 py-2 text-xs sm:text-sm font-semibold shadow-lg transition duration-300"
          >
            Sign In
          </Button>
        </div>
      </nav>

      {/* Hero content - Centered modern layout */}
      <div className="relative z-10 w-full min-h-screen flex flex-col items-center justify-center px-4 sm:px-6 lg:px-12 py-20 sm:py-24 lg:py-0">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-4xl mx-auto w-full"
        >
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1 }}
            className="inline-block mb-3 sm:mb-4 md:mb-6 px-2.5 sm:px-4 py-1 sm:py-2 bg-gradient-to-r from-purple-100 to-indigo-100 rounded-full border border-purple-300 backdrop-blur-sm"
          >
            <span className="text-xs sm:text-sm font-semibold bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
              ✨ AI-Powered Learning Platform
            </span>
          </motion.div>

          {/* Main heading */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-extrabold leading-tight mb-3 sm:mb-4 md:mb-6 px-2 sm:px-0">
            <span className="text-gray-900 block">Master Your</span>
            <span className="bg-gradient-to-r from-purple-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent block mt-1">
              Learning Journey
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-700 mb-5 sm:mb-6 md:mb-10 max-w-2xl mx-auto leading-relaxed px-2 sm:px-0">
            Track progress, master flashcards, complete tasks, and improve your English skills with AI-powered insights.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-2.5 sm:gap-4 justify-center items-stretch sm:items-center mb-8 sm:mb-10 md:mb-16 px-2 sm:px-0">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="w-full sm:w-auto">
              <Button
                onClick={() => navigate("/dashboard")}
                className="w-full sm:w-auto bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white px-5 sm:px-8 md:px-10 py-2.5 sm:py-3 md:py-4 rounded-lg sm:rounded-xl md:rounded-2xl text-xs sm:text-sm md:text-base lg:text-lg font-bold flex items-center justify-center gap-1.5 sm:gap-2 shadow-lg sm:shadow-xl hover:shadow-2xl transition duration-300"
              >
                Launch App <ArrowRight className="w-3.5 sm:w-4 md:w-5 h-3.5 sm:h-4 md:h-5" />
              </Button>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="w-full sm:w-auto">
              <Button
                variant="outline"
                onClick={() => document.getElementById("features").scrollIntoView({ behavior: "smooth" })}
                className="w-full sm:w-auto border-2 border-purple-500 text-purple-600 hover:bg-purple-50 px-5 sm:px-8 md:px-10 py-2.5 sm:py-3 md:py-4 rounded-lg sm:rounded-xl md:rounded-2xl text-xs sm:text-sm md:text-base lg:text-lg font-bold transition duration-300"
              >
                Explore Features
              </Button>
            </motion.div>
          </div>

          {/* Stats section */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-2 sm:gap-3 md:gap-4 max-w-3xl mx-auto px-2 sm:px-0"
          >
            {[
              { value: "1K+", label: "Active Users" },
              { value: "5K+", label: "Cards Mastered" },
              { value: "10K+", label: "Tasks Done" },
              { value: "98%", label: "Satisfaction" }
            ].map((stat, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 + idx * 0.1 }}
                className="bg-gradient-to-br from-white to-purple-50 border border-purple-200 rounded-lg sm:rounded-lg md:rounded-xl p-2.5 sm:p-3 md:p-4 backdrop-blur-sm shadow-sm hover:shadow-md hover:border-purple-300 transition duration-300"
              >
                <div className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
                  {stat.value}
                </div>
                <p className="text-xs sm:text-xs md:text-sm text-gray-700 mt-0.5 sm:mt-1 font-semibold line-clamp-2">{stat.label}</p>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
