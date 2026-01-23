import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

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
      <div className="flex flex-col lg:flex-row items-center justify-between gap-3 sm:gap-4 lg:gap-8 px-3 sm:px-6 lg:px-12 mt-12 sm:mt-16 lg:mt-20 relative z-10 w-full">
        {/* Left text */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center lg:text-left w-full lg:flex-1 max-w-xl lg:max-w-2xl"
        >
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight mb-2 sm:mb-3 md:mb-4 lg:mb-6">
            Learn Smarter with{" "}
            <span className="bg-gradient-to-r from-purple-600 to-indigo-500 bg-clip-text text-transparent">
              StudyHub
            </span>
          </h1>
          <p className="text-xs sm:text-sm md:text-base lg:text-lg text-gray-600 mb-3 sm:mb-4 md:mb-6 lg:mb-8 leading-relaxed">
            Your AI-powered learning companion — track your progress, stay
            motivated, and unlock achievements along your study journey.
          </p>
          <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 lg:gap-4 justify-center lg:justify-start items-stretch sm:items-center">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="w-full sm:w-auto">
              <Button
                onClick={() => navigate("/dashboard")}
                className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white px-4 sm:px-6 md:px-8 lg:px-10 py-2 sm:py-2.5 lg:py-3 rounded-lg sm:rounded-xl lg:rounded-2xl text-xs sm:text-sm md:text-base lg:text-lg flex items-center justify-center gap-2 shadow-lg sm:shadow-xl lg:shadow-2xl transition duration-300 w-full sm:w-auto font-semibold"
              >
                Launch App <ArrowRight className="w-3 sm:w-4 md:w-5 h-3 sm:h-4 md:h-5" />
              </Button>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="w-full sm:w-auto">
              <Button
                variant="outline"
                onClick={() => document.getElementById("features").scrollIntoView({ behavior: "smooth" })}
                className="border-2 border-purple-500 text-purple-600 hover:bg-purple-50 px-4 sm:px-6 md:px-8 lg:px-10 py-2 sm:py-2.5 lg:py-3 rounded-lg sm:rounded-xl lg:rounded-2xl text-xs sm:text-sm md:text-base lg:text-lg font-semibold transition duration-300 w-full sm:w-auto"
              >
                Learn More
              </Button>
            </motion.div>
          </div>
        </motion.div>

        {/* Right section - Modern design element */}
        <motion.div
          initial={{ opacity: 0, x: 60 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="w-full lg:flex-1 flex justify-center px-0 sm:px-0"
        >
          <div className="relative w-full max-w-xs sm:max-w-sm md:max-w-sm lg:max-w-xl xl:max-w-2xl">
            {/* Animated gradient background */}
            <div className="absolute -inset-2 sm:-inset-3 lg:-inset-4 bg-gradient-to-br from-purple-500 via-pink-500 to-indigo-600 rounded-2xl lg:rounded-3xl blur-xl sm:blur-2xl lg:blur-3xl opacity-25 sm:opacity-30 animate-blob"></div>
            
            {/* Main card */}
            <div className="relative bg-gradient-to-br from-white to-gray-50 rounded-2xl lg:rounded-3xl shadow-lg sm:shadow-xl lg:shadow-2xl border border-gray-200 p-4 sm:p-5 md:p-6 lg:p-8 overflow-hidden backdrop-blur-sm">
              {/* Decorative elements */}
              <div className="absolute top-0 right-0 w-16 sm:w-20 md:w-24 lg:w-40 h-16 sm:h-20 md:h-24 lg:h-40 bg-gradient-to-br from-purple-200 to-transparent rounded-full blur-xl sm:blur-2xl lg:blur-3xl opacity-50 -mr-4 sm:-mr-6 lg:-mr-12 -mt-4 sm:-mt-6 lg:-mt-12"></div>
              <div className="absolute bottom-0 left-0 w-12 sm:w-14 md:w-16 lg:w-32 h-12 sm:h-14 md:h-16 lg:h-32 bg-gradient-to-tr from-indigo-200 to-transparent rounded-full blur-xl sm:blur-2xl lg:blur-3xl opacity-50 -ml-3 sm:-ml-4 lg:-ml-8 -mb-3 sm:-mb-4 lg:-mb-8"></div>
              
              {/* Content */}
              <div className="relative z-10">
                {/* Badge */}
                <motion.div 
                  animate={{ y: [0, 4, 0] }}
                  transition={{ duration: 4, repeat: Infinity }}
                  className="inline-block px-2 sm:px-3 md:px-4 py-1 bg-gradient-to-r from-purple-100 to-indigo-100 rounded-full mb-2 sm:mb-3 md:mb-4 lg:mb-5 border border-purple-200"
                >
                  <span className="text-xs md:text-xs lg:text-sm font-bold bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
                    ✨ AI-Powered Learning
                  </span>
                </motion.div>
                
                <h3 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-gray-900 mb-1 sm:mb-2 md:mb-3 lg:mb-4">Your Smart Study Assistant</h3>
                <p className="text-xs sm:text-sm md:text-sm lg:text-base text-gray-600 mb-3 sm:mb-4 md:mb-5 lg:mb-6 leading-snug lg:leading-relaxed">Track progress, master flashcards, complete tasks, and improve your English skills.</p>
                
                {/* Feature list */}
                <div className="space-y-1 sm:space-y-1.5 md:space-y-2 lg:space-y-3">
                  <motion.div 
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 }}
                    className="flex items-center gap-2 sm:gap-2.5 p-1 sm:p-1.5 md:p-2 lg:p-3 rounded-lg sm:rounded-lg lg:rounded-xl bg-white bg-opacity-50 hover:bg-opacity-100 transition duration-300 group"
                  >
                    <div className="w-7 sm:w-8 md:w-10 lg:w-12 h-7 sm:h-8 md:h-10 lg:h-12 rounded-full bg-gradient-to-br from-purple-500 to-indigo-600 flex items-center justify-center text-white text-xs sm:text-sm md:text-base lg:text-lg flex-shrink-0 group-hover:scale-110 transition duration-300">📊</div>
                    <div className="min-w-0">
                      <p className="font-semibold text-gray-900 text-xs sm:text-xs md:text-sm lg:text-base">Track Progress</p>
                      <p className="text-xs text-gray-500 truncate">Monitor journey</p>
                    </div>
                  </motion.div>
                  
                  <motion.div 
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 }}
                    className="flex items-center gap-2 sm:gap-2.5 p-1 sm:p-1.5 md:p-2 lg:p-3 rounded-lg sm:rounded-lg lg:rounded-xl bg-white bg-opacity-50 hover:bg-opacity-100 transition duration-300 group"
                  >
                    <div className="w-7 sm:w-8 md:w-10 lg:w-12 h-7 sm:h-8 md:h-10 lg:h-12 rounded-full bg-gradient-to-br from-pink-500 to-purple-600 flex items-center justify-center text-white text-xs sm:text-sm md:text-base lg:text-lg flex-shrink-0 group-hover:scale-110 transition duration-300">🎯</div>
                    <div className="min-w-0">
                      <p className="font-semibold text-gray-900 text-xs sm:text-xs md:text-sm lg:text-base">Master Skills</p>
                      <p className="text-xs text-gray-500 truncate">Faster goals</p>
                    </div>
                  </motion.div>
                  
                  <motion.div 
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5 }}
                    className="flex items-center gap-2 sm:gap-2.5 p-1 sm:p-1.5 md:p-2 lg:p-3 rounded-lg sm:rounded-lg lg:rounded-xl bg-white bg-opacity-50 hover:bg-opacity-100 transition duration-300 group"
                  >
                    <div className="w-7 sm:w-8 md:w-10 lg:w-12 h-7 sm:h-8 md:h-10 lg:h-12 rounded-full bg-gradient-to-br from-indigo-500 to-pink-600 flex items-center justify-center text-white text-xs sm:text-sm md:text-base lg:text-lg flex-shrink-0 group-hover:scale-110 transition duration-300">🏆</div>
                    <div className="min-w-0">
                      <p className="font-semibold text-gray-900 text-xs sm:text-xs md:text-sm lg:text-base">Earn Awards</p>
                      <p className="text-xs text-gray-500 truncate">Celebrate wins</p>
                    </div>
                  </motion.div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
