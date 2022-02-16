import db from "../util/db";
import { ComparePwd, HashPwd } from "../util/bcrypt";

import { DecodeJWT, GenerateJWT } from "../util/jwt";
import { ValidateEmail } from "../util/requestValidate";

import type { API, DB } from "@chxru/types";

/**
 * Handle user login
 *
 * @param {string} username
 * @param {string} pwd
 * @return {*}  {Promise<{ user: API.Auth.PublicUserData; access_token: string }>}
 */
const HandleUserLogin = async (
  username: string,
  pwd: string
): Promise<{ user: API.Auth.PublicUserData; access_token: string }> => {
  // here username can be a username or an email
  const isEmail = ValidateEmail(username);

  // query data
  const q1 = await db.query(
    `SELECT id, full_name, username, pwd, email FROM users.data WHERE ${
      isEmail ? "email" : "username"
    }=$1`,
    [username]
  );

  // check user exists
  if (q1.rowCount === 0) {
    throw new Error("No user found");
  }

  const temp_user: Pick<
    DB.UserData,
    "id" | "full_name" | "username" | "pwd" | "email"
  > = q1.rows[0];

  // compare password and hash
  const pwdMatch = await ComparePwd(pwd, temp_user.pwd);
  if (!pwdMatch) {
    throw new Error(
      `${isEmail ? "Email" : "Username"} or password is not correct`
    );
  }

  const user: API.Auth.PublicUserData = {
    id: temp_user.id,
    full_name: temp_user.full_name,
    email: temp_user.email,
    username: temp_user.username,
  };

  // Generate JWT
  const access_token = await GenerateJWT(user.id);

  // set tokens expire timestamp (20 minutes)
  const expire_time = new Date(new Date().getTime() + 20 * 60000);

  // save refresh token data in database
  await db.query(
    "INSERT INTO users.tokens (id, token, expires) VALUES ($1, $2, $3)",
    [user.id, access_token, expire_time]
  );

  console.log(`User ${user.id} logged in`);

  return { user, access_token };
};

/**
 * Fetch user data related to jwt token
 *
 * @param {string} token
 * @return {*}  {Promise<API.Auth.PublicUserData>}
 */
const HandleDataRefresh = async (
  token: string
): Promise<API.Auth.PublicUserData> => {
  // decode jwt
  const payload = await DecodeJWT(token);

  const id = JSON.parse(payload).id;
  if (!id) {
    throw new Error("JWT missing id");
  }

  // query user data
  const q1 = await db.query(
    `SELECT id, full_name, username, pwd, email FROM users.data WHERE id=$1`,
    [id]
  );
  if (q1.rowCount === 0) {
    throw new Error(`No user found with id ${id}`);
  }

  const user: API.Auth.PublicUserData = {
    username: q1.rows[0].username,
    email: q1.rows[0].email,
    full_name: q1.rows[0].full_name,
    id: q1.rows[0].id,
  };

  return user;
};

/**
 * Create new user in database, generate JWTs and store them in database.
 *
 * @param {API.Auth.RegisterForm} data
 * @return {*}  {Promise<{b
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

export { HandleUserLogin, HandleRegisterNewUser, HandleDataRefresh };
