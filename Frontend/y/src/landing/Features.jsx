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
    <section id="features" className="py-20 bg-gradient-to-br from-purple-50 to-white text-center">
      <h2 className="text-4xl font-bold text-gray-800 mb-10">Key Features</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto px-6">
        {features.map((f, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: i * 0.1 }}
            className="p-6 bg-white rounded-2xl shadow-md hover:shadow-xl transition"
          >
            <div className="flex flex-col items-center gap-4">
              {f.icon}
              <h3 className="text-xl font-semibold text-gray-800">{f.title}</h3>
              <p className="text-gray-600">{f.description}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Features;
