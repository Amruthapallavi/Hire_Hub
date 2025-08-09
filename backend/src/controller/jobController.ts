import { Request, Response } from "express";
import { Job } from "../types/IJob";
import JobService from "../services/jobService";
import { AuthenticatedRequest } from "../middleware/authMiddleware";
import { MESSAGES, STATUS_CODES } from "../utils/contants";

const jobService = new JobService();

class JobController {
  
  static async createJob(req: Request, res: Response): Promise<void> {
    try {
      const authReq = req as AuthenticatedRequest;
      const userId = authReq.user?.userId;

      if (!userId) {
        res.status(STATUS_CODES.UNAUTHORIZED).json({ message:MESSAGES.ERROR.UNAUTHORIZED });
        return;
      }

      const jobData = req.body as Job;
      const createdJob = await jobService.createJob(jobData, userId);

      res.status(STATUS_CODES.CREATED).json(createdJob);
    } catch (error:any) {
      console.error("Error creating job:", error);
      res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).json({ message:error.message || MESSAGES.ERROR.SERVER_ERROR });
    }
  }


  static async getAllJobs(req: Request, res: Response): Promise<void> {
   try {
      const authReq = req as AuthenticatedRequest;
      const userId = authReq.user?.userId;
      if (!userId) {
         res.status(STATUS_CODES.UNAUTHORIZED).json({ message: MESSAGES.ERROR.UNAUTHORIZED });
      }
      const page = parseInt(req.query.page as string) || 1;
      const limit = parseInt(req.query.limit as string) || 10;

      const { jobs, total } = await jobService.getAllJobs(userId, page, limit);

      res.json({
        jobs,
        total,
        page,
        totalPages: Math.ceil(total / limit),
      });
    } catch (error:any) {
      console.error(error);
      res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).json({ message:error.message || MESSAGES.ERROR.SERVER_ERROR });
    }
  }

  static async getJobById(req: Request, res: Response): Promise<void> {
    try {
      const authReq = req as AuthenticatedRequest;
      const userId = authReq.user?.userId;

      if (!userId) {
        res.status(STATUS_CODES.UNAUTHORIZED).json({ message: MESSAGES.ERROR.UNAUTHORIZED });
        return;
      }

      const { id } = req.params;
      const job = await jobService.getJobById(userId, id);
      res.status(STATUS_CODES.OK).json(job);
    } catch (error:any) {
      console.error("Error fetching job:", error);
      res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).json({ message:error.message || MESSAGES.ERROR.SERVER_ERROR });
    }
  }

  static async editJob(req: Request, res: Response): Promise<void> {
    try {
      const authReq = req as AuthenticatedRequest;
      const userId = authReq.user?.userId;

      if (!userId) {
        res.status(STATUS_CODES.UNAUTHORIZED).json({ message: MESSAGES.ERROR.UNAUTHORIZED});
        return;
      }

      const { id } = req.params;
      const updateData = req.body;

      const updatedJob = await jobService.editJob(userId, id, updateData);
      res.status(STATUS_CODES.OK).json(updatedJob);
    } catch (error:any) {
      console.error("Error updating job:", error);
      res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).json({ message:MESSAGES.ERROR.SERVER_ERROR });
    }
  }

 
  static async deleteJob(req: Request, res: Response): Promise<void> {
    try {
      const authReq = req as AuthenticatedRequest;
      const userId = authReq.user?.userId;

      if (!userId) {
        res.status(STATUS_CODES.UNAUTHORIZED).json({ message:MESSAGES.ERROR.UNAUTHORIZED});
        return;
      }

      const { id } = req.params;
      const deletedJob = await jobService.deleteJob(id, userId);
      res.status(STATUS_CODES.OK).json({ message:MESSAGES.SUCCESS.DELETE_JOB_SUCCESS });
    } catch (error:any) {
      console.error("Error deleting job:", error);
      res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).json({ message: error.message || MESSAGES.ERROR.SERVER_ERROR });
    }
  }
  
  static async getJobs(req: Request, res: Response): Promise<void> {
   try {
      const authReq = req as AuthenticatedRequest;
      const userId = authReq.user?.userId;
      if (!userId) {
         res.status(STATUS_CODES.UNAUTHORIZED).json({ message: MESSAGES.ERROR.UNAUTHORIZED });
      }
      const page = parseInt(req.query.page as string) || 1;
      const limit = parseInt(req.query.limit as string) || 10;

      const { jobs, total } = await jobService.getJobs(page, limit);

      res.status(STATUS_CODES.OK).json({
        jobs,
        total,
        page,
        totalPages: Math.ceil(total / limit),
      });
    } catch (error) {
      console.error(error);
      res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).json({ message:MESSAGES.ERROR.SERVER_ERROR });
    }
  }

}

export default JobController;
