import React from "react";
import { motion } from "framer-motion";
import { Check } from "lucide-react";

const plans = [
  {
    name: "Free Plan",
    price: "$0",
    features: [
      "Basic study tracking",
      "Access to limited AI insights",
      "Community challenges",
    ],
    button: "Get Started",
    highlighted: false,
  },
  {
    name: "Pro Plan",
    price: "$9.99/mo",
    features: [
      "Unlimited study tracking",
      "Full AI recommendations",
      "Custom goals & reports",
      "Early access to new features",
    ],
    button: "Upgrade Now",
    highlighted: true,
  },
];

const Pricing = () => {
  return (
    <section id="pricing" className="py-24 bg-gradient-to-br from-white via-purple-50 to-white text-center">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-6"
        >
          <span className="text-purple-600 font-semibold text-sm uppercase tracking-wider">Pricing Plans</span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-5xl md:text-6xl font-bold text-gray-900 mb-20 leading-tight"
        >
          Choose Your <span className="bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">Perfect Plan</span>
        </motion.h2>

        <div className="flex flex-col md:flex-row justify-center gap-8">
          {plans.map((plan, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: i * 0.2 }}
              whileHover={{ y: -10 }}
              className={`w-full max-w-sm rounded-2xl shadow-lg border transition duration-300 p-8 text-center ${
                plan.highlighted 
                  ? "border-purple-500 bg-gradient-to-br from-purple-50 to-indigo-50 ring-2 ring-purple-500 scale-105" 
                  : "border-gray-200 bg-white hover:shadow-xl"
              }`}
            >
              {plan.highlighted && (
                <div className="inline-block mb-4 px-4 py-1 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-full text-sm font-semibold">
                  Most Popular
                </div>
              )}
              <h3 className="text-2xl font-bold text-gray-900 mb-2">{plan.name}</h3>
              <p className="text-5xl font-bold bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent mb-6">{plan.price}</p>
              <ul className="text-gray-700 mb-8 space-y-4 text-left">
                {plan.features.map((f, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" /> 
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
              <button
                className={`w-full px-6 py-3 rounded-xl font-semibold transition duration-300 ${
                  plan.highlighted
                    ? "bg-gradient-to-r from-purple-600 to-indigo-600 text-white hover:from-purple-700 hover:to-indigo-700 shadow-lg"
                    : "bg-gray-100 text-gray-900 hover:bg-gray-200"
                }`}
              >
                {plan.button}
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Pricing;
