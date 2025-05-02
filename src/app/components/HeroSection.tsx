"use client";

import { motion } from "framer-motion";
import React from "react";

const HeroSection = () => {
  return (
    <section className="h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-gray-800 to-zinc-900 text-white px-6">
      <div className="text-center max-w-3xl">
        <motion.h1
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-5xl md:text-6xl font-extrabold leading-tight drop-shadow-md"
        >
          Hello, I am <span className="text-yellow-300">Indah Wahyuandillah</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="mt-4 text-xl md:text-2xl text-white/90"
        >
          Software Engineer | Laravel, React, & Mobile App (Ionic)
        </motion.p>

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 1 }}
          className="mt-8 flex flex-col sm:flex-row gap-4 justify-center"
        >
          <a
            href="#portfolio"
            className="bg-yellow-400 hover:bg-yellow-500 text-black font-semibold py-3 px-6 rounded-xl transition duration-300"
          >
            View Portfolio
          </a>
          <a
            href="#contact"
            className="border border-white hover:bg-white hover:text-black text-white font-semibold py-3 px-6 rounded-xl transition duration-300"
          >
            Contact Me
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
