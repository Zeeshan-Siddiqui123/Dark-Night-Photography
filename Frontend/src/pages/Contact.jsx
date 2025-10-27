import React from "react";
import { motion } from "framer-motion";
import { FaEnvelope, FaPhoneAlt, FaMapMarkerAlt, FaInstagram, FaFacebookF, FaCamera } from "react-icons/fa";

const Contact = () => {
  return (
    <div className="bg-black text-white min-h-screen flex flex-col items-center justify-center px-6 py-20 md:py-32">
      <div className="max-w-6xl w-full text-center">
        {/* Heading */}
        <motion.h1
          className="text-4xl md:text-5xl font-bold mb-6 text-white"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          Get in <span className="text-blue-400">Touch</span>
        </motion.h1>

        <motion.p
          className="text-gray-300 leading-relaxed text-lg md:text-xl mb-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
        >
          Have a project in mind or want to capture a special moment?  
          We’d love to hear from you! Reach out through the form below or connect via social media.
        </motion.p>

        {/* Contact Info */}
        <div className="grid md:grid-cols-3 gap-8 mt-16 text-left">
          {[
            {
              icon: <FaEnvelope className="text-blue-400 text-3xl" />,
              title: "Email",
              text: "contact@darknightphoto.com",
            },
            {
              icon: <FaPhoneAlt className="text-blue-400 text-3xl" />,
              title: "Phone",
              text: "+92 312 4567890",
            },
            {
              icon: <FaMapMarkerAlt className="text-blue-400 text-3xl" />,
              title: "Location",
              text: "Karachi, Pakistan",
            },
          ].map((info, index) => (
            <motion.div
              key={index}
              className="p-6 border border-gray-800 rounded-2xl bg-gray-900/40 hover:bg-gray-900/60 transition duration-300 text-center"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2, duration: 0.8 }}
            >
              <div className="flex justify-center mb-3">{info.icon}</div>
              <h3 className="text-xl font-semibold text-blue-400 mb-2">{info.title}</h3>
              <p className="text-gray-400">{info.text}</p>
            </motion.div>
          ))}
        </div>

        {/* Contact Form */}
        <motion.form
          className="mt-20 max-w-3xl mx-auto bg-gray-900/40 p-8 rounded-2xl border border-gray-800"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="grid md:grid-cols-2 md:grid-rows-2 gap-6">
            <input
              type="text"
              placeholder="Your Name"
              className="w-full p-3 rounded-lg bg-gray-800 text-white border border-gray-700 focus:border-blue-400 focus:outline-none"
            />
            <input
              type="email"
              placeholder="Your Email"
              className="w-full p-3 rounded-lg bg-gray-800 text-white border border-gray-700 focus:border-blue-400 focus:outline-none"
            />
          </div>
          <textarea
            rows="5"
            placeholder="Your Message"
            className="w-full p-3  rounded-lg bg-gray-800 text-white border border-gray-700 focus:border-blue-400 focus:outline-none"
          ></textarea>
          <motion.button
            type="submit"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="mt-6 bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 px-8 rounded-lg transition"
          >
            Send Message
          </motion.button>
        </motion.form>

        {/* Social Links */}
        <motion.div
          className="flex justify-center gap-6 mt-16 text-2xl"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 1 }}
        >
          <a href="#" className="text-blue-400 hover:text-blue-500">
            <FaInstagram />
          </a>
          <a href="#" className="text-blue-400 hover:text-blue-500">
            <FaFacebookF />
          </a>
          <a href="#" className="text-blue-400 hover:text-blue-500">
            <FaCamera />
          </a>
        </motion.div>
      </div>
    </div>
  );
};

export default Contact;
