import { useEffect, useState } from "react";
import { useToast } from "../../components/ToastContext";
import { useNavigate, Link } from "react-router-dom";
import { Briefcase } from "lucide-react";
import { isValidEmail, isValidPassword } from "../../utils/validation";
import { authService } from "../../services/authService";

export const Login = () => {
  const { showToast } = useToast();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  useEffect(() => {
    if (localStorage.getItem("token")) {
      navigate("/home", { replace: true });
    }
  }, [navigate]);
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setLoading(true);
      if (!isValidEmail(formData.email)) {
        showToast("Please enter a valid email address.", "error");
        return;
      }

      if (!isValidPassword(formData.password)) {
        showToast("Password must be at least 6 characters long.", "error");
        return;
      }
      console.log("Login attempt:", formData);

      showToast("Login Successful! Welcome back to HireHub.", "success");

      const res = await authService.login(formData);
      localStorage.setItem("token", res.token);
      console.log(res, "from loginpage");
      navigate("/home", { replace: true });
    } catch (error: any) {
      const message =
        error?.response?.data?.message ||
        error?.message ||
        "Something went wrong. Please try again.";

      showToast(message, "error");
    } finally {
      setLoading(false);
    }
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
            <h2 className="text-2xl font-bold text-gray-800">Welcome Back</h2>
            <p className="text-gray-500 text-sm">
              Sign in to your account to continue
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label
                htmlFor="email"
                className="text-sm font-medium text-gray-700"
              >
                Email Address
              </label>
              <input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                placeholder="Enter your email"
                className="w-full h-11 px-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#072E4A] focus:border-[#072E4A]"
                required
              />
            </div>

            <div className="space-y-2">
              <label
                htmlFor="password"
                className="text-sm font-medium text-gray-700"
              >
                Password
              </label>
              <input
                id="password"
                type="password"
                value={formData.password}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
                placeholder="Enter your password"
                className="w-full h-11 px-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#072E4A] focus:border-[#072E4A]"
                required
                // minLength={6}
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className={`w-full h-11 rounded-md transition ${
                loading
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-[#072E4A] hover:bg-[#051e33] text-white"
              }`}
            >
              {loading ? "Login..." : "Log in"}
            </button>
          </form>

          <div className="text-center mt-6 space-y-4">
            <Link
              to="#"
              className="text-sm text-[#072E4A] hover:underline block"
            >
              Forgot your password?
            </Link>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-gray-300" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-white px-2 text-gray-500">or</span>
              </div>
            </div>

            <p className="text-sm text-gray-500">
              Don't have an account?{" "}
              <Link
                to="/signup"
                className="text-[#072E4A] hover:underline font-medium"
              >
                Create one now
              </Link>
            </p>
          </div>
        </div>

        <div className="text-center mt-8">
          <Link
            to="/"
            className="text-sm text-gray-500 hover:text-gray-700 transition-colors"
          >
            ← Back to HireHub
          </Link>
        </div>
      </div>
    </div>
  );
};
