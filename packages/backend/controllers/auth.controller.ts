import db from "../util/db";
import { HashPwd } from "../util/bcrypt";
import { GenerateJWT } from "../util/jwt";

import type { API } from "@chxru/types";

/**
 * Create new user in database, generate JWTs and store them in database.
 *
 * @param {API.Auth.RegisterForm} data
 * @return {*}  {Promise<{
 *   user: API.Auth.PublicUserData;
 *   access_token: string;
 * }>}
 */
const HandleRegisterNewUser = async (
  data: API.Auth.RegisterForm
): Promise<{
  user: API.Auth.PublicUserData;
  access_token: string;
}> => {
  // generate hash of the password
  const hashedPwd = await HashPwd(data.pwd);

  // saving user in database
  const q1 = await db.query<{ id: number }>(
    "INSERT INTO users.data (full_name, username, pwd, email) VALUES ($1, $2, $3, $4) RETURNING id",
    [data.full_name, data.username, hashedPwd, data.email]
  );

  // auto generated user id
  const id = q1.rows[0].id;

  // Generate JWT
  const access_token = await GenerateJWT(id);

  // set tokens expire timestamp (20 minutes)
  const expire_time = new Date(new Date().getTime() + 20 * 60000);

  // save refresh token data in database
  await db.query(
    "INSERT INTO users.tokens (id, token, expires) VALUES ($1, $2, $3)",
    [id, access_token, expire_time]
  );

  console.log(`User ${id} : ${data.full_name} created successfully`);

  // create new user object
  const user: API.Auth.PublicUserData = {
    id,
    username: data.username,
    email: data.email,
    full_name: data.full_name,
  };

  return { user, access_token };
};

export { HandleRegisterNewUser };
