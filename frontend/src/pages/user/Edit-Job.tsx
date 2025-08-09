import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { JobForm } from "../../components/JobForm";
import { jobService } from "../../services/jobService";
import type { Job } from "../../types/IJob";

export const EditJobPage = () => {
  const { id } = useParams<{ id: string }>(); // get job id from URL params
  const navigate = useNavigate();
  const [existingJob, setExistingJob] = useState<Job | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;
    const fetchJob = async () => {
      try {
        const result = await jobService.getJobById(id);
        setExistingJob(result);
      } catch (error) {
        console.error("Failed to fetch job", error);
      } finally {
        setLoading(false);
      }
    };

    fetchJob();
  }, [id]);

 const handleUpdate = async (updatedJob: Partial<Omit<Job, '_id' | 'createdAt' | 'postedBy'>>) => {
  if (!id) return;

  try {
    await jobService.updateJob(id, updatedJob);
    navigate("/jobs");
  } catch (error) {
    console.error("Failed to update job", error);
  }
};


  if (loading) return <p>Loading job details...</p>;
  if (!existingJob) return <p>Job not found.</p>;

  return (
    <JobForm
      job={existingJob}
      onSubmit={handleUpdate}
      onCancel={() => navigate("/jobs")}
    />
  );
};
