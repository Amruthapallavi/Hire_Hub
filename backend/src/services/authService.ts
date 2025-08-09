import User from "../models/userModel";
import { IUser } from "../types/IUser";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

interface LoginResponse {
  user: IUser;
  token: string;
}

class AuthService {
  public async signup(name: string, email: string, password: string): Promise<IUser> {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      throw new Error("Email already exists");
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({
      name,
      email,
      password: hashedPassword,
    });

    return await user.save();
  }

  public async login(email: string, password: string): Promise<LoginResponse> {
    const user = await User.findOne({ email });
    if (!user) {
      throw new Error("User does not exist");
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new Error("Invalid credentials");
    }

    const secret = process.env.JWT_SECRET;
    if (!secret) {
      throw new Error("JWT secret is missing");
    }

    const payload = { userId: user._id, email: user.email };
    const token = jwt.sign(payload, secret, { expiresIn: "1h" });

    return {
      user,
      token,
    };
  }
}

export default AuthService;
