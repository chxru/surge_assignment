import * as bcrypt from "bcrypt";

/**
 * Compare given password with the hash
 *
 * @param {string} pwd
 * @param {string} hash
 * @return {*}  {Promise<boolean>}
 */
const ComparePwd = (pwd: string, hash: string): Promise<boolean> => {
  return new Promise((resolve, reject) => {
    bcrypt.compare(pwd, hash, (err, res) => {
      if (err) {
        reject(err);
      }
      resolve(res);
    });
  });
};

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

export { ComparePwd, HashPwd };
