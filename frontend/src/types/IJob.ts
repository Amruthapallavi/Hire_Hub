import type { JobType, SalaryPeriod, JobStatus } from "./jobStatus";

export interface Salary {
  min: number;
  max: number;
  currency?: string;     
  period: SalaryPeriod;
}

export interface Job {
  _id: string;
  title: string;
  company: string;
  location: string;
  jobType: JobType;
  salary: Salary;          
  description: string;
  status?: JobStatus;    
  createdAt: string;
  postedBy?: string;    
  updatedAt?: string; 
   
}
 export interface JobResponse{
  jobs:Job[];
  total:number;
  page:number;
  totalPage:number;
 }


export interface JobCardProps {
  job: Job;
  onEdit?: (job: Job) => void;
  onDelete?: (id: string) => void;
  showActions?: boolean;
}
