import { Request, Response, Router } from "express";
import { checkSchema } from "express-validator";

import { register_schema } from "./schemas/auth.schema";

import { HandleRegisterNewUser } from "../controllers/auth.controller";

import { ValidateRequest } from "../util/requestValidate";

import type { API } from "@chxru/types";

const router = Router();

// handle user registration
router.post(
  "/register",
  checkSchema(register_schema),
  ValidateRequest,
  async (
    req: Request<unknown, unknown, API.Auth.RegisterForm>,
    res: Response<API.Response<API.Auth.AuthResponse>>
  ) => {
    try {
      const { access_token, refresh_token, user } = await HandleRegisterNewUser(
        req.body
      );

      // send response
      // set refresh token in cookie
      res.cookie("token", refresh_token, {
        domain: "localhost",
        expires: new Date(Date.now() + 7 * 24 * 3600000), // expires in 7 days
        httpOnly: true,
        secure: true, // https or localhost
      });

      // send success response
      res.status(200).json({ data: { user, access_token } });
    } catch (error) {
      if (error instanceof Error) {
        // duplicate constraint violations
        if (error.message.startsWith("duplicate key value")) {
          // duplicate username
          if (error.message.endsWith('"data_username_key"')) {
            res.status(500).json({ err: "Username already exists" });
            return;
          }

          // duplicate email
          if (error.message.endsWith('"data_email_key"')) {
            res.status(500).json({ err: "Email already exists" });
            return;
          }
        }

        // unexpected error
        console.error("Error occurred while saving new patient");
        console.error(error.message);
        res.sendStatus(500);
      } else {
        // unknown error
        console.error("Unknown error occurred");
        console.error(error);
        res.sendStatus(500);
      }
    }
  }
);

export default router;
