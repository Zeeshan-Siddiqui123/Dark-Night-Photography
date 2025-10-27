import React from "react";
import { motion } from "framer-motion";
import { FaBullseye, FaEye, FaCameraRetro } from "react-icons/fa";

const About = () => {
  return (
    <div className="bg-black text-white min-h-screen flex flex-col items-center justify-center px-6 py-20 md:py-32">
      <div className="max-w-6xl w-full text-center">
        {/* Heading Section */}
        <motion.h1
          className="text-4xl md:text-5xl font-bold mb-6 text-white"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          About <span className="text-blue-400">Dark Night Photography</span>
        </motion.h1>

        {/* Description */}
        <motion.p
          className="text-gray-300 leading-relaxed text-lg md:text-xl mb-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.9 }}
        >
          At <span className="text-white font-semibold">Dark Night Photography</span>,
          we capture the unseen — the glow of light in darkness, the story within
          shadows, and the emotion behind every glance.  
          Our goal is to make every shot feel cinematic and every portrait feel alive.
          <br />
          <br />
          From wedding nights to city skylines and artistic portraits, we create
          visuals that speak louder than words — where every pixel has a purpose.
        </motion.p>

        {/* Mission & Vision */}
        <div className="grid md:grid-cols-2 gap-10 mt-16 text-left">
          <motion.div
            className="p-6 border border-gray-800 rounded-2xl bg-gray-900/40 hover:bg-gray-900/60 transition duration-300"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="flex items-center gap-3 mb-3">
              <FaBullseye className="text-blue-400 text-3xl" />
              <h2 className="text-2xl font-semibold text-blue-400">Our Mission</h2>
            </div>
            <p className="text-gray-400 leading-relaxed">
              To capture raw emotions and turn them into lasting visual memories —
              delivering photographs that blend artistry and authenticity.
            </p>
          </motion.div>

          <motion.div
            className="p-6 border border-gray-800 rounded-2xl bg-gray-900/40 hover:bg-gray-900/60 transition duration-300"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            <div className="flex items-center gap-3 mb-3">
              <FaEye className="text-blue-400 text-3xl" />
              <h2 className="text-2xl font-semibold text-blue-400">Our Vision</h2>
            </div>
            <p className="text-gray-400 leading-relaxed">
              To redefine night photography through creativity, storytelling, and
              innovation — making every frame a masterpiece that connects with hearts.
            </p>
          </motion.div>
        </div>

        {/* Photo Collage Section */}
        <motion.div
          className="grid md:grid-cols-3 gap-6 mt-24"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          {[
            "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?auto=format&fit=crop&w=800&q=80",
            "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&w=800&q=80",
            "https://images.unsplash.com/photo-1504208434309-cb69f4fe52b0?auto=format&fit=crop&w=800&q=80",
          ].map((img, i) => (
            <motion.div
              key={i}
              className="overflow-hidden rounded-2xl shadow-lg group border border-gray-800"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
            >
              <img
                src={img}
                alt="Photography work"
                className="w-full h-72 object-cover group-hover:opacity-90 transition duration-300"
              />
            </motion.div>
          ))}
        </motion.div>

        {/* Meet the Photographer Section */}
        <motion.div
          className="mt-24 text-center flex flex-col md:flex-row items-center gap-10 md:gap-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <img
            src="https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?auto=format&fit=crop&w=400&q=80"
            alt="Photographer"
            className="rounded-full w-48 h-48 object-cover border-4 border-blue-400 shadow-lg shadow-blue-800/50"
          />
          <div className="text-left max-w-md">
            <h3 className="text-3xl font-semibold text-white mb-2 flex items-center gap-2">
              <FaCameraRetro className="text-blue-400" />
              Meet the Photographer
            </h3>
            <p className="text-gray-400 leading-relaxed">
              I’m Zeeshi — a night sky chaser, storyteller, and passionate photographer.
              For me, photography isn’t just capturing light — it’s capturing life.
              Every project I take is a journey of emotion, patience, and art.
            </p>
          </div>
        </motion.div>

        {/* Signature */}
        <motion.div
          className="mt-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h3 className="text-2xl font-semibold mb-2">— Zeeshi, Founder</h3>
          <p className="text-gray-500 italic">
            “Where shadows whisper stories through the lens.”
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default About;
