import { Request, Response } from "express";
import { LoginData, SignUpData } from "../types/IUser";
import AuthService from "../services/authService";

const authService = new AuthService();

class AuthController {
  static async signup(req: Request, res: Response): Promise<void> {
    try {
      const { name, email, password, confirmPassword }: SignUpData = req.body;

      if (!name || !email || !password || !confirmPassword) {
        res.status(400).json({ message: "All fields are required" });
        return;
      }

      if (password !== confirmPassword) {
        res.status(400).json({ message: "Passwords do not match" });
        return;
      }

      const newUser = await authService.signup(name, email, password);

      res.status(201).json({
        message: "User created successfully",
        user: {
          id: newUser._id,
          name: newUser.name,
          email: newUser.email,
        },
      });
    } catch (error: any) {
      console.error(error);
      res.status(400).json({ message: error.message || "Signup failed" });
    }
  }

  static async login(req: Request, res: Response): Promise<void> {
    try {
      const { email, password } = req.body as LoginData;

      if (!email || !password) {
        res.status(400).json({ message: "All fields are required" });
        return;
      }

      const { user, token } = await authService.login(email, password);

      res.status(200).json({
        message: "Login successful",
        token,
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
        },
      });
    } catch (error: any) {
      console.error(error);
      res.status(401).json({ message: error.message || "Login failed" });
    }
  }
}

export default AuthController;
