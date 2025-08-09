  export const STATUS_CODES = {
    OK: 200,
    CREATED: 201,
    BAD_REQUEST: 400,
    UNAUTHORIZED: 401,
    FORBIDDEN: 403,
    NOT_FOUND: 404,
    CONFLICT: 409,
    INTERNAL_SERVER_ERROR: 500,
  };
  
  export const MESSAGES = {
    SUCCESS: {
      SIGNUP: "Successfully Registered.",
      LOGIN: "Login successful",
      LOGOUT: "Logout successful",
      DELETE_JOB_SUCCESS:"Job deleted Successfully"
    },
    ERROR: {
      INVALID_CREDENTIALS: "Invalid credentials",
      EMAIL_EXISTS: "Email already exists",
      USER_NOT_FOUND: "User not found",
      LOGOUT:"Internal server error... Logout failed",
      ALL_FIELDS_REQUIRED:"All fields are required",
      INVALID_PASSWORD_FORMAT:"Password must be between 6 and 10 characters.",
      INVALID_INPUT: "Invalid input: Email and Password are required",
      PASSWORD_MISMATCH: "Password and Confirm Password do not match",
      JWT_SECRET_MISSING: "JWT secret is not configured",
      UNAUTHORIZED: "Unauthorized access",
      FORBIDDEN: "Forbidden access",
      SERVER_ERROR: "Internal server error",
      MISSING_FIELDS: "Required fields are missing",
      INVALID_TOKEN: "Invalid or expired token",
      INCORRECT_PASSWORD:"Current Password not Matching",
    
    },
  };