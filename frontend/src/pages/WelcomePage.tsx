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
    // Remove any other user data you store if needed
    setIsLoggedIn(false);
    navigate("/", { replace: true });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-gray-100 to-white">
      {/* Header */}
      <header className="p-6">
        <div className="container mx-auto">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Briefcase className="h-8 w-8 text-indigo-600" />
              <h1 className="text-2xl font-bold text-indigo-600">HireHub</h1>
            </div>
            <div className="space-x-4">
              {isLoggedIn ? (
                <>
                  <Button variant="outline" onClick={handleLogout} className="flex items-center space-x-2">
                    <LogOut className="h-4 w-4" />
                    <span>Logout</span>
                  </Button>
                </>
              ) : (
                <>
                  <Link to="/login">
                    <Button variant="outline">Sign In</Button>
                  </Link>
                  <Link to="/signup">
                    <Button>Get Started</Button>
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-6">
        <div className="container mx-auto text-center">
          <div className="max-w-4xl mx-auto">
            <div className="inline-flex items-center space-x-2 bg-blue-100 text-blue-600 px-4 py-2 rounded-full text-sm font-medium mb-8">
              <Star className="h-4 w-4" />
              <span>Welcome to the future of job search</span>
            </div>

            <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-6 leading-tight">
              Discover Your
              <span className="text-indigo-600 block">Dream Career</span>
            </h1>

            <p className="text-xl md:text-2xl text-gray-600 mb-12 max-w-3xl mx-auto leading-relaxed">
              Connect with top employers, explore thousands of opportunities, and take the next step in your professional journey with HireHub.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
              <Link to="/jobs">
                <Button size="lg" className="h-14 px-8 text-lg group">
                  Explore Jobs
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <Link to="/">
                <Button variant="outline" size="lg" className="h-14 px-8 text-lg">
                  Learn More
                </Button>
              </Link>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-2xl mx-auto">
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-indigo-600 mb-2">10K+</div>
                <div className="text-gray-500">Active Jobs</div>
              </div>
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-indigo-600 mb-2">50K+</div>
                <div className="text-gray-500">Happy Users</div>
              </div>
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-indigo-600 mb-2">2K+</div>
                <div className="text-gray-500">Top Companies</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-6 bg-white">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Why Choose HireHub?
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              We make job searching simple, efficient, and successful
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="text-center p-8 border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardContent className="space-y-4">
                <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto">
                  <Briefcase className="h-8 w-8 text-indigo-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900">Quality Jobs</h3>
                <p className="text-gray-600">
                  Curated opportunities from verified companies across industries
                </p>
              </CardContent>
            </Card>

            <Card className="text-center p-8 border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardContent className="space-y-4">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto">
                  <Users className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900">Smart Matching</h3>
                <p className="text-gray-600">
                  Advanced algorithms to match you with the perfect opportunities
                </p>
              </CardContent>
            </Card>

            <Card className="text-center p-8 border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardContent className="space-y-4">
                <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mx-auto">
                  <CheckCircle className="h-8 w-8 text-indigo-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900">Easy Application</h3>
                <p className="text-gray-600">
                  Apply to multiple jobs with one click and track your progress
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section className="py-20 px-6">
        <div className="container mx-auto text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Ready to Find Your Perfect Job?
            </h2>
            <p className="text-xl text-gray-600 mb-8">
              Join thousands of professionals who found their dream career with HireHub
            </p>
            <div className="space-x-4">
  {isLoggedIn ? (
    <Button
      size="lg"
      className="h-14 px-8 text-lg"
      onClick={() => navigate("/home")}
    >
      Continue to HireHub
    </Button>
  ) : (
    <Link to="/signup">
      <Button size="lg" className="h-14 px-8 text-lg">
        Create Account
      </Button>
    </Link>
  )}

  <Link to="/jobs">
    <Button variant="outline" size="lg" className="h-14 px-8 text-lg">
      Browse Jobs
    </Button>
  </Link>
</div>

          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 border-t bg-gray-100">
        <div className="container mx-auto text-center">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <Briefcase className="h-6 w-6 text-indigo-600" />
            <span className="text-xl font-bold text-indigo-600">HireHub</span>
          </div>
          <p className="text-gray-500">
            © 2024 HireHub. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};
