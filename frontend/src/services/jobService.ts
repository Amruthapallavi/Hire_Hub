import userApi from "../api/api"


export const jobService={
    createJob:async(jobData:any):Promise<any>=>{
        const response = await userApi.post("/job/add",jobData);
        console.log(response.data);
        return response.data;
    }
}