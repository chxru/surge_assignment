import { ValidateEmail } from "../../util/validation";

describe("Testing custom validation", () => {
  // TODO: add multiple test cases
  test("should return true for valid email", () => {
    expect(ValidateEmail("email@email.com")).toBeTruthy();
  });

  test("should return false for invalid email", () => {
    expect(ValidateEmail("email_email.com")).toBeFalsy();
  });
});
