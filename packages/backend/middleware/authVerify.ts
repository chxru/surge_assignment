import express from "express";
import { VerifyJWT } from "../util/jwt";

/**
 * Express middleware to verify auth token is attached
 *
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {express.NextFunction} next
 * @return {*}  {(void | express.Response)}
 */
const VerifyAuth = (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
): void | express.Response => {
  // skip auth check for /auth routes
  if (req.path.startsWith("/api/auth")) {
    next();
    return;
  }

  // token is in token=xxxxxxx format
  const token = req.headers.cookie?.split("=")[1];

  if (!token) {
    return res.sendStatus(403);
  }

  if (VerifyJWT(token)) {
    next();
    return;
  } else {
    return res.sendStatus(403);
  }
};

export { VerifyAuth };
