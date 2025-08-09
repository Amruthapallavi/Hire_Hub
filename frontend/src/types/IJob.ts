import type { JobType, SalaryPeriod, JobStatus } from "./jobStatus";

export interface Salary {
  min: number;
  max: number;
  currency?: string;     
  period: SalaryPeriod;
}

export interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  jobType: JobType;
  salary: Salary;          
  description: string;
  status?: JobStatus;    
  postedDate: string;
  postedBy?: string;       
}


export interface JobCardProps {
  job: Job;
  onEdit?: (job: Job) => void;
  onDelete?: (id: string) => void;
  showActions?: boolean;
}
