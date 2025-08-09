import { useState } from "react";
import { Header } from "../../components/Header";
import { JobForm } from "../../components/JobForm";
import { useToast } from "../../components/hook/useToast";
import type { Job } from "../../types/IJob";
import { useNavigate } from "react-router-dom";
import { jobService } from "../../services/jobService";

export const AddJob = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { showToast } = useToast();
  const navigate = useNavigate();

  const handleAddJob = async (jobData: Omit<Job, "_id" | "postedDate" | "postedBy">) => {
    setIsSubmitting(true);
    try {
       await jobService.createJob(jobData);
      showToast("Job posted successfully.", "success");
      navigate("/jobs"); 
    } catch (error) {
      console.error("Failed to add job:", error);
      showToast("Failed to post job. Please try again.", "error");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    navigate("/jobs"); 
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      <Header />
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <JobForm onSubmit={handleAddJob} onCancel={handleCancel} />
        {isSubmitting && (
          <p className="text-center mt-4 text-gray-600">Posting job, please wait...</p>
        )}
      </div>
    </div>
  );
};
