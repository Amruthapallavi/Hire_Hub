import { useState } from "react";
import { useToast } from "../../components/ToastContext";
import { useNavigate, Link } from "react-router-dom";
import { Briefcase } from "lucide-react";

export const Signup = () => {
  const { showToast } = useToast();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
       showToast("Password mismatch.", "error");

      return;
    }

    console.log("Signup attempt:", formData);

   showToast("signup Successful! Welcome back to HireHub.", "success");


    navigate("/login");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="flex items-center justify-center space-x-2 mb-8">
          <Briefcase className="h-8 w-8 text-[#072E4A]" />
          <h1 className="text-2xl font-bold text-[#072E4A]">HireHub</h1>
        </div>

        <div className="bg-white rounded-lg shadow-xl p-6">
          <div className="text-center pb-4">
            <h2 className="text-2xl font-bold text-gray-800">Create Account</h2>
            <p className="text-gray-500 text-sm">
              Sign up to start your job journey with us
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label htmlFor="name" className="text-sm font-medium text-gray-700">
                Full Name
              </label>
              <input
                id="name"
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Enter your full name"
                className="w-full h-11 px-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#072E4A] focus:border-[#072E4A]"
                required
                minLength={3}
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium text-gray-700">
                Email Address
              </label>
              <input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="Enter your email"
                className="w-full h-11 px-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#072E4A] focus:border-[#072E4A]"
                required
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="password" className="text-sm font-medium text-gray-700">
                Password
              </label>
              <input
                id="password"
                type="password"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                placeholder="Enter your password"
                className="w-full h-11 px-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#072E4A] focus:border-[#072E4A]"
                required
                minLength={6}
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="confirmPassword" className="text-sm font-medium text-gray-700">
                Confirm Password
              </label>
              <input
                id="confirmPassword"
                type="password"
                value={formData.confirmPassword}
                onChange={(e) =>
                  setFormData({ ...formData, confirmPassword: e.target.value })
                }
                placeholder="Re-enter your password"
                className="w-full h-11 px-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#072E4A] focus:border-[#072E4A]"
                required
                minLength={6}
              />
            </div>

            <button
              type="submit"
              className="w-full h-11 bg-[#072E4A] text-white rounded-md hover:bg-[#051e33] transition"
            >
              Sign Up
            </button>
          </form>

          <div className="text-center mt-6 space-y-4">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-gray-300" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-white px-2 text-gray-500">or</span>
              </div>
            </div>

            <p className="text-sm text-gray-500">
              Already have an account?{" "}
              <Link to="/login" className="text-[#072E4A] hover:underline font-medium">
                Sign in here
              </Link>
            </p>
          </div>
        </div>

        <div className="text-center mt-8">
          <Link to="/" className="text-sm text-gray-500 hover:text-gray-700 transition-colors">
            ← Back to HireHub
          </Link>
        </div>
      </div>
    </div>
  );
};
