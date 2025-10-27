import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FaArrowRight, FaChevronDown, FaCameraRetro } from "react-icons/fa";

const Home = () => {
  return (
    <div className="bg-black text-white">
      {/* Hero Section */}
      <section className="relative h-[85vh] flex flex-col justify-center items-center text-center overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1504208434309-cb69f4fe52b0?auto=format&fit=crop&w=1600&q=80"
          alt="Dark Night Photography"
          className="absolute inset-0 w-full h-full object-cover opacity-60"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/70 to-black"></div>

        <motion.div
          className="relative z-10 max-w-2xl px-6"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <motion.div
            className="flex justify-center mb-6"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            <FaCameraRetro className="text-5xl text-blue-400" />
          </motion.div>

          <h1 className="text-5xl md:text-6xl font-bold mb-4">
            Capture the <span className="text-blue-400">Night</span>
          </h1>
          <p className="text-gray-300 text-lg mb-8">
            Transforming shadows into stories — experience the art of dark night photography.
          </p>

          <Link
            to="/portfolio"
            className="inline-flex items-center gap-2 px-8 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-full font-semibold transition"
          >
            View Portfolio <FaArrowRight />
          </Link>
        </motion.div>

        <motion.div
          className="absolute bottom-6 text-gray-400 cursor-pointer hover:text-white transition"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, y: [0, 10, 0] }}
          transition={{ delay: 1, duration: 2, repeat: Infinity }}
        >
          <FaChevronDown className="text-2xl" />
        </motion.div>
      </section>

      {/* Featured Portfolio Preview */}
      <section className="py-14 px-6 md:px-12 text-center bg-gradient-to-b from-black via-gray-900 to-black -mt-10">
        <motion.h2
          className="text-4xl font-bold mb-10"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          Featured <span className="text-blue-400">Shots</span>
        </motion.h2>

        <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {[
            "https://images.unsplash.com/photo-1511765224389-37f0e77cf0eb",
            "https://images.unsplash.com/photo-1506744038136-46273834b3fb",
            "https://images.unsplash.com/photo-1472214103451-9374bd1c798e",
          ].map((img, i) => (
            <motion.div
              key={i}
              className="overflow-hidden rounded-2xl shadow-lg group relative"
              whileHover={{ scale: 1.03 }}
              transition={{ duration: 0.4 }}
            >
              <img
                src={img}
                alt="Photography"
                className="w-full h-72 object-cover transform group-hover:scale-110 transition duration-500"
              />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition duration-300 flex items-center justify-center">
                <p className="text-white font-semibold tracking-wide">
                  Capturing Emotion
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          className="mt-10"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <Link
            to="/portfolio"
            className="inline-block px-8 py-3 border border-blue-400 text-blue-400 rounded-full hover:bg-blue-500 hover:text-white transition"
          >
            Explore Full Portfolio
          </Link>
        </motion.div>
      </section>
    </div>
  );
};

export default Home;
