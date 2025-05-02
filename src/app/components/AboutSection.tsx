"use client";

import React from "react";

const AboutSection = () => {
  return (
    <section className="py-20 bg-white text-gray-800" id="about">
      <div className="max-w-4xl mx-auto px-6 text-center">
        <h2 className="text-4xl font-bold mb-6">About Me</h2>
        <p className="text-lg leading-relaxed">
          I’m a passionate and detail-oriented software engineer with a strong background in full-stack web and mobile development.
          I specialize in building scalable, high-performance applications using 
          <strong> Laravel</strong>, <strong>React</strong>, <strong>Ionic</strong> and <strong>Next.js</strong>. With hands-on experience in creating RESTful APIs, 
          integrating modern cloud services, and developing cross-platform mobile apps, I aim to deliver clean, efficient, and maintainable code. 
          I thrive in collaborative environments and enjoy tackling complex challenges to build impactful digital solutions.
        </p>
      </div>
    </section>
  );
};

export default AboutSection;
