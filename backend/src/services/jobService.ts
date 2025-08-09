import { IJob } from "../interfaces/IJob";
import JobModel from "../models/jobModel";
import { Job } from "../types/IJob";


class JobService{
    public async createJob(jobData:Job,userId:string):Promise<IJob>{
   
const newJob= new JobModel({
    ...jobData,
    createdAt:new Date().toISOString(),
    postedBy:userId
})
 return await newJob.save();

    }
}

export default JobService;