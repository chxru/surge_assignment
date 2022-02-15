import * as bcrypt from "bcrypt";

/**
 * Generate hash of the user's password using bcrypt
 *
 * @param {string} pwd
 * @return {*}
 */
const HashPwd = (pwd: string): Promise<string> => {
  const saltRounds = 10;
  return new Promise((resolve, reject) => {
    bcrypt.hash(pwd, saltRounds, (err, hash) => {
      if (err) {
        reject(err);
      } else {
        resolve(hash);
      }
    });
  });
};

export { HashPwd };
