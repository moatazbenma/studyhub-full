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
    <section id="pricing" className="py-20 bg-gradient-to-br from-purple-50 to-white text-center">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-4xl font-bold text-gray-800 mb-10"
      >
        Pricing Plans
      </motion.h2>

      <div className="flex flex-col md:flex-row justify-center gap-8 px-6">
        {plans.map((plan, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: i * 0.2 }}
            className={`w-full max-w-sm rounded-2xl shadow-lg border ${
              plan.highlighted ? "border-purple-500 bg-white scale-105" : "border-gray-200 bg-white"
            } p-8 text-center`}
          >
            <h3 className="text-2xl font-semibold text-gray-800 mb-2">{plan.name}</h3>
            <p className="text-4xl font-bold text-purple-600 mb-6">{plan.price}</p>
            <ul className="text-gray-600 mb-6 space-y-3">
              {plan.features.map((f, idx) => (
                <li key={idx} className="flex items-center justify-center gap-2">
                  <Check className="w-5 h-5 text-green-500" /> {f}
                </li>
              ))}
            </ul>
            <button
              className={`px-6 py-3 rounded-full font-semibold transition ${
                plan.highlighted
                  ? "bg-purple-600 text-white hover:bg-purple-700"
                  : "bg-gray-100 text-gray-800 hover:bg-gray-200"
              }`}
            >
              {plan.button}
            </button>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Pricing;
