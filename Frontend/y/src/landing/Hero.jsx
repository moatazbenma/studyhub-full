import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import example from "../images/example.jpeg";

const Hero = () => {
  const navigate = useNavigate();

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-purple-50 via-white to-indigo-100 overflow-x-hidden">
      {/* Navbar */}
      <nav className="fixed top-0 left-0 w-full bg-white/70 backdrop-blur-md shadow-sm z-50 flex justify-between items-center px-8 py-4">
        <motion.h1
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="text-2xl md:text-3xl font-extrabold bg-gradient-to-r from-indigo-500 to-purple-500 bg-clip-text text-transparent"
        >
          StudyHub
        </motion.h1>

        <div className="hidden md:flex items-center gap-8 text-gray-700 font-medium">
          <a href="#about" className="hover:text-purple-600 transition">About</a>
          <a href="#features" className="hover:text-purple-600 transition">Features</a>
          <a href="#screenshots" className="hover:text-purple-600 transition">Screenshots</a>
          <a href="#pricing" className="hover:text-purple-600 transition">Prices</a>
          <a href="#contact" className="hover:text-purple-600 transition">Contact Us</a>

          <Button
            onClick={() => navigate("/login")}
            className="bg-purple-600 hover:bg-purple-700 text-white rounded-xl px-5 py-2 text-sm"
          >
            Sign In
          </Button>
        </div>
      </nav>

      {/* Hero content */}
      <div className="flex flex-col-reverse lg:flex-row items-center justify-center gap-12 px-6 mt-24">
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
          <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
            <Button
              onClick={() => navigate("/dashboard")}
              className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-xl text-lg flex items-center gap-2 shadow-md"
            >
              Launch App <ArrowRight className="w-5 h-5" />
            </Button>
            <Button
              variant="outline"
              onClick={() => document.getElementById("features").scrollIntoView({ behavior: "smooth" })}
              className="border-2 border-purple-500 text-purple-600 hover:bg-purple-50 px-6 py-3 rounded-xl text-lg"
            >
              Learn More
            </Button>
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
            className="w-[300px] sm:w-[450px] lg:w-[600px] rounded-2xl shadow-lg border border-gray-200"
          />
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
