import React from "react";
import { motion } from "framer-motion";
import { Brain, Award, Target, TrendingUp } from "lucide-react";

const features = [
  {
    icon: <Brain className="w-10 h-10 text-purple-600" />,
    title: "AI-Powered Insights",
    description: "Get personalized learning feedback and progress insights.",
  },
  {
    icon: <Award className="w-10 h-10 text-purple-600" />,
    title: "Gamified Rewards",
    description: "Earn badges and milestones for every goal you achieve.",
  },
  {
    icon: <Target className="w-10 h-10 text-purple-600" />,
    title: "Goal Tracking",
    description: "Set study goals and watch your consistency grow.",
  },
  {
    icon: <TrendingUp className="w-10 h-10 text-purple-600" />,
    title: "Smart Dashboard",
    description: "Visualize your performance and study streaks easily.",
  },
];

const Features = () => {
  return (
    <section id="features" className="py-24 bg-gradient-to-br from-white via-indigo-50 to-white text-center">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-6"
        >
          <span className="text-purple-600 font-semibold text-sm uppercase tracking-wider">Our Features</span>
        </motion.div>
        
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-5xl md:text-6xl font-bold text-gray-900 mb-20 leading-tight"
        >
          Powerful Features for <span className="bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">Your Success</span>
        </motion.h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((f, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              whileHover={{ y: -10, boxShadow: "0 20px 40px rgba(0, 0, 0, 0.1)" }}
              className="p-8 bg-white rounded-2xl shadow-md hover:shadow-2xl transition duration-300 border border-gray-100 cursor-pointer group"
            >
              <div className="flex flex-col items-center gap-4">
                <div className="p-4 bg-gradient-to-br from-purple-100 to-indigo-100 rounded-xl group-hover:from-purple-200 group-hover:to-indigo-200 transition duration-300">
                  {f.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900">{f.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{f.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
