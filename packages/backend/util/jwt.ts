import * as jwt from "jsonwebtoken";

/**
 * Generate access tokens.
 *
 * @param {number} id User ID
 * @param {("refresh" | "access")} type
 * @return {*}  {Promise<string>}
 */
const GenerateJWT = (id: number): Promise<string> => {
  return new Promise((resolve, reject) => {
    // grab token secret from env vars
    const token = process.env.JWT_ACCESS_TOKEN;

    if (!token) {
      reject(new Error(`[JWT] Token secret is empty. Check env variables`));
      return;
    }

    // refresh token 7days
    jwt.sign({ id }, token, { expiresIn: "7d" }, (err, token) => {
      if (token) {
        resolve(token);
      }

      // reject if no token is generated
      reject(err);
    });
  });
};

export { GenerateJWT };
