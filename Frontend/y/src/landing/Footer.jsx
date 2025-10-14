import React from "react";
import { Mail, Twitter, Github, Globe } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-br from-purple-50 to-white border-t border-purple-100 mt-20">
      <div className="max-w-6xl mx-auto px-6 py-10 grid grid-cols-1 md:grid-cols-3 gap-10 text-center md:text-left">
        
        <div>
          <h2 className="text-2xl font-extrabold bg-gradient-to-r from-purple-500 to-indigo-500 bg-clip-text text-transparent mb-3">
            StudyHub
          </h2>
          <p className="text-gray-600 text-sm">
            Your AI-powered learning companion — track progress, unlock rewards,
            and stay motivated every day.
          </p>
        </div>

        {/* --- Middle: Links --- */}
        <div>
          <h3 className="text-lg font-semibold text-gray-800 mb-3">Quick Links</h3>
          <ul className="space-y-2 text-gray-600 text-sm">
            <li><a href="#about" className="hover:text-purple-600 transition">About</a></li>
            <li><a href="#features" className="hover:text-purple-600 transition">Features</a></li>
            <li><a href="#pricing" className="hover:text-purple-600 transition">Pricing</a></li>
            <li><a href="#contact" className="hover:text-purple-600 transition">Contact</a></li>
          </ul>
        </div>

        {/* --- Right: Social --- */}
        <div>
          <h3 className="text-lg font-semibold text-gray-800 mb-3">Follow Us</h3>
          <div className="flex justify-center md:justify-start gap-4">
            <a
              href="mailto:studyhub@example.com"
              className="p-2 bg-purple-100 rounded-full hover:bg-purple-200 transition"
            >
              <Mail className="w-5 h-5 text-purple-600" />
            </a>
            <a
              href="https://twitter.com/"
              target="_blank"
              rel="noreferrer"
              className="p-2 bg-purple-100 rounded-full hover:bg-purple-200 transition"
            >
              <Twitter className="w-5 h-5 text-purple-600" />
            </a>
            <a
              href="https://github.com/"
              target="_blank"
              rel="noreferrer"
              className="p-2 bg-purple-100 rounded-full hover:bg-purple-200 transition"
            >
              <Github className="w-5 h-5 text-purple-600" />
            </a>
            <a
              href="https://studyhub.com"
              target="_blank"
              rel="noreferrer"
              className="p-2 bg-purple-100 rounded-full hover:bg-purple-200 transition"
            >
              <Globe className="w-5 h-5 text-purple-600" />
            </a>
          </div>
        </div>
      </div>

      {/* --- Bottom --- */}
      <div className="border-t border-gray-200 mt-10 py-6 text-center text-gray-500 text-sm">
        © {new Date().getFullYear()} <span className="font-semibold text-purple-600">StudyHub</span>. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
