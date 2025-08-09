export interface IUser{
    _id?:string;
    name:string;
    email:string;
}

export interface SignUpData{
    name:string;
    email:string;
    password:string;
    confirmPassword:string;
}

export interface LoginData {
    email:string;
    password:string;
}

export interface RequestWithUser extends Request {
  user?: {
    userId: string;
  };
}