import { IJob } from "../interfaces/IJob";
import JobModel from "../models/jobModel";
import { Job } from "../types/IJob";

class JobService {
  public async createJob(jobData: Job, userId: string): Promise<IJob> {
    const newJob = new JobModel({
      ...jobData,
      createdAt: new Date(),
      postedBy: userId,
    });

    return await newJob.save();
  }

  public async getAllJobs(
    userId: string,
    page: number,
    limit: number
  ): Promise<{ jobs: IJob[]; total: number }> {
    const skip = (page - 1) * limit;

    const jobs = await JobModel.find({ postedBy: userId })
      .skip(skip)
      .limit(limit)
      .exec();

    const total = await JobModel.countDocuments({ postedBy: userId });

    return { jobs, total };
  }

  public async getJobById(userId: string, jobId: string): Promise<IJob> {
    const job = await JobModel.findOne({ _id: jobId, postedBy: userId });
    if (!job) {
      throw new Error("Job not found");
    }
    return job;
  }

  public async editJob(
    userId: string,
    jobId: string,
    updateData: Partial<IJob>
  ): Promise<IJob> {
    const updatedJob = await JobModel.findOneAndUpdate(
      { _id: jobId, postedBy: userId },
      { ...updateData, updatedAt: new Date() },
      { new: true }
    );

    if (!updatedJob) {
      throw new Error("Job not found or not authorized");
    }

    return updatedJob;
  }

  public async deleteJob(jobId: string, userId: string): Promise<IJob> {
    const deletedJob = await JobModel.findOneAndDelete({
      _id: jobId,
      postedBy: userId,
    });

    if (!deletedJob) {
      throw new Error("Job not found or not authorized");
    }

    return deletedJob;
  }
  public async getJobs(
    page: number,
    limit: number
  ): Promise<{ jobs: IJob[]; total: number }> {
    const skip = (page - 1) * limit;

    const jobs = await JobModel.find().skip(skip).limit(limit).exec();

    const total = await JobModel.countDocuments();

    return { jobs, total };
  }
}

export default JobService;
