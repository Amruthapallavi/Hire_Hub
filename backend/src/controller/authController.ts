import { Request, Response } from "express";
import { LoginData, SignUpData } from "../types/IUser";
import AuthService from "../services/authService";
import { MESSAGES, STATUS_CODES } from "../utils/contants";

const authService = new AuthService();

class AuthController {
  static async signup(req: Request, res: Response): Promise<void> {
    try {
      const { name, email, password, confirmPassword }: SignUpData = req.body;

      if (!name || !email || !password || !confirmPassword) {
        res
          .status(STATUS_CODES.BAD_REQUEST)
          .json({ message: "All fields are required" });
        return;
      }

      if (password !== confirmPassword) {
        res
          .status(STATUS_CODES.BAD_REQUEST)
          .json({ message: MESSAGES.ERROR.PASSWORD_MISMATCH });
        return;
      }

      const newUser = await authService.signup(name, email, password);

      res.status(STATUS_CODES.CREATED).json({
        message: MESSAGES.SUCCESS.SIGNUP,
        user: {
          id: newUser._id,
          name: newUser.name,
          email: newUser.email,
        },
      });
    } catch (error: any) {
      console.error(error);
      res
        .status(STATUS_CODES.INTERNAL_SERVER_ERROR)
        .json({ message: error.message || MESSAGES.ERROR.SERVER_ERROR });
    }
  }

  static async login(req: Request, res: Response): Promise<void> {
    try {
      const { email, password } = req.body as LoginData;

      if (!email || !password) {
        res
          .status(STATUS_CODES.BAD_REQUEST)
          .json({ message: MESSAGES.ERROR.INVALID_INPUT });
        return;
      }

      const { user, token } = await authService.login(email, password);

      res.status(STATUS_CODES.OK).json({
        message: MESSAGES.SUCCESS.LOGIN,
        token,
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
        },
      });
    } catch (error: any) {
      console.error(error);
      res
        .status(STATUS_CODES.INTERNAL_SERVER_ERROR)
        .json({ message: error.message || MESSAGES.ERROR.SERVER_ERROR });
    }
  }
  static async logout(req: Request, res: Response): Promise<void> {
    try {
      res.clearCookie("token", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
      });

      res.status(STATUS_CODES.OK).json({ message: MESSAGES.SUCCESS.LOGOUT });
    } catch (error) {
      console.error("Logout Error:", error);
      res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).json({ message: MESSAGES.ERROR.SERVER_ERROR});
    }
  }
}

export default AuthController;
