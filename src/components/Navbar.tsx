import { useState, useEffect } from "react";
import { Edit, LogOut, Menu, X } from "lucide-react";
import { Login } from "./Login";
import { Signup } from "./Signup";
import throttle from "lodash.throttle";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store/store";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { message } from "antd";
import { removeUserInfo } from "@/redux/slice/userSlice";
import { logout } from "@/service/api/auth";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isSignupOpen, setIsSignupOpen] = useState(false);
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);
  const userInfo = useSelector((state: RootState) => state.auth.userInfo);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = throttle(() => {
      const offset = window.scrollY;
      if (offset > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    }, 100);

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleUserDropdown = () => {
    setIsUserDropdownOpen(!isUserDropdownOpen);
  };

  const handleSignOut = async () => {
    await logout();
    dispatch(removeUserInfo());
    navigate("/");
    message.success("Logout Successful!");
  };

  // Function to determine if a route is active
  const isActiveRoute = (path: string) => location.pathname === path;

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 px-4 py-3 transition-all duration-300 ${
          scrolled ? " bg  backdrop-blur-md shadow-lg" : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link to={"/"}>
              <div className="flex items-center">
                <h2 className="text-black text-2xl font-bold">Draftio</h2>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-6">
              <div className="flex items-center space-x-2">
                <Link to={"/blogs"}>
                  <button
                    className={`text-black flex items-center space-x-2 rounded-full px-4 py-2 transition-colors ${
                      isActiveRoute("/blogs")
                        ? "underline font-semibold"
                        : "hover:bg-gray-100"
                    }`}
                  >
                    <span>Blogs</span>
                  </button>
                </Link>
                <Link to={"/create"}>
                  <button
                    className={`text-black flex items-center space-x-2 rounded-full px-4 py-2 transition-colors ${
                      isActiveRoute("/create")
                        ? "underline font-semibold"
                        : "hover:bg-gray-100"
                    }`}
                  >
                    <Edit size={18} />
                    <span>Write</span>
                  </button>
                </Link>
                {userInfo ? (
                  <div className="relative">
                    <button
                      onClick={toggleUserDropdown}
                      className="flex items-center space-x-2 rounded-full px-4 py-2 transition-colors "
                    >
                      <img
                        src={userInfo.image}
                        alt={userInfo.name}
                        className="w-8 h-8 rounded-full"
                      />
                      <span className="font-medium">{userInfo.name}</span>
                    </button>
                    {isUserDropdownOpen && (
                      <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-md">
                        <div className="py-2">
                          <button
                            onClick={handleSignOut}
                            className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 transition-colors"
                          >
                            <LogOut className="w-4 h-4 mr-2 inline" />
                            Sign Out
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                ) : (
                  <>
                    <button
                      onClick={() => setIsLoginOpen(true)}
                      className="text-black rounded-full px-6 py-2 transition-colors"
                    >
                      Log in
                    </button>
                    <button
                      onClick={() => setIsSignupOpen(true)}
                      className="bg-gray-800 text-white px-6 py-2 rounded-full hover:bg-gray-700 transition-colors"
                    >
                      Sign up
                    </button>
                  </>
                )}
              </div>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <button
                onClick={toggleMenu}
                className="text-gray-300 hover:text-white transition-colors"
                aria-label="Toggle menu"
              >
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <div className="md:hidden">
              <div
                className={`px-2 pt-2 pb-3 space-y-1 mt-2 rounded-lg ${
                  scrolled ? "bg-slate-800/50 backdrop-blur-md" : "bg-black"
                }`}
              >
                <div className="space-y-2 pt-4">
                  <Link to="/blogs">
                    <button
                      className={`w-full text-left px-3 py-2 text-gray-300 hover:text-white hover:bg-slate-700/50 rounded-lg transition-colors ${
                        isActiveRoute("/blogs")
                          ? "bg-slate-700/50 text-white"
                          : ""
                      }`}
                    >
                      <span>Blogs</span>
                    </button>
                  </Link>
                  <Link to="/create">
                    <button
                      className={`w-full text-left px-3 py-2 text-gray-300 hover:text-white hover:bg-slate-700/50 rounded-lg transition-colors flex items-center space-x-2 ${
                        isActiveRoute("/create")
                          ? "bg-slate-700/50 text-white"
                          : ""
                      }`}
                    >
                      <Edit size={18} />
                      <span>Write</span>
                    </button>
                  </Link>
                  {userInfo ? (
                    <div className="flex items-center space-x-4 px-3 py-2 rounded-lg hover:bg-slate-700/50 transition-colors">
                      <span className="font-medium text-white">
                        {userInfo.name}
                      </span>
                      <button
                        onClick={handleSignOut}
                        className="text-gray-300 hover:text-white transition-colors"
                      >
                        <LogOut className="w-4 h-4" />
                      </button>
                    </div>
                  ) : (
                    <>
                      <button
                        onClick={() => setIsLoginOpen(true)}
                        className="block w-full text-left px-3 py-2 text-gray-300 hover:text-white hover:bg-slate-700/50 rounded-lg transition-colors"
                      >
                        Log in
                      </button>
                      <button
                        onClick={() => setIsSignupOpen(true)}
                        className="block w-full text-left px-3 py-2 text-gray-300 hover:text-white hover:bg-slate-700/50 rounded-lg transition-colors"
                      >
                        Sign up
                      </button>
                    </>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </nav>
      <Login isOpen={isLoginOpen} onClose={() => setIsLoginOpen(false)} />
      <Signup isOpen={isSignupOpen} onClose={() => setIsSignupOpen(false)} />
    </>
  );
};

export default Navbar;
