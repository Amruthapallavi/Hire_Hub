import userApi from "../api/api"
import type { LoginData, LoginResponse, SignUpData, SignupResponse } from "../types/ICommon";


export const authService={
    Signup:async(signupData:SignUpData):Promise<SignupResponse>=>{
        const response=await userApi.post("/signup",signupData);
      return response.data;
    },
    login:async(loginData:LoginData):Promise<LoginResponse>=>{
      const response = await userApi.post("/login",loginData)
      return response.data;
    },
    LogOut:async():Promise<void>=>{
      const response=await userApi.post("/logout");
      return response.data;
    }
}