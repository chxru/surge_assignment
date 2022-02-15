import { Schema } from "express-validator";

// schema for user registration
const register_schema: Schema = {
  full_name: {
    in: "body",
    isString: true,
    errorMessage: "Invalid Full Name",
    trim: true,
  },
  email: {
    in: "body",
    errorMessage: "Invalid email",
    isEmail: true,
    trim: true,
  },
  username: {
    in: "body",
    isString: true,
    errorMessage: "Invalid username",
    trim: true,
  },
  pwd: {
    in: "body",
    isStrongPassword: true,
    errorMessage: "Password isn't strong enough",
  },
};

export { register_schema };
