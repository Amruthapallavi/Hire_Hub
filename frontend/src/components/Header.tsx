import { Link, useLocation, useNavigate } from "react-router-dom";
import { Briefcase, Plus, LogOut } from "lucide-react"; // Import logout icon
import { useEffect, useState } from "react";

export const Header = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // State to track login status
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, [location]); // re-check on location change to update header

  const handleLogout = () => {
    localStorage.removeItem("token");
    // If you store user info, remove that as well
    // localStorage.removeItem("user");
    setIsLoggedIn(false);
    navigate("/login", { replace: true });
  };

  return (
    <header
      className="sticky top-0 z-50 border-b"
      style={{ backgroundColor: "rgba(248, 250, 252, 0.95)", backdropFilter: "blur(8px)" }}
    >
      <div className="container mx-auto px-4 py-4">
        <nav className="flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-2 text-xl font-bold text-[#072E4A]">
            <Briefcase className="h-6 w-6" />
            <span>HireHub</span>
          </Link>

          <div className="hidden md:flex items-center space-x-8">
            <Link
              to="/"
              className={`text-sm font-medium transition-colors hover:text-[#072E4A] ${
                location.pathname === "/" ? "text-blue-600" : "text-gray-600"
              }`}
            >
              Home
            </Link>
            <Link
              to="/jobs"
              className={`text-sm font-medium transition-colors hover:text-[#072E4A] ${
                location.pathname === "/jobs" ? "text-blue-600" : "text-gray-600"
              }`}
            >
              Jobs
            </Link>
          </div>

          <div className="flex items-center space-x-4">
            <Link to="/add-job">
              <button className="hidden sm:flex items-center space-x-2 px-3 py-2 text-sm border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50">
                <Plus className="h-4 w-4" />
                <span>Post Job</span>
              </button>
            </Link>

            {isLoggedIn ? (
              <button
                onClick={handleLogout}
                className="flex items-center space-x-2 px-3 py-2 text-sm text-red-600 hover:bg-red-100 rounded-md"
              >
                <LogOut className="h-4 w-4" />
                <span>Logout</span>
              </button>
            ) : (
              <>
                <Link to="/login">
                  <button className="px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md">
                    Login
                  </button>
                </Link>
                <Link to="/signup">
                  <button className="px-3 py-2 text-sm bg-[#072E4A] text-white rounded-md hover:bg-[#051e33]">
                    Sign Up
                  </button>
                </Link>
              </>
            )}
          </div>
        </nav>
      </div>
    </header>
  );
};
