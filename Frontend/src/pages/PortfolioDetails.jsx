import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { FaArrowLeft, FaCameraRetro, FaImage, FaTimes } from "react-icons/fa";

const PortfolioDetails = () => {
  const { id } = useParams();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [modalOpen, setModalOpen] = useState(false);
  const [activeImage, setActiveImage] = useState("");

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const res = await fetch(`http://localhost:5000/api/portfolio/captures/${id}`, {
          credentials: "include",
        });
        if (!res.ok) throw new Error("Failed to fetch project details");

        const data = await res.json();
        if (data.success) setProject(data.data);
        else throw new Error(data.message || "Unknown error");
      } catch (err) {
        console.error(err);
        setError("Unable to load project details. Please try again later.");
      } finally {
        setLoading(false);
      }
    };
    fetchProject();
  }, [id]);

  useEffect(() => {
    if (project?.title) {
      document.title = `${project.title} | Dark Night Photography`;
    }
  }, [project]);

  if (loading)
    return (
      <div className="flex justify-center items-center h-screen bg-black text-gray-400 text-lg">
        Loading project...
      </div>
    );

  if (error)
    return (
      <div className="flex flex-col justify-center items-center h-screen bg-black text-gray-300">
        <p className="text-red-500 mb-4">{error}</p>
        <Link
          to="/portfolio"
          className="text-blue-400 hover:underline hover:text-blue-300"
        >
          ← Back to Portfolio
        </Link>
      </div>
    );

  if (!project)
    return (
      <div className="flex justify-center items-center h-screen bg-black text-gray-400">
        Project not found.
      </div>
    );

  const mainImage = project.images?.[0];
  const galleryImages = project.images?.slice(1) || [];

  // ✅ Open modal function
  const openModal = (img) => {
    setActiveImage(img);
    setModalOpen(true);
  };

  // ✅ Close modal function
  const closeModal = () => {
    setActiveImage("");
    setModalOpen(false);
  };

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
      {mainImage && (
        <motion.div
          className="rounded-2xl overflow-hidden shadow-lg mb-12 cursor-pointer"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          onClick={() => openModal(mainImage)} // ✅ Click to open modal
        >
          <img
            src={mainImage}
            alt={project.title}
            className="w-full h-[40vh] md:h-full object-cover"
          />
        </motion.div>
      )}

      {/* Gallery */}
      {galleryImages.length > 0 && (
        <>
          <motion.h2
            className="text-3xl font-semibold mb-6 flex items-center gap-3"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <FaImage className="text-blue-400" />
            Gallery
          </motion.h2>

          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
            {galleryImages.map((img, index) => (
              <motion.div
                key={index}
                className="rounded-xl overflow-hidden shadow-md group cursor-pointer"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3 + index * 0.1, duration: 0.7 }}
                onClick={() => openModal(img)} // ✅ Click to open modal
              >
                <img
                  src={img}
                  alt={`Gallery ${index + 1}`}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
              </motion.div>
            ))}
          </div>
        </>
      )}

      {/* Quote */}
      <motion.div
        className="mt-16 text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <p className="italic text-gray-400 text-lg">
          “Through our lens, every shadow has a story.”
        </p>
        <p className="text-blue-400 font-semibold mt-3">
          — Dark Night Photography
        </p>
      </motion.div>

      {/* ✅ Modal */}
      <AnimatePresence>
        {modalOpen && (
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-90 flex justify-center items-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeModal} // click outside to close
          >
            <motion.img
              src={activeImage}
              alt="Modal"
              className="max-h-[90vh] max-w-[90vw] rounded-xl shadow-xl"
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
              onClick={(e) => e.stopPropagation()} // prevent closing on image click
            />
            <FaTimes
              className="absolute top-5 right-5 text-white text-3xl cursor-pointer"
              onClick={closeModal}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default PortfolioDetails;
