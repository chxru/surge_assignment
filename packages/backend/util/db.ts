import { Pool } from "pg";

const db = new Pool({
  user: process.env.PGUSER,
  host: "0.0.0.0",
  database: process.env.PGDATABASE,
  password: process.env.PGPASSWORD,
  port: parseInt(process.env.PGPORT || "3002"),
});

// pg events
db.on("connect", () => {
  console.log("pg connection initiated");
});

export default db;
