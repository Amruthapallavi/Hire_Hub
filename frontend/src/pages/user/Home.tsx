import { Input } from "../../components/ui/input";
import { Header } from "../../components/Header";
import { JobCard } from "../../components/JobCard";
import type { Job } from '../../components/JobCard';

import { Search, TrendingUp, Users, Building } from "lucide-react";
import { Link } from "react-router-dom";
import heroImage from "../../assets/hero-img.avif";
import Footer from "../../components/Footer";

const featuredJobs: Job[] = [];

export const Home = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      {/* Hero Section */}
      <section
        className="relative py-20 px-4"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url(${heroImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="container mx-auto text-center text-white">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            Find Your Dream Job
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-gray-200">
            Discover opportunities that match your skills and passion
          </p>

          <div className="max-w-2xl mx-auto flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <Input
                placeholder="Search jobs, companies, or keywords..."
                className="pl-10 h-12 bg-white/90 text-gray-900 border border-gray-300 rounded-md"
              />
            </div>
            <button className="h-12 px-8 bg-[#072E4A] text-white rounded-md hover:bg-[#051e33]">
              Search Jobs
            </button>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gray-100">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="space-y-2">
              <div className="flex justify-center">
                <TrendingUp className="h-12 w-12 text-[#072E4A]" />
              </div>
              <h3 className="text-3xl font-bold text-gray-900">5K+</h3>
              <p className="text-gray-600">Active Jobs</p>
            </div>
            <div className="space-y-2">
              <div className="flex justify-center">
                <Users className="h-12 w-12 text-[#072E4A]" />
              </div>
              <h3 className="text-3xl font-bold text-gray-900">10K+</h3>
              <p className="text-gray-600">Happy Users</p>
            </div>
            <div className="space-y-2">
              <div className="flex justify-center">
                <Building className="h-12 w-12 text-[#072E4A]" />
              </div>
              <h3 className="text-3xl font-bold text-gray-900">1K+</h3>
              <p className="text-gray-600">Companies</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Jobs Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">
              Featured Jobs
            </h2>
            <p className="text-xl text-gray-600">
              Hand-picked opportunities from top companies
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {featuredJobs.map((job) => (
              <JobCard key={job.id} job={job} />
            ))}
          </div>

          <div className="text-center">
            <Link to="/jobs">
              <button className="px-8 py-3 bg-[#072E4A] text-white rounded-md hover:bg-[#051e33] text-lg">
                View All Jobs
              </button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};
