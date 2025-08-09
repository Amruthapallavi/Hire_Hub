import { useEffect, useState } from "react";
import { Header } from "../../components/Header";
import { JobCard } from "../../components/JobCard";
import type { Job } from "../../types/IJob";
import { Search, Filter } from "lucide-react";
import { useToast } from "../../components/hook/useToast";
import { useNavigate } from "react-router-dom";
import { jobService } from "../../services/jobService";

export const Jobs = () => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [filteredJobs, setFilteredJobs] = useState<Job[]>([]);
  const [totalJobs, setTotalJobs] = useState(0);
  const [page, setPage] = useState(1);
  const limit = 8; 
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [locationFilter, setLocationFilter] = useState("all");
  const [typeFilter, setTypeFilter] = useState("all");
  const { showToast } = useToast();
  const navigate = useNavigate();

 useEffect(() => {
    const fetchJobs = async () => {
      setLoading(true);
      try {
        const res = await jobService.getAllJobs(page, limit);
        setJobs(res.jobs);
        setTotalJobs(res.total);
      } catch (error:any) {
        console.error("Error loading jobs", error);
        showToast(error.message,"error")
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, [page]);

  const totalPages = Math.ceil(totalJobs / limit);

  const filterJobs = (search: string, location: string, type: string) => {
    let filtered = [...jobs];

    if (search) {
      const term = search.toLowerCase();
      filtered = filtered.filter(
        (job) =>
          job.title.toLowerCase().includes(term) ||
          job.company.toLowerCase().includes(term) ||
          job.description.toLowerCase().includes(term)
      );
    }

    if (location !== "all") {
      filtered = filtered.filter((job) =>
        job.location.toLowerCase().includes(location.toLowerCase())
      );
    }

    if (type !== "all") {
      filtered = filtered.filter((job) => job.jobType === type);
    }

    setFilteredJobs(filtered);
  };

  useEffect(() => {
    filterJobs(searchTerm, locationFilter, typeFilter);
  }, [jobs]);

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

  const handleEditJob = (job: Job) => {
    navigate(`/jobs/edit/${job._id}`);
  };

const handleDeleteJob = (id: string) => {
  showToast(
    "Are you sure you want to delete this job?",
    "info",
    {
      label: "Confirm",
      onClick: async () => {
        try {
          await jobService.deleteJob(id);
          const updatedJobs = jobs.filter((job) => job._id !== id);
          setJobs(updatedJobs);
          showToast("Job deleted successfully", "success");
        } catch (error) {
          console.error("Error deleting job:", error);
          showToast("Failed to delete job", "error");
        }
      },
    },
    {
      label: "Cancel",
      onClick: () => {
        showToast("Deletion cancelled", "info");
      },
    }
  );
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
        {loading ? (
          <div className="flex justify-center items-center py-20">
            <svg
              className="animate-spin h-10 w-10 text-[#072E4A]"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              aria-label="Loading spinner"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
              ></path>
            </svg>
          </div>
        ) : (
          <>
            <div className="flex justify-between items-center mb-8">
              <h1 className="text-3xl font-bold">All Jobs</h1>
              <button
                onClick={() => navigate("/jobs/add")}
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
              Search
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
                  key={job._id}
                  job={job}
                  onEdit={handleEditJob}
                  onDelete={() => handleDeleteJob(job._id)}
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

            <div>
              <button
                onClick={() => setPage((p) => Math.max(p - 1, 1))}
                disabled={page === 1}
              >
                Previous
              </button>

              <span>
                {" "}
                Page {page} of {totalPages}{" "}
              </span>

              <button
                onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
                disabled={page === totalPages}
              >
                Next
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}