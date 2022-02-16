import * as jwt from "jsonwebtoken";

/**
 * Validate and Decode JWT
 *
 * @param {string} token
 * @return {*}  {Promise<string>}
 */
const DecodeJWT = (token: string): Promise<string> => {
  return new Promise((resolve, reject) => {
    if (!process.env.JWT_ACCESS_TOKEN) {
      reject(
        new Error(
          "Token secret for refresh token is empty. Check env variables"
        )
      );
      return;
    }

    // verify jwt
    jwt.verify(token, process.env.JWT_ACCESS_TOKEN, (err) => {
      if (err) {
        throw new Error(err.message);
      }

      // decode jwt
      const decoded = jwt.decode(token);
      resolve(JSON.stringify(decoded));
    });
  });
};

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

/**
 * Grab user id from jwt
 *
 * @param {string} token
 * @return {*}  {Promise<number>}
 */
const DecodeUID = async (t: string): Promise<number> => {
  // token is in token=xxxxxxx format
  const token = t.split("=")[1];
  const payload = await DecodeJWT(token);

  const id = JSON.parse(payload).id;
  if (!id) {
    throw new Error("JWT missing id");
  }

  return id;
};

export { GenerateJWT, DecodeJWT, DecodeUID };
