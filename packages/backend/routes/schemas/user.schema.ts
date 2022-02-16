import { Schema } from "express-validator";

const change_pwd_schema: Schema = {
  old_pwd: { in: "body", isString: true },
  new_pwd: {
    in: "body",
    isStrongPassword: true,
    errorMessage: "Password isn't strong enough",
  },
};

const edit_user_schema: Schema = {
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
};

export { change_pwd_schema, edit_user_schema };
