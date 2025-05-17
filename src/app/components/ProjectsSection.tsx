"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { FaReact, FaAngular, FaLaravel, FaBootstrap, FaNodeJs, FaCss3 } from 'react-icons/fa';
import * as Icons from 'react-icons/fa';

type Technology = {
  name: string;
  icon: string;
};

type Project = {
  id: number;
  title: string;
  description: string;
  technologies: Technology[];
  images: string[];
  githubUrl?: string;
  liveUrl?: string;
};

// const getTechnologyIcon = (tech: string) => {
//   switch (tech) {
//     case "Laravel":
//       return <FaLaravel className="text-gray-700" />;
//     case "Bootstrap":
//       return <FaBootstrap className="text-gray-700" />;
//     case "Ionic":
//       return <FaReact className="text-gray-700" />;
//     case "Angular":
//       return <FaAngular className="text-gray-700" />;
//     case "Next.js":
//       return <FaNodeJs className="text-gray-700" />;
//     case "Tailwind CSS":
//         return <FaCss3 className="text-gray-700" />;
//     default:
//       return <span className="text-gray-700">{tech}</span>;
//   }
// };

const getTechnologyIcon = (iconName: string) => {
  const Icon = (Icons as any)[iconName];
  return Icon ? <Icon className="text-gray-700" /> : null;
};

const ProjectsSection = () => {
  const [projects, setProjects] = useState<Project[]>([]);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await fetch("/api/projects");
        const data = await res.json();
        console.log(data); 
        setProjects(data);
      } catch (error) {
        console.error("Failed to fetch projects:", error);
      }
    };

    fetchProjects();
  }, []);

  return (
    <section className="py-20 bg-gradient-to-r from-gray-200 to-white text-gray-900" id="portfolio">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="text-4xl font-extrabold text-center mb-12 text-black">Portfolio</h2>

        {projects.length === 0 ? (
          <p className="text-center text-gray-600">Loading projects...</p>
        ) : (
          <div className="space-y-20">
            {projects.map((project, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-transform duration-500 transform hover:scale-105 overflow-hidden"
              >
                <div className="p-6">
                  <motion.h3
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="text-3xl font-semibold mb-4 text-gray-800"
                  >
                    {project.title}
                  </motion.h3>
                  <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="text-lg text-gray-600 mb-4"
                  >
                    {project.description}
                  </motion.p>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                    className="flex flex-wrap gap-3 mb-6"
                  >
                    {project.technologies.map((tech, i) => (
                      <span
                        key={i}
                        className="bg-gray-300 text-gray-800 text-sm px-3 py-1 rounded-full flex items-center gap-2"
                      >
                        {getTechnologyIcon(tech.icon)}
                        {tech.name}
                      </span>
                    ))}
                  </motion.div>
                </div>

                {/* Images */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 p-6">
                  {project.images.map((img, i) => (
                    <div key={i} className="relative w-full h-64 rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300">
                      <Image
                        src={img}
                        alt={`${project.title} screenshot ${i + 1}`}
                        layout="responsive"
                        width={500}
                        height={300}
                        objectFit="cover"
                      />
                    </div>
                  ))}
                </div>

                <div className="p-6 flex gap-4 justify-center">
                  {project.githubUrl && (
                    <motion.a
                      href={project.githubUrl}
                      target="_blank"
                      whileHover={{ scale: 1.1 }}
                      className="text-gray-800 hover:underline"
                    >
                      GitHub
                    </motion.a>
                  )}
                  {project.liveUrl && (
                    <motion.a
                      href={project.liveUrl}
                      target="_blank"
                      whileHover={{ scale: 1.1 }}
                      className="text-gray-800 hover:underline"
                    >
                      Live Demo
                    </motion.a>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default ProjectsSection;
