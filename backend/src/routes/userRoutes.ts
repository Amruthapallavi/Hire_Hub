import express from "express";
import AuthController from "../controller/authController";
import JobController from "../controller/jobController";
import { authenticateToken } from "../middleware/authMiddleware";

const userRoutes = express.Router();

userRoutes.post("/signup", AuthController.signup);
userRoutes.post("/login", AuthController.login);
userRoutes.post("/logout", AuthController.logout);
userRoutes.post("/job/add", authenticateToken, JobController.createJob);
userRoutes.get("/jobs", authenticateToken, JobController.getAllJobs);
userRoutes.get("/job/:id", authenticateToken, JobController.getJobById);
userRoutes.patch("/job/edit/:id", authenticateToken, JobController.editJob);
userRoutes.delete("/job/delete/:id",authenticateToken,JobController.deleteJob);
userRoutes.get("/all-jobs", authenticateToken, JobController.getJobs);
export default userRoutes;
