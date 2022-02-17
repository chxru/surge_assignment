import db from "../util/db";
import { DecodeUID } from "../util/jwt";
import { ComparePwd, HashPwd } from "../util/bcrypt";

import { API } from "@chxru/types";

/**
 * Update user.data columns
 *
 * @param {API.User.EditInfoForm} data
 * @param {string} token
 * @return {*}  {Promise<API.Auth.PublicUserData>}
 */
const HandleUserEdit = async (
  data: API.User.EditInfoForm,
  t: string
): Promise<API.Auth.PublicUserData> => {
  // token is in token=xxxxxxx format
  const token = t.split("=")[1];
  const id = await DecodeUID(token);

  const q1 = await db.query<API.Auth.PublicUserData>(
    "UPDATE users.data SET username=$1, email=$2, full_name=$3  WHERE id=$4 returning id, full_name, email, username",
    [data.username, data.email, data.full_name, id]
  );

  if (q1.rowCount === 0) {
    throw new Error("No matching row");
  }

  return q1.rows[0];
};

/**
 * Update user password
 *
 * @param {string} old_pwd
 * @param {string} new_pwd
 * @param {string} token
 * @return {*}  {Promise<void>}
 */
const HandleChangePwd = async (
  old_pwd: string,
  new_pwd: string,
  t: string
): Promise<void> => {
  // grab uid from token
  // token is in token=xxxxxxx format
  const token = t.split("=")[1];
  const id = await DecodeUID(token);

  // get old password
  const q1 = await db.query<{ pwd: string }>(
    "SELECT pwd FROM users.data WHERE id=$1",
    [id]
  );

  // throw if no user for given id exists
  if (q1.rowCount === 0) {
    throw new Error(`No user found with id ${id}`);
  }

  // compare old_pwd is saved password
  const pwdMatch = await ComparePwd(old_pwd, q1.rows[0].pwd);
  if (!pwdMatch) {
    throw new Error("Wrong password");
  }

  // generate new hash
  const hashedPwd = await HashPwd(new_pwd);

  // update database
  await db.query("UPDATE users.data SET pwd=$1 WHERE id=$2", [hashedPwd, id]);
};

export { HandleUserEdit, HandleChangePwd };
