import express from "express";
import AuthController from "../controller/authController";
import JobController from "../controller/jobController";
import { authenticateToken } from "../middleware/authMiddleware";

const userRoutes=express.Router();

userRoutes.post('/signup',AuthController.signup);
userRoutes.post('/login',AuthController.login);
userRoutes.post('/job/add',authenticateToken,
    JobController.createJob)
export default userRoutes;