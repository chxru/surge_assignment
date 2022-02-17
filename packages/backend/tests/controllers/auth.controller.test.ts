import { API } from "@chxru/types";
import {
  HandleDataRefresh,
  HandleRegisterNewUser,
  HandleUserLogin,
} from "../../controllers/auth.controller";

const test_user: API.Auth.RegisterForm = {
  username: `test${Math.floor(Math.random() * 1000)}`, // no collisions, hypothetically
  email: `test${Math.floor(Math.random() * 1000)}@email.com`,
  full_name: "Test User",
  pwd: "Password123!",
};

describe("Testing user registration", () => {
  test("should create a user account for given details", async () => {
    const { access_token, user } = await HandleRegisterNewUser(test_user);

    expect(access_token).toBeTruthy();
    expect(user.id).toBeGreaterThan(0);
    expect(user.email).toBeTruthy();
    expect(user.full_name).toBeTruthy();
    expect(user.username).toBeTruthy();
  });

  test("should fail in duplicate usernames", async () => {
    await expect(
      HandleRegisterNewUser({
        ...test_user,
        email: `test${Math.floor(Math.random() * 1000)}@email.com`,
      })
    ).rejects.toThrow();
  });

  test("should fail in duplicate emails", async () => {
    await expect(
      HandleRegisterNewUser({
        ...test_user,
        username: `test${Math.floor(Math.random() * 1000)}`,
      })
    ).rejects.toThrow();
  });
});

describe("Testing user login functions", () => {
  test("should login success for valid email", async () => {
    const { access_token, user } = await HandleUserLogin(
      test_user.email,
      test_user.pwd
    );

    expect(access_token).toBeTruthy();
    expect(user.id).toBeGreaterThan(0);
    expect(user.email).toBeTruthy();
    expect(user.full_name).toBeTruthy();
    expect(user.username).toBeTruthy();
  });

  test("should login success for valid username", async () => {
    const { access_token, user } = await HandleUserLogin(
      test_user.username,
      test_user.pwd
    );

    expect(access_token).toBeTruthy();
    expect(user.id).toBeGreaterThan(0);
    expect(user.email).toBeTruthy();
    expect(user.full_name).toBeTruthy();
    expect(user.username).toBeTruthy();
  });

  test("should fail for non existing username/email", async () => {
    await expect(
      HandleUserLogin("nonExistingUser", "pwd")
    ).rejects.toThrowError("No user found");
  });

  test("should fail for invalid username and password", async () => {
    await expect(
      HandleUserLogin(test_user.username, "pwd")
    ).rejects.toThrowError("Username or password is not correct");
  });

  test("should fail for invalid email and password", async () => {
    await expect(HandleUserLogin(test_user.email, "pwd")).rejects.toThrowError(
      "Email or password is not correct"
    );
  });
});

// random valid token
const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjQ1MTM2NDM3LCJleHAiOjE2NDU3NDEyMzd9.7GQWLUAdhi140Ckw0sGZFnBas5152oTeqbcAGm_oP0Y";

describe("Testing user data refresh", () => {
  test("should provide valid user data for given token", async () => {
    const user = await HandleDataRefresh(token);

    expect(user.id).toBeGreaterThan(0);
    expect(user.email).toBeTruthy();
    expect(user.full_name).toBeTruthy();
    expect(user.username).toBeTruthy();
  });

  test("should fail for invalid tokens", async () => {
    await expect(HandleDataRefresh("token")).rejects.toThrow();
  });
});
