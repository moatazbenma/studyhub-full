import React from "react";
import { motion } from "framer-motion";
import { Mail, Twitter, Github, Globe } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-br from-gray-900 via-gray-800 to-black border-t border-gray-700">
      <div className="max-w-6xl mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-3 gap-12 text-center md:text-left">
        
        {/* Left: Branding */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl font-extrabold bg-gradient-to-r from-purple-400 to-indigo-400 bg-clip-text text-transparent mb-4">
            StudyHub
          </h2>
          <p className="text-gray-400 text-sm leading-relaxed">
            Your AI-powered learning companion — track progress, unlock rewards,
            and stay motivated every day.
          </p>
        </motion.div>

        {/* Middle: Links */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <h3 className="text-lg font-bold text-white mb-4">Quick Links</h3>
          <ul className="space-y-2 text-gray-400 text-sm">
            <li><a href="#about" className="hover:text-purple-400 transition duration-300">About</a></li>
            <li><a href="#features" className="hover:text-purple-400 transition duration-300">Features</a></li>
            <li><a href="#pricing" className="hover:text-purple-400 transition duration-300">Pricing</a></li>
            <li><a href="#contact" className="hover:text-purple-400 transition duration-300">Contact</a></li>
          </ul>
        </motion.div>

        {/* Right: Social */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <h3 className="text-lg font-bold text-white mb-4">Follow Us</h3>
          <div className="flex justify-center md:justify-start gap-4">
            <a
              href="mailto:studyhub@example.com"
              className="p-2 bg-purple-600/20 rounded-full hover:bg-purple-600/40 transition duration-300 border border-purple-500/30 hover:border-purple-500/60"
            >
              <Mail className="w-5 h-5 text-purple-400" />
            </a>
            <a
              href="https://twitter.com/"
              target="_blank"
              rel="noreferrer"
              className="p-2 bg-purple-600/20 rounded-full hover:bg-purple-600/40 transition duration-300 border border-purple-500/30 hover:border-purple-500/60"
            >
              <Twitter className="w-5 h-5 text-purple-400" />
            </a>
            <a
              href="https://github.com/"
              target="_blank"
              rel="noreferrer"
              className="p-2 bg-purple-600/20 rounded-full hover:bg-purple-600/40 transition duration-300 border border-purple-500/30 hover:border-purple-500/60"
            >
              <Github className="w-5 h-5 text-purple-400" />
            </a>
            <a
              href="https://studyhub.com"
              target="_blank"
              rel="noreferrer"
              className="p-2 bg-purple-600/20 rounded-full hover:bg-purple-600/40 transition duration-300 border border-purple-500/30 hover:border-purple-500/60"
            >
              <Globe className="w-5 h-5 text-purple-400" />
            </a>
          </div>
        </motion.div>
      </div>

      {/* Bottom */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="border-t border-gray-700 mt-12 py-8 text-center text-gray-500 text-sm"
      >
        © {new Date().getFullYear()} <span className="font-semibold bg-gradient-to-r from-purple-400 to-indigo-400 bg-clip-text text-transparent">StudyHub</span>. All rights reserved.
      </motion.div>
    </footer>
  );
};

export default Footer;
