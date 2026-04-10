import { LogOut, Menu, User, X } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import kalki from "../assets/logo.webp";
import vitlogo from "../assets/vitlogo.png";

const Navbar = ({ setIsAuthenticated }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("user");
    setUser(null);
    setIsAuthenticated(false);
    navigate("/login");
  };

  return (
    <div className="flex items-center justify-between w-full h-auto px-6 md:px-10 py-4 backdrop-blur-2xl border border-gray-300 sticky top-0 z-50">
      {/* Logo */}
      <div className="flex items-center gap-4">
        <img
          src={kalki}
          className="w-12 h-12 md:w-16 md:h-16 cursor-pointer rounded-full hover:shadow-lg transition"
          onClick={() => navigate("/")}
          alt="KaliWebApp Logo"
        />
      </div>

      {/* Desktop Menu */}
      <div className="hidden md:flex items-center gap-8">
        <nav className="flex items-center gap-6 text-gray-700">
          <button
            onClick={() => navigate("/")}
            className="hover:text-blue-600 transition font-medium"
          >
            Home
          </button>
          <button
            onClick={() => navigate("/kalki/events")}
            className="hover:text-blue-600 transition font-medium"
          >
            Events
          </button>
          <button
            onClick={() => navigate("/kalki/teamMems")}
            className="hover:text-blue-600 transition font-medium"
          >
            Members
          </button>
          <button
            onClick={() => navigate("/kalki/certification")}
            className="hover:text-blue-600 transition font-medium"
          >
            Certification
          </button>
        </nav>

        <img
          src={vitlogo}
          className="w-24 h-10 md:w-32 md:h-14"
          alt="VIT Logo"
        />

        {user && (
          <div className="flex items-center gap-4 border-l border-gray-300 pl-4">
            <div className="flex items-center gap-2 text-gray-700">
              <User size={20} />
              <span className="hidden lg:inline font-medium">
                {user.firstName}
              </span>
            </div>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition"
              title="Logout"
            >
              <LogOut size={18} />
            </button>
          </div>
        )}
      </div>

      {/* Mobile Menu Button */}
      <div className="md:hidden">
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="text-gray-700"
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="absolute top-full left-0 right-0 bg-white border-b border-gray-300 md:hidden">
          <div className="flex flex-col gap-3 p-4">
            <button
              onClick={() => {
                navigate("/");
                setMobileMenuOpen(false);
              }}
              className="text-left hover:text-blue-600 transition font-medium py-2"
            >
              Home
            </button>
            <button
              onClick={() => {
                navigate("/kalki/events");
                setMobileMenuOpen(false);
              }}
              className="text-left hover:text-blue-600 transition font-medium py-2"
            >
              Events
            </button>
            <button
              onClick={() => {
                navigate("/kalki/teamMems");
                setMobileMenuOpen(false);
              }}
              className="text-left hover:text-blue-600 transition font-medium py-2"
            >
              Members
            </button>
            <button
              onClick={() => {
                navigate("/kalki/certification");
                setMobileMenuOpen(false);
              }}
              className="text-left hover:text-blue-600 transition font-medium py-2"
            >
              Certification
            </button>

            {user && (
              <>
                <div className="border-t border-gray-300 pt-3 mt-2">
                  <div className="flex items-center gap-2 text-gray-700 mb-3">
                    <User size={20} />
                    <span className="font-medium">
                      {user.firstName} {user.lastName}
                    </span>
                  </div>
                  <button
                    onClick={() => {
                      handleLogout();
                      setMobileMenuOpen(false);
                    }}
                    className="w-full flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition"
                  >
                    <LogOut size={18} />
                    Logout
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;
