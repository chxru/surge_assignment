import { Request, Response, Router } from "express";
import { checkSchema } from "express-validator";

import {
  HandleChangePwd,
  HandleUserEdit,
} from "../controllers/user.controller";

import { change_pwd_schema, edit_user_schema } from "./schemas/user.schema";

import { ValidateRequest } from "../util/validation";

import type { API } from "@chxru/types";

const router = Router();

// edit user data
router.post(
  "/edit",
  checkSchema(edit_user_schema),
  ValidateRequest,
  async (
    req: Request<unknown, unknown, API.User.EditInfoForm>,
    res: Response<API.Response<API.Auth.PublicUserData>>
  ) => {
    // grab token
    const token = req.headers.cookie;
    if (!token) {
      // 403 if token not found
      console.log("Token not found");
      res.sendStatus(403);
      return;
    }

    try {
      const user = await HandleUserEdit(req.body, token);
      res.status(200).json({ data: user });
    } catch (error) {
      if (error instanceof Error) {
        res.status(500).json({ err: error.message });
        return;
      }

      console.error("Error occurred in Handle User Edit" + error);
      res.sendStatus(500);
    }
  }
);

// change password
router.post(
  "/pwd",
  checkSchema(change_pwd_schema),
  ValidateRequest,
  async (
    req: Request<unknown, unknown, API.User.ChangePasswordForm>,
    res: Response<API.Response<void>>
  ) => {
    // grab token
    const token = req.headers.cookie;
    if (!token) {
      // 403 if token not found
      console.log("Token not found");
      res.sendStatus(403);
      return;
    }

    try {
      await HandleChangePwd(req.body.old_pwd, req.body.new_pwd, token);
      res.sendStatus(200);
    } catch (error) {
      if (error instanceof Error) {
        res.status(500).json({ err: error.message });
        return;
      }

      console.error("Error occurred in Handle Password change" + error);
      res.sendStatus(500);
    }
  }
);

export default router;
