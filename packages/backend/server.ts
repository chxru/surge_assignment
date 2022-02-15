import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";

// load env variables
// PS: env files should not be included in git history, but I did in here for demonstrate
// purposes
dotenv.config();

// express initialization and settings
const app = express();
app.use(morgan("dev"));

app.get("/", (_, res) => {
  console.log("hey");
  res.sendStatus(200);
});

(async () => {
  try {
    // mount backend
    await app.listen(process.env.port);
    console.log(`App listening on ${process.env.port}`);
  } catch (error) {
    if (error instanceof Error) {
      console.error("Error occurred while starting backend", error.message);
      return;
    }

    console.error("Unknown error occurred while starting backend");
    console.error(error);
  }
})();
