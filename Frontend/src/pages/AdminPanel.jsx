import React, { useState, useEffect } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { message, Modal, Spin } from "antd";
import { FaCloudUploadAlt, FaTrash, FaInfoCircle } from "react-icons/fa";

const AdminPanel = () => {
  const [about, setAbout] = useState({
    description: "",
    instagram: "",
    facebook: "",
    whatsapp: "",
  });
  const [aboutId, setAboutId] = useState("");
  const [portfolios, setPortfolios] = useState([]);
  const [loading, setLoading] = useState(false);
  const [portfolioData, setPortfolioData] = useState({
    title: "",
    description: "",
    images: [],
  });

  const API_URL = "http://localhost:5000/api";

  // Fetch About Content
  const fetchAbout = async () => {
    try {
      const res = await axios.get(`${API_URL}/about/getaboutcontent`);
      if (res.data.length > 0) {
        const data = res.data[0];
        setAbout(data);
        setAboutId(data._id);
      }
    } catch (err) {
      console.error(err);
    }
  };

  // Fetch Portfolio
  const fetchPortfolios = async () => {
    try {
      const res = await axios.get(`${API_URL}/portfolio`);
      setPortfolios(res.data.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchAbout();
    fetchPortfolios();
  }, []);

  // Update About Content
  const handleAboutUpdate = async () => {
    try {
      await axios.put(`${API_URL}/about/updateaboutcontent/${aboutId}`, about);
      message.success("About section updated successfully!");
    } catch (err) {
      message.error("Error updating About section");
    }
  };

  // Create Portfolio
  const handlePortfolioSubmit = async (e) => {
    e.preventDefault();
    if (
      !portfolioData.title ||
      !portfolioData.description ||
      portfolioData.images.length < 3
    ) {
      return message.warning("Please fill all fields and upload at least 3 images");
    }

    const formData = new FormData();
    formData.append("title", portfolioData.title);
    formData.append("description", portfolioData.description);
    for (let img of portfolioData.images) {
      formData.append("images", img);
    }

    setLoading(true);
    try {
      await axios.post(`${API_URL}/portfolio/create`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      message.success("Portfolio uploaded successfully!");
      setPortfolioData({ title: "", description: "", images: [] });
      fetchPortfolios();
    } catch (err) {
      message.error("Error uploading portfolio");
    } finally {
      setLoading(false);
    }
  };

  // Delete Portfolio
  const deletePortfolio = async (id) => {
    Modal.confirm({
      title: "Are you sure?",
      onOk: async () => {
        try {
          await axios.delete(`${API_URL}/portfolio/${id}`);
          message.success("Deleted successfully");
          fetchPortfolios();
        } catch (err) {
          message.error("Error deleting portfolio");
        }
      },
    });
  };

  return (
    <div className="min-h-screen bg-black text-white py-10 px-6 md:px-16">
      <motion.h1
        className="text-4xl font-bold mb-8 text-center text-blue-400"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
      >
        Admin Panel — Dark Night Photography
      </motion.h1>

      {/* ABOUT SECTION */}
      <motion.div
        className="bg-gray-900/60 p-6 rounded-2xl shadow-lg mb-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
          <FaInfoCircle /> About Section
        </h2>

        <textarea
          value={about.description}
          onChange={(e) => setAbout({ ...about, description: e.target.value })}
          placeholder="Write about your photography..."
          className="w-full p-3 rounded-lg bg-gray-800 text-white mb-4 focus:ring focus:ring-blue-500"
          rows={4}
        />
        <div className="grid md:grid-cols-3 gap-4">
          <input
            type="text"
            value={about.instagram}
            onChange={(e) => setAbout({ ...about, instagram: e.target.value })}
            placeholder="Instagram URL"
            className="p-3 rounded-lg bg-gray-800 text-white focus:ring focus:ring-blue-500"
          />
          <input
            type="text"
            value={about.facebook}
            onChange={(e) => setAbout({ ...about, facebook: e.target.value })}
            placeholder="Facebook URL"
            className="p-3 rounded-lg bg-gray-800 text-white focus:ring focus:ring-blue-500"
          />
          <input
            type="text"
            value={about.whatsapp}
            onChange={(e) => setAbout({ ...about, whatsapp: e.target.value })}
            placeholder="WhatsApp Number"
            className="p-3 rounded-lg bg-gray-800 text-white focus:ring focus:ring-blue-500"
          />
        </div>
        <button
          onClick={handleAboutUpdate}
          className="mt-4 px-6 py-3 bg-blue-500 rounded-lg font-semibold hover:bg-blue-600 transition"
        >
          Update About
        </button>
      </motion.div>

      {/* PORTFOLIO SECTION */}
      <motion.div
        className="bg-gray-900/60 p-6 rounded-2xl shadow-lg"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
          <FaCloudUploadAlt /> Upload New Portfolio
        </h2>

        <form onSubmit={handlePortfolioSubmit}>
          <input
            type="text"
            placeholder="Title"
            value={portfolioData.title}
            onChange={(e) =>
              setPortfolioData({ ...portfolioData, title: e.target.value })
            }
            className="w-full p-3 rounded-lg bg-gray-800 text-white mb-3 focus:ring focus:ring-blue-500"
          />
          <textarea
            placeholder="Description"
            value={portfolioData.description}
            onChange={(e) =>
              setPortfolioData({ ...portfolioData, description: e.target.value })
            }
            className="w-full p-3 rounded-lg bg-gray-800 text-white mb-3 focus:ring focus:ring-blue-500"
            rows={3}
          />
          <input
            type="file"
            multiple
            accept="image/*"
            onChange={(e) =>
              setPortfolioData({ ...portfolioData, images: [...e.target.files] })
            }
            className="w-full bg-gray-800 text-gray-300 p-3 rounded-lg mb-3 cursor-pointer"
          />
          <button
            type="submit"
            disabled={loading}
            className="px-6 py-3 bg-blue-500 rounded-lg font-semibold hover:bg-blue-600 transition flex items-center gap-2"
          >
            {loading ? <Spin size="small" /> : "Upload Portfolio"}
          </button>
        </form>

        {/* Display Portfolios */}
        <div className="grid md:grid-cols-3 gap-6 mt-10">
          {portfolios.map((item) => (
            <motion.div
              key={item._id}
              className="bg-gray-800 rounded-lg overflow-hidden relative group"
              whileHover={{ scale: 1.03 }}
            >
              <img
                src={item.images[0]}
                alt={item.title}
                className="h-56 w-full object-cover"
              />
              <div className="p-4">
                <h3 className="text-xl font-semibold">{item.title}</h3>
                <p className="text-gray-400 text-sm">
                  {item.description.substring(0, 80)}...
                </p>
              </div>
              <button
                onClick={() => deletePortfolio(item._id)}
                className="absolute top-3 right-3 bg-red-600 p-2 rounded-full opacity-0 group-hover:opacity-100 transition"
              >
                <FaTrash />
              </button>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default AdminPanel;
