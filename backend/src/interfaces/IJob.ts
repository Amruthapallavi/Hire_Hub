import mongoose, { Document } from "mongoose";
import { JobStatus, JobType, SalaryPeriod } from "../utils/status/jobType";


export interface IJob extends Document{
    title:string;
    description:string;
    company:string;
    location:string;
    jobType:JobType;
    salary:ISalary;
    status:JobStatus;
    postedBy:mongoose.Types.ObjectId;
    createdAt:Date;
    updatedAt:Date;
}


export interface ISalary {
  min: number;
  max: number;
  currency: string;
  period: SalaryPeriod
}