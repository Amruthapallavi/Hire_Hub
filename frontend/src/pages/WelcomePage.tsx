import { Button } from "../components/ui/button";
import { Card, CardContent } from "../components/ui/card";
import { ArrowRight, Briefcase, Users, Star, CheckCircle, LogOut } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

export const WelcomePage = () => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    navigate("/", { replace: true });
  };

  return (
    <div className="min-h-screen bg-white text-[#072E4A]">
      {/* Header */}
      <header className="p-6 border-b border-gray-200">
        <div className="container mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Briefcase className="h-8 w-8 text-[#072E4A]" />
            <h1 className="text-2xl font-bold text-[#072E4A]">HireHub</h1>
          </div>
          <div className="space-x-4">
            {isLoggedIn ? (
              <Button
                variant="outline"
                onClick={handleLogout}
                className="flex items-center space-x-2 border-[#072E4A] text-[#072E4A] hover:bg-[#072E4A] hover:text-white transition"
              >
                <LogOut className="h-4 w-4" />
                <span>Logout</span>
              </Button>
            ) : (
              <>
                <Link to="/login">
                  <Button variant="outline" className="border-[#072E4A] text-[#072E4A] hover:bg-[#072E4A] hover:text-white transition">
                    Sign In
                  </Button>
                </Link>
                <Link to="/signup">
                  <Button className="bg-[#072E4A] hover:bg-[#051e33] text-white">Get Started</Button>
                </Link>
              </>
            )}
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-6 bg-white">
        <div className="container mx-auto text-center">
          <div className="max-w-4xl mx-auto">
            <div className="inline-flex items-center space-x-2 bg-blue-100 text-[#072E4A] px-4 py-2 rounded-full text-sm font-medium mb-8">
              <Star className="h-4 w-4" />
              <span>Welcome to the future of job search</span>
            </div>

            <h1 className="text-5xl md:text-7xl font-bold text-[#072E4A] mb-6 leading-tight">
              Discover Your
              <span className="text-[#4f46e5] block">Dream Career</span>
            </h1>

            <p className="text-xl md:text-2xl text-[#4b5563] mb-12 max-w-3xl mx-auto leading-relaxed">
              Connect with top employers, explore thousands of opportunities, and take the next step in your professional journey with HireHub.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
              <Link to="/jobs">
                <Button size="lg" className="h-14 px-8 text-lg bg-[#072E4A] hover:bg-[#051e33] text-white transition group">
                  Explore Jobs
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <Link to="/">
                <Button
                  variant="outline"
                  size="lg"
                  className="h-14 px-8 text-lg border-[#072E4A] text-[#072E4A] hover:bg-[#072E4A] hover:text-white transition"
                >
                  Learn More
                </Button>
              </Link>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-2xl mx-auto text-[#072E4A]">
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-[#4f46e5] mb-2">10K+</div>
                <div className="text-[#6b7280]">Active Jobs</div>
              </div>
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-[#4f46e5] mb-2">50K+</div>
                <div className="text-[#6b7280]">Happy Users</div>
              </div>
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-[#4f46e5] mb-2">2K+</div>
                <div className="text-[#6b7280]">Top Companies</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-6 bg-white">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-[#072E4A] mb-4">
              Why Choose HireHub?
            </h2>
            <p className="text-xl text-[#6b7280] max-w-2xl mx-auto">
              We make job searching simple, efficient, and successful
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="text-center p-8 border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardContent className="space-y-4">
                <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto">
                  <Briefcase className="h-8 w-8 text-[#4f46e5]" />
                </div>
                <h3 className="text-xl font-semibold text-[#072E4A]">Quality Jobs</h3>
                <p className="text-[#6b7280]">
                  Curated opportunities from verified companies across industries
                </p>
              </CardContent>
            </Card>

            <Card className="text-center p-8 border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardContent className="space-y-4">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto">
                  <Users className="h-8 w-8 text-[#2563eb]" />
                </div>
                <h3 className="text-xl font-semibold text-[#072E4A]">Smart Matching</h3>
                <p className="text-[#6b7280]">
                  Advanced algorithms to match you with the perfect opportunities
                </p>
              </CardContent>
            </Card>

            <Card className="text-center p-8 border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardContent className="space-y-4">
                <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mx-auto">
                  <CheckCircle className="h-8 w-8 text-[#4f46e5]" />
                </div>
                <h3 className="text-xl font-semibold text-[#072E4A]">Easy Application</h3>
                <p className="text-[#6b7280]">
                  Apply to multiple jobs with one click and track your progress
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section className="py-20 px-6 bg-white">
        <div className="container mx-auto text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-[#072E4A] mb-4">
              Ready to Find Your Perfect Job?
            </h2>
            <p className="text-xl text-[#6b7280] mb-8">
              Join thousands of professionals who found their dream career with HireHub
            </p>
            <div className="space-x-4 flex justify-center">
              {isLoggedIn ? (
                <Button
                  size="lg"
                  className="h-14 px-8 text-lg bg-[#072E4A] hover:bg-[#051e33] text-white transition"
                  onClick={() => navigate("/home")}
                >
                  Continue to HireHub
                </Button>
              ) : (
                <Link to="/signup">
                  <Button
                    size="lg"
                    className="h-14 px-8 text-lg bg-[#072E4A] hover:bg-[#051e33] text-white transition"
                  >
                    Create Account
                  </Button>
                </Link>
              )}

              <Link to="/jobs">
                <Button
                  variant="outline"
                  size="lg"
                  className="h-14 px-8 text-lg border-[#072E4A] text-[#072E4A] hover:bg-[#072E4A] hover:text-white transition"
                >
                  Browse Jobs
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 border-t border-gray-200 bg-gray-50">
        <div className="container mx-auto text-center">
          <div className="flex items-center justify-center space-x-2 mb-4 text-[#072E4A]">
            <Briefcase className="h-6 w-6" />
            <span className="text-xl font-bold">HireHub</span>
          </div>
          <p className="text-[#6b7280]">
            © 2024 HireHub. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};
