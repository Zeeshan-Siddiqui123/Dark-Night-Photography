import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FaCameraRetro } from "react-icons/fa";

const Portfolio = () => {
  const [projects, setProjects] = useState([]);

  // Temporary Random Data
  useEffect(() => {
    const demoData = [
      {
        _id: "1",
        title: "Wedding Moments",
        description:
          "Capturing timeless emotions and candid wedding stories in natural light.",
        mainImage:
          "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?auto=format&fit=crop&w=800&q=80",
      },
      {
        _id: "2",
        title: "Urban Portraits",
        description:
          "Stylish street portraits with cinematic depth and contrast lighting.",
        mainImage:
          "https://images.unsplash.com/photo-1504208434309-cb69f4fe52b0?auto=format&fit=crop&w=800&q=80",
      },
      {
        _id: "3",
        title: "Nature Aesthetics",
        description:
          "From golden sunsets to misty mornings, exploring nature’s raw beauty.",
        mainImage:
          "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80",
      },
      {
        _id: "4",
        title: "Night Photography",
        description:
          "Long-exposure shots that reveal the hidden glow of city lights.",
        mainImage:
          "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=800&q=80",
      },
      {
        _id: "5",
        title: "Fashion Editorial",
        description:
          "High-end fashion shoots blending modern styling with artistic direction.",
        mainImage:
          "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=800&q=80",
      },
      {
        _id: "6",
        title: "Travel Stories",
        description:
          "Adventures captured across mountains, beaches, and cultural streets.",
        mainImage:
          "https://images.unsplash.com/photo-1472214103451-9374bd1c798e?auto=format&fit=crop&w=800&q=80",
      },
    ];
    setProjects(demoData);
  }, []);

  return (
    <div className="bg-black text-white mt-5 py-20 px-6 md:px-16">
      <motion.h1
        className="text-4xl md:text-5xl font-bold text-center mb-12 "
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <FaCameraRetro className="inline-block text-blue-400 mr-3 " />
        Our Portfolio
      </motion.h1>

      <div className="grid md:grid-cols-3 gap-8">
        {projects.map((project) => (
          <motion.div
            key={project._id}
            className="bg-gray-900 rounded-xl overflow-hidden shadow-lg group hover:shadow-blue-500/30 transition-shadow duration-500"
            whileHover={{ scale: 1.03 }}
          >
            <div className="relative">
              <img
                src={project.mainImage}
                alt={project.title}
                className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to- from-black via-transparent opacity-70 group-hover:opacity-40 transition"></div>
            </div>

            <div className="p-5">
              <h2 className="text-2xl font-semibold mb-2">{project.title}</h2>
              <p className="text-gray-400 mb-4 text-sm">
                {project.description.slice(0, 80)}...
              </p>
              <Link
                to={`/portfolio/${project._id}`}
                className="px-5 py-2 bg-white text-black rounded-full font-semibold hover:bg-gray-300 transition"
              >
                View More
              </Link>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Portfolio;
