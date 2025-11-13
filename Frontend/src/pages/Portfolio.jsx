import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FaCameraRetro } from "react-icons/fa";
import axios from "axios";

const Portfolio = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const API_URL = "http://localhost:5000/api/portfolio/captures";

  // Fetch portfolio data from backend
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await axios.get(API_URL);
        // Some APIs return { success: true, data: [...] }
        const data = res.data.data || res.data;
        setProjects(data);
      } catch (err) {
        console.error("Error fetching portfolio:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchProjects();
  }, []);

  return (
    <div className="bg-black text-white mt-5 py-20 px-6 md:px-16">
      <motion.h1
        className="text-4xl md:text-5xl font-bold text-center mb-12"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <FaCameraRetro className="inline-block text-blue-400 mr-3" />
        Our Portfolio
      </motion.h1>

      {loading ? (
        <p className="text-center text-gray-400">Loading...</p>
      ) : projects.length === 0 ? (
        <p className="text-center text-gray-500">No portfolios available yet.</p>
      ) : (
        <div className="grid md:grid-cols-3 gap-8">
          {projects.map((project) => (
            <motion.div
              key={project._id}
              className="bg-gray-900 rounded-xl overflow-hidden shadow-lg group hover:shadow-blue-500/30 transition-shadow duration-500"
              whileHover={{ scale: 1.03 }}
            >
              <div className="relative">
                <img
                  src={
                    project.images && project.images.length > 0
                      ? project.images[0]
                      : "https://via.placeholder.com/400x250?text=No+Image"
                  }
                  alt={project.title}
                  className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent opacity-70 group-hover:opacity-40 transition"></div>
              </div>

              <div className="p-5">
                <h2 className="text-2xl font-semibold mb-2">{project.title}</h2>
                <p className="text-gray-400 mb-4 text-sm">
                  {project.description?.slice(0, 80)}...
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
      )}
    </div>
  );
};

export default Portfolio;
