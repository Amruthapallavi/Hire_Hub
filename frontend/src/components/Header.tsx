import { Link, useLocation } from "react-router-dom";
import { Briefcase, Plus } from "lucide-react";


export const Header = () => {
  const location = useLocation();

  return (
    <header className="sticky top-0 z-50 border-b" style={{ backgroundColor: 'rgba(248, 250, 252, 0.95)', backdropFilter: 'blur(8px)' }}>
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
                  {/* <button className="w-full bg-[#072E4A] text-white py-2 rounded-md hover:bg-[#051e33]"> */}

                <Plus className="h-4 w-4" />
                <span>Post Job</span>
              </button>
            </Link>
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
          </div>
        </nav>
      </div>
    </header>
  );
};