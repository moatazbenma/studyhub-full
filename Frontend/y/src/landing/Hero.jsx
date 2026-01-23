import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import example from "../images/example.jpeg";

const Hero = () => {
  const navigate = useNavigate();

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 overflow-x-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
        <div className="absolute top-40 right-10 w-72 h-72 bg-blue-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-1/2 w-72 h-72 bg-pink-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>
      
      {/* Navbar */}
      <nav className="fixed top-0 left-0 w-full bg-white/80 backdrop-blur-lg shadow-md z-50 flex justify-between items-center px-8 py-4 border-b border-gray-100">
        <motion.h1
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="text-2xl md:text-3xl font-extrabold bg-gradient-to-r from-indigo-500 to-purple-500 bg-clip-text text-transparent"
        >
          StudyHub
        </motion.h1>

        <div className="hidden md:flex items-center gap-8 text-gray-700 font-medium">
          <a href="#about" className="hover:text-purple-600 transition duration-300">About</a>
          <a href="#features" className="hover:text-purple-600 transition duration-300">Features</a>
          <a href="#screenshots" className="hover:text-purple-600 transition duration-300">Screenshots</a>
          <a href="#pricing" className="hover:text-purple-600 transition duration-300">Prices</a>
          <a href="#contact" className="hover:text-purple-600 transition duration-300">Contact Us</a>

          <Button
            onClick={() => navigate("/login")}
            className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white rounded-xl px-6 py-2 text-sm font-semibold shadow-lg transition duration-300"
          >
            Sign In
          </Button>
        </div>
      </nav>

      {/* Hero content */}
      <div className="flex flex-col-reverse lg:flex-row items-center justify-center gap-12 px-6 mt-24 relative z-10">
        {/* Left text */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center lg:text-left max-w-xl"
        >
          <h1 className="text-5xl md:text-6xl font-extrabold leading-tight mb-4">
            Learn Smarter with{" "}
            <span className="bg-gradient-to-r from-purple-600 to-indigo-500 bg-clip-text text-transparent">
              StudyHub
            </span>
          </h1>
          <p className="text-gray-600 text-lg mb-8">
            Your AI-powered learning companion — track your progress, stay
            motivated, and unlock achievements along your study journey.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start items-center sm:items-start">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                onClick={() => navigate("/dashboard")}
                className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white px-8 py-3 rounded-xl text-lg flex items-center gap-2 shadow-xl transition duration-300 w-full sm:w-auto justify-center"
              >
                Launch App <ArrowRight className="w-5 h-5" />
              </Button>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                variant="outline"
                onClick={() => document.getElementById("features").scrollIntoView({ behavior: "smooth" })}
                className="border-2 border-purple-500 text-purple-600 hover:bg-purple-50 px-8 py-3 rounded-xl text-lg font-semibold transition duration-300 w-full sm:w-auto justify-center"
              >
                Learn More
              </Button>
            </motion.div>
          </div>
        </motion.div>

        {/* Right image */}
        <motion.div
          initial={{ opacity: 0, x: 60 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex justify-center"
        >
          <img
            src={example}
            alt="StudyHub Dashboard"
            className="w-[300px] sm:w-[450px] lg:w-[600px] rounded-2xl shadow-2xl border border-gray-200 hover:shadow-3xl transition duration-300"
          />
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
