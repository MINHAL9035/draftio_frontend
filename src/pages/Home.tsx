import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import LatestBlogs from "./LatestBlogs";

const Home = () => {
  return (
    <>
      <div className="bg-white">
        <Navbar />
        <div className="max-w-7xl mx-auto px-2 pt-32 md:pt-24">
          <div className="max-w-3xl">
            <h1 className="text-black text-2xl md:text-3xl lg:text-4xl font-bold leading-tight mb-6">
              Create, Manage, Publish with Ease
            </h1>
            <p className="text-gray-400 text-md md:text-md leading-relaxed mb-8 text-sm md:text-base ">
              Discover top-notch blogs curated from talented writers worldwide.
              Subscribe for fresh content every week, delivered straight to your
              inbox.
            </p>
          </div>
        </div>
        <div className="relative rounded-2xl overflow-hidden shadow-xl mb-8 h-[600px] mx-28">
          <img
            src="/HomePage.jpg"
            alt="Design skills"
            className="w-full h-full object-cover"
          />

          <div className="absolute bottom-0 left-0 right-0 p-8 bg-gradient-to-t from-slate-900/95 via-slate-900/70 to-transparent">
            <div className="mb-6">
              <h2 className="text-white text-2xl md:text-3xl font-semibold mb-3 flex items-center">
                Master the Art of Blogging: Create Engaging and Timeless Content
                <svg
                  className="w-5 h-5 ml-2"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                >
                  <path
                    d="M7 17L17 7M17 7H7M17 7V17"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </h2>
              <p className="text-gray-300 text-base md:text-lg">
                Trends evolve, but impactful writing endures. Discover how to
                craft compelling, lasting blog content effortlessly.
              </p>
            </div>
          </div>
        </div>
        <LatestBlogs/>
        <Footer />
      </div>
    </>
  );
};

export default Home;
