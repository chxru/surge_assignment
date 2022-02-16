import { Request, Response, Router } from "express";
import { checkSchema } from "express-validator";

import { login_schema, register_schema } from "./schemas/auth.schema";

import {
  HandleDataRefresh,
  HandleRegisterNewUser,
  HandleUserLogin,
} from "../controllers/auth.controller";

import { ValidateRequest } from "../util/requestValidate";

import type { API } from "@chxru/types";

const router = Router();

// handle user login
router.post(
  "/login",
  checkSchema(login_schema),
  ValidateRequest,
  async (
    req: Request<unknown, unknown, API.Auth.LoginForm>,
    res: Response<API.Response<API.Auth.AuthResponse>>
  ) => {
    try {
      const { user, access_token } = await HandleUserLogin(
        req.body.username,
        req.body.pwd
      );

      // send response
      // set access token in cookie
      res.cookie("token", access_token, {
        domain: "localhost",
        expires: new Date(Date.now() + 7 * 24 * 3600000), // expires in 7 days
        httpOnly: true,
        secure: true, // https or localhost
      });

      // send success response
      res.status(200).json({ data: { user } });
    } catch (error) {
      if (error instanceof Error) {
        res.status(500).json({ err: error.message });
        return;
      }

      console.log("Unknown error occurred while user signing" + error);
      res.sendStatus(500);
    }
  }
);

// handle user refresh
router.get(
  "/refresh",
  async (req, res: Response<API.Response<API.Auth.PublicUserData>>) => {
    // cookie is in token=xxxxxxx format
    const token = req.headers.cookie?.split("=")[1];
    if (!token) {
      // 403 if token not found
      console.log("Token not found");
      res.sendStatus(403);
      return;
    }

    try {
      const user = await HandleDataRefresh(token);
      res.status(200).json({ data: user });
    } catch (error) {
      // silently ignore any errors here
      console.error("Error occurred in user data refresh" + error);
      res.sendStatus(500);
    }
  }
);

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
      const { access_token, user } = await HandleRegisterNewUser(req.body);

      // send response
      // set access token in cookie
      res.cookie("token", access_token, {
        domain: "localhost",
        expires: new Date(Date.now() + 7 * 24 * 3600000), // expires in 7 days
        httpOnly: true,
        secure: true, // https or localhost
      });

      // send success response
      res.status(200).json({ data: { user } });
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
