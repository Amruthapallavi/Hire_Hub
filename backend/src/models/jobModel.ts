import mongoose, { Model, Schema } from "mongoose";
import { IJob } from "../interfaces/IJob";
import { JobStatus, JobType, SalaryPeriod } from "../utils/status/jobType";




const jobSchema: Schema<IJob>= new Schema (
    {
    title: { type: String, required: [true, "Job title is required"] },
    description: { type: String, required: [true, "Job description is required"] },
    company: { type: String, required: [true, "Company name is required"] },
    location: { type: String, required: [true, "Location is required"] },
     
       jobType: {
      type: String,
      enum: Object.values(JobType),
      required: true
    },

    salary: {
      min: { type: Number, required: true },
      max: { type: Number, required: true },
      currency: { type: String, default: "INR" },
      period: {
        type: String,
        enum: Object.values(SalaryPeriod),
        default: SalaryPeriod.MONTHLY
      }
    },

    status: {
      type: String,
      enum: Object.values(JobStatus),
      default: JobStatus.ACTIVE,
      required: true
    },

    postedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    }
  },
  { timestamps: true }

    
)

const JobModel:Model<IJob>=mongoose.model<IJob>('Job',jobSchema);
export default JobModel;