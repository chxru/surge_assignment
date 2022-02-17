import { ComparePwd, HashPwd } from "../../util/bcrypt";

describe("Testing bcrypt functions", () => {
  it("ComparePwd should output true if hash and given password is matching", async () => {
    const result = await ComparePwd(
      "Password123!",
      "$2b$10$pp5qld4hKulSqqHGIXxl4eFc3wyC1VLFLzKxSiqUO/mk1cFnKGZg2"
    );

    expect(result).toBe(true);
  });

  it("ComparePwd should output false if hash and given password is a mismatch", async () => {
    const result = await ComparePwd(
      "Password",
      "$2b$10$pp5qld4hKulSqqHGIXxl4eFc3wyC1VLFLzKxSiqUO/mk1cFnKGZg2"
    );

    expect(result).toBe(false);
  });

  it("HashPwd should output a hash string for given password", async () => {
    const result = await HashPwd("Password");
    expect(result).toBeDefined();
  });
});
