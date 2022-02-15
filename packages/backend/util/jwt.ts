import * as jwt from "jsonwebtoken";

/**
 * Generate access and refresh JWTs.
 * Refresh token => long term (7 days)
 * Access token => short term (20mins)
 *
 * @param {number} id User ID
 * @param {("refresh" | "access")} type
 * @return {*}  {Promise<string>}
 */
const GenerateJWT = (
  id: number,
  type: "refresh" | "access"
): Promise<string> => {
  return new Promise((resolve, reject) => {
    // grab token secret from env vars
    const token =
      type === "refresh"
        ? process.env.JWT_REFRESH_TOKEN
        : process.env.JWT_ACCESS_TOKEN;

    if (!token) {
      reject(
        new Error(
          `[JWT] Token secret for ${type} is empty. Check env variables`
        )
      );
      return;
    }

    // refresh token 7days, access token 20mins
    const expiresIn = type === "refresh" ? "7d" : 60 * 20;

    jwt.sign({ id }, token, { expiresIn }, (err, token) => {
      if (token) {
        resolve(token);
      }

      // reject if no token is generated
      reject(err);
    });
  });
};

export { GenerateJWT };
