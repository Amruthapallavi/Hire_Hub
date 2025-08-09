import { Request, Response } from "express";
import { Job } from "../types/IJob";
import JobService from "../services/jobService";
import { AuthenticatedRequest } from "../middleware/authMiddleware";

const jobService = new JobService();

class JobController {
  static async createJob(req: Request, res: Response): Promise<void> {
    try {
        const authReq = req as AuthenticatedRequest;
        const userId = authReq.user?.userId; 
         if (!userId) {
        // res.status(STATUS_CODES.UNAUTHORIZED).json({ message: MESSAGES.ERROR.UNAUTHORIZED });
        return;
      } 
      const jobData = req.body as Job;

      const createdJob = await jobService.createJob(jobData,userId);

      res.status(201).json(createdJob);
    } catch (error) {
      console.error("Error creating job:", error);
      res.status(500).json({ message: "Failed to create job", error });
    }
  }
}

export default JobController;
