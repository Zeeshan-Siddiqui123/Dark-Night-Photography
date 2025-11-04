import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FaArrowLeft, FaCameraRetro, FaImage } from "react-icons/fa";

const PortfolioDetails = () => {
  const { id } = useParams();
  const [project, setProject] = useState(null);

  // Temporary demo data
  useEffect(() => {
    const demoData = [
      {
        _id: "1",
        title: "Wedding Moments",
        description:
          "A beautiful wedding series capturing emotions, laughter, and candid joy in natural light. Every frame narrates a love story — timeless and elegant.",
        mainImage:
          "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?auto=format&fit=crop&w=800&q=80",
        gallery: [
          "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=800&q=80",
          "https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=800&q=80",
          "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=800&q=80",
        ],
      },
      {
        _id: "2",
        title: "Urban Portraits",
        description:
          "Exploring city life through creative portraits — blending style, attitude, and cinematic backdrops to create visual poetry in the urban jungle.",
        mainImage:
          "https://images.unsplash.com/photo-1504208434309-cb69f4fe52b0?auto=format&fit=crop&w=800&q=80",
        gallery: [
          "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?auto=format&fit=crop&w=800&q=80",
          "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=800&q=80",
          "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&w=800&q=80",
        ],
      },
      {
        _id: "3",
        title: "Nature Aesthetics",
        description:
          "Nature photography that captures emotion through the lens — from serene lakes to golden forests, every shot reflects pure tranquility.",
        mainImage:
          "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80",
        gallery: [
          "https://images.unsplash.com/photo-1472214103451-9374bd1c798e?auto=format&fit=crop&w=800&q=80",
          "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=800&q=80",
          "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=800&q=80",
        ],
      },
    ];

    const found = demoData.find((item) => item._id === id);
    setProject(found || demoData[0]); // fallback
  }, [id]);

  if (!project) {
    return (
      <div className="text-center text-gray-400 py-20">Loading project...</div>
    );
  }

  return (
    <div className="bg-black text-white min-h-screen py-20 px-6 md:px-16">
      {/* Back Button */}
      <Link
        to="/portfolio"
        className="inline-flex items-center gap-2 text-gray-300 hover:text-blue-400 transition mb-10"
      >
        <FaArrowLeft /> Back to Portfolio
      </Link>

      {/* Title */}
      <motion.h1
        className="text-4xl md:text-5xl font-bold mb-6 flex items-center gap-3"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <FaCameraRetro className="text-blue-400" />
        {project.title}
      </motion.h1>

      {/* Description */}
      <motion.p
        className="text-gray-400 mb-10 max-w-3xl leading-relaxed"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        {project.description}
      </motion.p>

      {/* Main Image */}
      <motion.div
        className="rounded-2xl overflow-hidden shadow-lg mb-12"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
      >
        <img
          src={project.mainImage}
          alt={project.title}
          className="w-full h-[70vh] object-cover"
        />
      </motion.div>

      {/* Gallery */}
      <motion.h2
        className="text-3xl font-semibold mb-6 flex items-center gap-3"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <FaImage className="text-blue-400" />
        Gallery
      </motion.h2>

      <div className="grid md:grid-cols-3 gap-6">
        {project.gallery.map((img, index) => (
          <motion.div
            key={index}
            className="rounded-xl overflow-hidden shadow-md group"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.2 }}
          >
            <img
              src={img}
              alt="Gallery"
              className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-700"
            />
          </motion.div>
        ))}
      </div>

      {/* Quote or Signature */}
      <motion.div
        className="mt-16 text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <p className="italic text-gray-400 text-lg">
          “Through our lens, every shadow has a story.”
        </p>
        <p className="text-blue-400 font-semibold mt-3">— Dark Night Photography</p>
      </motion.div>
    </div>
  );
};

export default PortfolioDetails;
