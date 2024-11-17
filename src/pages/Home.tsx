import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import LatestBlogs from "./LatestBlogs";

const Home = () => {
  return (
    <>
      <div className="bg-white min-h-screen">
        <Navbar />

        {/* Hero Section */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 sm:pt-20 md:pt-24 lg:pt-32">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-black text-2xl sm:text-3xl lg:text-4xl font-bold leading-tight mb-4 sm:mb-6">
              Create, Manage, Publish with Ease
            </h1>
            <p className="text-gray-400 text-sm sm:text-base lg:text-lg leading-relaxed mb-6 sm:mb-8">
              Discover top-notch blogs curated from talented writers worldwide.
              Subscribe for fresh content every week, delivered straight to your
              inbox.
            </p>
          </div>
        </div>

        {/* Featured Image Section */}
        <div className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto mb-8">
          <div className="relative rounded-lg sm:rounded-xl lg:rounded-2xl overflow-hidden shadow-lg sm:shadow-xl h-[300px] sm:h-[400px] lg:h-[600px]">
            <img
              src="/HomePage.jpg"
              alt="Design skills"
              className="w-full h-full object-cover"
            />

            <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 lg:p-8 bg-gradient-to-t from-slate-900/95 via-slate-900/70 to-transparent">
              <div className="mb-4 sm:mb-6">
                <h2 className="text-white text-xl sm:text-2xl lg:text-3xl font-semibold mb-2 sm:mb-3 flex items-center">
                  Master the Art of Blogging: Create Engaging and Timeless
                  Content
                  <svg
                    className="w-4 h-4 sm:w-5 sm:h-5 ml-2 hidden sm:inline"
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
                <p className="text-gray-300 text-sm sm:text-base lg:text-lg">
                  Trends evolve, but impactful writing endures. Discover how to
                  craft compelling, lasting blog content effortlessly.
                </p>
              </div>
            </div>
          </div>
        </div>

        <LatestBlogs />
        <Footer />
      </div>
    </>
  );
};

export default Home;
