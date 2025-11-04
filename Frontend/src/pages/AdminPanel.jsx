import React, { useState, useEffect } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { message, Modal, Spin } from "antd";
import { FaCloudUploadAlt, FaTrash, FaInfoCircle, FaUserEdit } from "react-icons/fa";

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

  const [accountUpdate, setAccountUpdate] = useState({ username: "", password: "" });
  const API_URL = "http://localhost:5000/api";

  // 🟢 Fetch About Content
  const fetchAbout = async () => {
    try {
      const res = await axios.get(`${API_URL}/about/getaboutcontent`, { withCredentials: true });
      if (res.data.length > 0) {
        const data = res.data[0];
        setAbout(data);
        setAboutId(data._id);
      }
    } catch (err) {
      console.error(err);
    }
  };

  // 🟢 Fetch Portfolio
  const fetchPortfolios = async () => {
    try {
      const res = await axios.get(`${API_URL}/portfolio`, { withCredentials: true });
      const payload = res.data.data || res.data;
      setPortfolios(payload);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchAbout();
    fetchPortfolios();
  }, []);

  // 🟡 Update About
  const handleAboutUpdate = async () => {
    if (!aboutId) return message.warning("No about content found");
    try {
      await axios.put(`${API_URL}/about/updateaboutcontent/${aboutId}`, about, {
        withCredentials: true,
      });
      message.success("About section updated successfully!");
      fetchAbout();
    } catch (err) {
      message.error("Error updating About section");
    }
  };

  // 🟠 Update Admin Username / Password
  const handleAccountUpdate = async (e) => {
    e.preventDefault();
    if (!accountUpdate.username || !accountUpdate.password)
      return message.warning("Provide both username and password");
    try {
      await axios.put(`${API_URL}/auth/update/ADMIN_ID_HERE`, accountUpdate, {
        withCredentials: true,
      });
      message.success("Account updated successfully. Please re-login.");
    } catch (err) {
      message.error("Error updating account");
    }
  };

  // 🟣 Upload Portfolio
  const handlePortfolioSubmit = async (e) => {
    e.preventDefault();
    if (
      !portfolioData.title ||
      !portfolioData.description ||
      portfolioData.images.length < 3
    ) {
      return message.warning("Fill all fields and upload at least 3 images");
    }

    const formData = new FormData();
    formData.append("title", portfolioData.title);
    formData.append("description", portfolioData.description);
    portfolioData.images.forEach((img) => formData.append("images", img));

    setLoading(true);
    try {
      await axios.post(`${API_URL}/portfolio/create`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
        withCredentials: true,
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

  // 🔴 Delete Portfolio
  const deletePortfolio = async (id) => {
    Modal.confirm({
      title: "Are you sure?",
      onOk: async () => {
        try {
          await axios.delete(`${API_URL}/portfolio/${id}`, { withCredentials: true });
          message.success("Deleted successfully");
          fetchPortfolios();
        } catch {
          message.error("Error deleting portfolio");
        }
      },
    });
  };

  // 🖼️ Preview Selected Images
  const renderPreview = () => {
    if (!portfolioData.images?.length) return null;
    const arr = Array.from(portfolioData.images);
    return (
      <div className="flex gap-3 flex-wrap mt-3">
        {arr.map((file, idx) => {
          const url = typeof file === "string" ? file : URL.createObjectURL(file);
          return (
            <img
              key={idx}
              src={url}
              alt={`preview-${idx}`}
              className="w-24 h-24 object-cover rounded border border-gray-700"
            />
          );
        })}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-black text-white py-6 px-4 md:px-12">
      <motion.h1
        className="text-3xl md:text-4xl font-bold text-blue-400 mb-8 text-center"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
      >
        Admin Panel — Dark Night Photography
      </motion.h1>

      {/* ABOUT SECTION */}
      <motion.div
        className="bg-gray-900/60 p-6 rounded-2xl shadow-lg mb-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <h2 className="text-2xl font-semibold flex items-center gap-2 mb-4">
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
            value={about.instagram}
            onChange={(e) => setAbout({ ...about, instagram: e.target.value })}
            placeholder="Instagram URL"
            className="p-3 rounded-lg bg-gray-800 text-white"
          />
          <input
            value={about.facebook}
            onChange={(e) => setAbout({ ...about, facebook: e.target.value })}
            placeholder="Facebook URL"
            className="p-3 rounded-lg bg-gray-800 text-white"
          />
          <input
            value={about.whatsapp}
            onChange={(e) => setAbout({ ...about, whatsapp: e.target.value })}
            placeholder="WhatsApp Number"
            className="p-3 rounded-lg bg-gray-800 text-white"
          />
        </div>
        <button
          onClick={handleAboutUpdate}
          className="mt-4 px-6 py-2 bg-blue-500 rounded-lg hover:bg-blue-600 transition"
        >
          Update About
        </button>
      </motion.div>

      {/* ACCOUNT UPDATE SECTION */}
      <motion.div
        className="bg-gray-900/60 p-6 rounded-2xl shadow-lg mb-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <h2 className="text-2xl font-semibold flex items-center gap-2 mb-4">
          <FaUserEdit /> Update Admin Account
        </h2>
        <form onSubmit={handleAccountUpdate} className="grid md:grid-cols-3 gap-4 items-end">
          <input
            type="text"
            placeholder="New Username"
            value={accountUpdate.username}
            onChange={(e) => setAccountUpdate({ ...accountUpdate, username: e.target.value })}
            className="p-3 rounded-lg bg-gray-800 text-white"
          />
          <input
            type="password"
            placeholder="New Password"
            value={accountUpdate.password}
            onChange={(e) => setAccountUpdate({ ...accountUpdate, password: e.target.value })}
            className="p-3 rounded-lg bg-gray-800 text-white"
          />
          <button className="px-4 py-2 bg-green-600 rounded-lg hover:bg-green-700">
            Update
          </button>
        </form>
      </motion.div>

      {/* PORTFOLIO SECTION */}
      <motion.div
        className="bg-gray-900/60 p-6 rounded-2xl shadow-lg"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <h2 className="text-2xl font-semibold flex items-center gap-2 mb-4">
          <FaCloudUploadAlt /> Upload New Portfolio
        </h2>

        <form onSubmit={handlePortfolioSubmit}>
          <input
            placeholder="Title"
            value={portfolioData.title}
            onChange={(e) => setPortfolioData({ ...portfolioData, title: e.target.value })}
            className="w-full p-3 rounded-lg bg-gray-800 text-white mb-3"
          />
          <textarea
            placeholder="Description"
            value={portfolioData.description}
            onChange={(e) =>
              setPortfolioData({ ...portfolioData, description: e.target.value })
            }
            className="w-full p-3 rounded-lg bg-gray-800 text-white mb-3"
            rows={3}
          />
          <input
            type="file"
            multiple
            accept="image/*"
            onChange={(e) => setPortfolioData({ ...portfolioData, images: [...e.target.files] })}
            className="w-full bg-gray-800 text-gray-300 p-3 rounded-lg mb-3 cursor-pointer"
          />
          {renderPreview()}
          <div className="flex gap-3 items-center mt-3">
            <button
              type="submit"
              disabled={loading}
              className="px-6 py-3 bg-blue-500 rounded-lg font-semibold hover:bg-blue-600 transition flex items-center gap-2"
            >
              {loading ? <Spin size="small" /> : "Upload Portfolio"}
            </button>
            <button
              type="button"
              onClick={() => setPortfolioData({ title: "", description: "", images: [] })}
              className="px-4 py-2 bg-gray-800 border border-gray-700 rounded"
            >
              Reset
            </button>
          </div>
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
                src={item.images?.[0] || ""}
                alt={item.title}
                className="h-56 w-full object-cover"
              />
              <div className="p-4">
                <h3 className="text-xl font-semibold">{item.title}</h3>
                <p className="text-gray-400 text-sm">
                  {item.description?.substring(0, 80)}
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
