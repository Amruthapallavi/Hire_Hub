import userApi from "../api/api"
import type { IResponse } from "../types/ICommon";
import type { Job, JobResponse } from "../types/IJob";


export const jobService={
    createJob:async(jobData:Partial<Job>):Promise<Job>=>{
        const response = await userApi.post("/job/add",jobData);
        return response.data;
    },
    getAllJobs:async(page:number=1,limit:number):Promise<JobResponse>=>{
        const response = await userApi.get("/jobs",{params:{page,limit}});     
         return response.data;

    },
    getJobById:async(id:string):Promise<Job>=>{
     const response = await userApi.get(`/job/${id}`);
     return response.data;
    },
    updateJob:async(id:string,updateData:Partial<Job>):Promise<Job>=>{
      const response = await userApi.patch(`/job/edit/${id}`,updateData);
      return response.data;
    },
    deleteJob:async(id:string):Promise<IResponse>=>{
        const response= await userApi.delete(`/job/delete/${id}`);
        return response.data;
    },
    getJobs:async(page:number=1,limit:number):Promise<JobResponse>=>{
        const response= await userApi.get("/all-jobs",{params:{page,limit}});
        return response.data;
    }
}