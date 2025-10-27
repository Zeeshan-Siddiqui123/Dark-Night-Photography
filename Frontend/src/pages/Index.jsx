import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div>
      {/* Hero Section */}
      <section
        className="h-[90vh] flex flex-col justify-center items-center bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1504208434309-cb69f4fe52b0?auto=format&fit=crop&w=1600&q=80')",
        }}
      >
        <div className="bg-black bg-opacity-60 p-8 rounded-xl text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-4">
            Capture the Moment
          </h1>
          <p className="text-gray-300 text-lg mb-6 max-w-xl">
            Professional photography that tells your story through stunning visuals.
          </p>
          <Link
            to="/portfolio"
            className="px-6 py-3 bg-white text-black rounded-full font-semibold hover:bg-gray-300 transition"
          >
            View Portfolio
          </Link>
        </div>
      </section>

      {/* Portfolio Preview */}
      <section className="py-16 px-6 md:px-12 text-center bg-black">
        <h2 className="text-3xl font-bold mb-8">Featured Shots</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {[
            "https://images.unsplash.com/photo-1511765224389-37f0e77cf0eb",
            "https://images.unsplash.com/photo-1506744038136-46273834b3fb",
            "https://images.unsplash.com/photo-1472214103451-9374bd1c798e",
          ].map((img, i) => (
            <div key={i} className="overflow-hidden rounded-xl shadow-lg group">
              <img
                src={img}
                alt="Photography"
                className="w-full h-64 object-cover transform group-hover:scale-110 transition duration-500"
              />
            </div>
          ))}
        </div>

        <Link
          to="/portfolio"
          className="inline-block mt-10 px-6 py-3 border border-white rounded-full hover:bg-white hover:text-black transition"
        >
          Explore Full Portfolio
        </Link>
      </section>
    </div>
  );
};

export default Home;
