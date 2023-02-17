import { loginService } from "../src/services/userServices";
import { User } from "../src/models/userModel";
import { AppDataSource } from "../src/configs/dbConfig";
import bcrypt from "bcrypt";

describe("loginService", () => {
  let req;

  beforeAll(() => {
    req = { body: { email: "user@example.com", password: "password" } };
  });

  it("should throw an error when user is not found", async () => {
    AppDataSource.getRepository = jest.fn().mockReturnValue({
      findOneBy: jest.fn().mockResolvedValue(null),
    });

    await expect(loginService(req)).rejects.toThrow("Invalid Username");
  });

  it("should throw an error when password is invalid", async () => {
    const user = {
      email: "user@example.com",
      password: await bcrypt.hash("password", 10),
    };
    AppDataSource.getRepository = jest.fn().mockReturnValue({
      findOneBy: jest.fn().mockResolvedValue(user),
    });

    await expect(
      loginService({
        body: { email: "user@example.com", password: "wrongpassword" },
      })
    ).rejects.toThrow("Invalid Password");
  });

  it("should return user when email and password are valid", async () => {
    const user = {
      email: "user@example.com",
      password: await bcrypt.hash("password", 10),
    };
    AppDataSource.getRepository = jest.fn().mockReturnValue({
      findOneBy: jest.fn().mockResolvedValue(user),
    });

    const result = await loginService(req);

    expect(result).toEqual(user);
  });
});
