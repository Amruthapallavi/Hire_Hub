export interface SignupResponse {
  message: string;
}
export interface LoginResponse {
  message: string;
  token: string;
  user: {
    id: string;
    name: string;
    email: string;
  };
}

export interface SignUpData {

    name:string;
    email:string;
    password:string;
    confirmPassword:string;
}
export interface LoginData {
    email:string;
    password:string;
}