import { useState } from "react";
import { Header } from "../../components/Header";
import { JobCard } from "../../components/JobCard";
import type { Job } from '../../types/IJob';
import { Search, Filter } from "lucide-react";
import { useToast } from "../../components/ToastContext";
import { useNavigate } from "react-router-dom";
import { jobService } from "../../services/jobService";

const initialJobs: Job[] = [
  {
    id: "1",
    title: "Senior Frontend Developer",
    company: "TechCorp",
    location: "San Francisco, CA",
    jobType: "Full-Time",
    salary: {
      min: 120000,
      max: 150000,
      currency: "USD",
      period: "Yearly",
    },
    description: "We are looking for a Senior Frontend Developer to join our dynamic team. You will be responsible for building user-facing features and ensuring the technical feasibility of UI/UX designs.",
    postedDate: "2 days ago"
  },
  // ... other jobs
];

export const Jobs = () => {
  const [jobs, setJobs] = useState<Job[]>(initialJobs);
  const [filteredJobs, setFilteredJobs] = useState<Job[]>(initialJobs);
  const [searchTerm, setSearchTerm] = useState("");
  const [locationFilter, setLocationFilter] = useState("all");
  const [typeFilter, setTypeFilter] = useState("all");
  const [editingJob, setEditingJob] = useState<Job | null>(null);
  const { showToast } = useToast();
  const navigate = useNavigate();

  const handleSearch = (term: string) => {
    setSearchTerm(term);
    filterJobs(term, locationFilter, typeFilter);
  };

  const handleLocationFilter = (location: string) => {
    setLocationFilter(location);
    filterJobs(searchTerm, location, typeFilter);
  };

  const handleTypeFilter = (type: string) => {
    setTypeFilter(type);
    filterJobs(searchTerm, locationFilter, type);
  };

  const filterJobs = (search: string, location: string, type: string) => {
    let filtered = jobs;

    if (search) {
      filtered = filtered.filter(job => 
        job.title.toLowerCase().includes(search.toLowerCase()) ||
        job.company.toLowerCase().includes(search.toLowerCase()) ||
        job.description.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (location !== "all") {
      filtered = filtered.filter(job => 
        job.location.toLowerCase().includes(location.toLowerCase())
      );
    }

    if (type !== "all") {
      filtered = filtered.filter(job => job.jobType === type);
    }

    setFilteredJobs(filtered);
  };

  const handleEditJob = (job: Job) => {
    setEditingJob(job);
    // optionally implement edit form modal or navigate to edit page
    // For now, you might want to navigate to edit page like this:
    navigate(`/jobs/edit/${job.id}`);
  };

  const handleDeleteJob = (id: string) => {
    const updatedJobs = jobs.filter(job => job.id !== id);
    setJobs(updatedJobs);
    setFilteredJobs(updatedJobs.filter(job => {
      const matchesSearch = !searchTerm || 
        job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.description.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesLocation = locationFilter === "all" || 
        job.location.toLowerCase().includes(locationFilter.toLowerCase());
      
      const matchesType = typeFilter === "all" || job.jobType === typeFilter;
      
      return matchesSearch && matchesLocation && matchesType;
    }));
    
    showToast("Job deleted successfully.",'error');
  };

  const handleClearFilters = () => {
    setSearchTerm("");
    setLocationFilter("all");
    setTypeFilter("all");
    setFilteredJobs(jobs);
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      <Header />
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">All Jobs</h1>
          <button
            onClick={() => navigate("/jobs/add")} // Navigate to AddJob page
            className="px-6 py-2 bg-[#072E4A] text-white rounded-md hover:bg-[#051e33] font-semibold transition"
          >
            Post New Job
          </button>
        </div>

        {/* Filters */}
        <div className="bg-white p-6 rounded-lg shadow-md mb-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                type="text"
                placeholder="Search jobs..."
                value={searchTerm}
                onChange={(e) => handleSearch(e.target.value)}
                className="pl-10 py-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#072E4A]"
              />
            </div>

            <select
              value={locationFilter}
              onChange={(e) => handleLocationFilter(e.target.value)}
              className="py-2 px-3 border border-gray-300 rounded-md bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#072E4A] cursor-pointer"
            >
              <option value="all">All Locations</option>
              <option value="san francisco">San Francisco</option>
              <option value="new york">New York</option>
              <option value="remote">Remote</option>
              <option value="austin">Austin</option>
              <option value="los angeles">Los Angeles</option>
            </select>

            <select
              value={typeFilter}
              onChange={(e) => handleTypeFilter(e.target.value)}
              className="py-2 px-3 border border-gray-300 rounded-md bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#072E4A] cursor-pointer"
            >
              <option value="all">All Types</option>
              <option value="Full-Time">Full-time</option>
              <option value="Part-Time">Part-time</option>
              <option value="Contract">Contract</option>
              <option value="Remote">Remote</option>
            </select>

            <button
              className="flex items-center justify-center gap-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-100 transition py-2 px-4"
              title="More Filters (not implemented)"
              disabled
            >
              <Filter className="h-5 w-5" />
              More Filters
            </button>
          </div>
        </div>

        {/* Results Info */}
        <div className="mb-6 text-gray-700">
          Showing {filteredJobs.length} of {jobs.length} jobs
        </div>

        {/* Job Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredJobs.map((job) => (
            <JobCard 
              key={job.id} 
              job={job} 
              onEdit={handleEditJob}
              onDelete={handleDeleteJob}
              showActions={true}
            />
          ))}
        </div>

        {/* No jobs found */}
        {filteredJobs.length === 0 && (
          <div className="text-center py-12 text-gray-600">
            <p className="text-xl">No jobs found matching your criteria.</p>
            <button
              onClick={handleClearFilters}
              className="mt-4 px-6 py-2 bg-[#072E4A] text-white rounded-md hover:bg-[#051e33] font-semibold transition"
            >
              Clear Filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
