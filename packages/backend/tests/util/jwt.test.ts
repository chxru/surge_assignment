import { DecodeJWT, DecodeUID, GenerateJWT, VerifyJWT } from "../../util/jwt";

// random valid token
const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjQ1MTM2NDM3LCJleHAiOjE2NDU3NDEyMzd9.7GQWLUAdhi140Ckw0sGZFnBas5152oTeqbcAGm_oP0Y";

describe("Testing JWT functions", () => {
  test("JWT_ACCESS_TOKEN should be in env vars", () => {
    expect(process.env.JWT_ACCESS_TOKEN).toBeDefined();
  });

  test("should decoded JWT should have valid id value", async () => {
    const result = await DecodeJWT(token);

    const { id } = JSON.parse(result);

    expect(id).toBeGreaterThan(0);
  });

  test("should generate JWT for given id", async () => {
    const result = await GenerateJWT(Math.floor(Math.random() * 100));

    expect(result).toBeDefined();
  });

  test("should be able to grab uid from token", async () => {
    const result = await DecodeUID(token);

    expect(result).toBeGreaterThan(0);
  });

  test("should fails when token is invalid or no id value present", async () => {
    await expect(DecodeUID("fakeToken")).rejects.toThrow();
  });

  test("should verify valid JWTs", () => {
    expect(VerifyJWT(token)).toBeTruthy();
  });

  test("should reject invalid JWTs", () => {
    expect(VerifyJWT("fakeToken")).toBeFalsy();
  });
});
