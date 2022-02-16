import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";

import db from "./util/db";

import AuthRouter from "./routes/auth.routes";
import UserRouter from "./routes/user.routes";

import { VerifyAuth } from "./middleware/authVerify";

// load env variables if environment is not production
// PS: env files should not be included in git history, but I did in here for demonstrate
// purposes
if (!process.env.PRODUCTION) dotenv.config({ path: "../../.env" });

// express initialization and settings
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev")); // request logger
app.use(VerifyAuth); // auth middleware

// routes
app.use("/api/auth", AuthRouter);
app.use("/api/user", UserRouter);

// 404 for undefined routes
app.get("*", (_, res) => {
  res.sendStatus(404);
});

// main fn
(async () => {
  try {
    // connect to database
    await db.connect();
    console.log("Connected to database");

    // mount backend
    await app.listen(process.env.BE_PORT);
    console.log(`App listening on ${process.env.BE_PORT}`);
  } catch (error) {
    if (error instanceof Error) {
      console.error("Error occurred while starting backend", error.message);
      return;
    }

    console.error("Unknown error occurred while starting backend");
    console.error(error);
  }
})();
