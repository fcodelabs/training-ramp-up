import { AppDataSource } from "../../data-source";
import { User } from "../../entity/User";
import * as crypto from "crypto";
import * as jwt from "jsonwebtoken";

describe("student tests", () => {
  beforeAll(async () => {
    await AppDataSource.initialize()
      .then(() => {
        console.log("Data Source has been initialized!");
      })
      .catch((error) => console.log(error));
  }, 10000);
  describe("addUser tests", () => {
    const username = "Test";
    const password = "Test";
    test("User already exists", async () => {
      const userRepository = AppDataSource.getRepository(User);
      const userData = await userRepository.findOne({
        where: { username: `${username}` },
      });
      expect(userData).not.toBeNull();
    });
    test("User registration successful", async () => {
      const newUser = new User();
      newUser.username = username;
      const salt = crypto.randomBytes(16);
      crypto.pbkdf2(
        password,
        salt,
        310000,
        32,
        "sha256",
        async function (err, hashedPassword) {
          newUser.password = hashedPassword.toString("base64");
          newUser.salt = salt.toString("base64");
          const token = jwt.sign(
            { userName: username, password: newUser.password },
            process.env.TOKEN_KEY as string,
            {
              expiresIn: "2h",
            }
          );
          newUser.token = token;
          await expect(
            AppDataSource.manager.save(newUser)
          ).resolves.toBeTruthy();
        }
      );
    });
    test("Could not signUp", async () => {
      const newUser = new User();
      newUser.username = username;
      const salt = crypto.randomBytes(16);
      crypto.pbkdf2(
        password,
        salt,
        310000,
        32,
        "sha256",
        async function (err, hashedPassword) {
          newUser.password = hashedPassword.toString("base64");
          newUser.salt = salt.toString("base64");
          const token = jwt.sign(
            { userName: username, password: newUser.password },
            process.env.TOKEN_KEY as string,
            {
              expiresIn: "2h",
            }
          );
          newUser.token = token;
          await expect(
            AppDataSource.manager.save(newUser)
          ).rejects.toBeInstanceOf(Error);
        }
      );
    });
  });
  describe("getUser tests", () => {
    const username = "Test";
    const password = "Test";
    test("User does not exist", async () => {
      const userRepository = AppDataSource.getRepository(User);
      await expect(
        userRepository.findOne({
          where: { username: `${username}` },
        })
      ).resolves.toBeNull();
    });
    test("Incorrect password", async () => {
      const userRepository = AppDataSource.getRepository(User);
      const userData = await userRepository.findOne({
        where: { username: `${username}` },
      });
      crypto.pbkdf2(
        password,
        Buffer.from(userData?.salt as string, "base64"),
        310000,
        32,
        "sha256",
        async function (err, hashedPassword) {
          expect(
            crypto.timingSafeEqual(
              Buffer.from(userData?.password as string, "base64"),
              hashedPassword
            )
          ).toBe(false);
        }
      );
    });
    test("User signed in successfully", async () => {
      const userRepository = AppDataSource.getRepository(User);
      const userData = await userRepository.findOne({
        where: { username: `${username}` },
      });
      crypto.pbkdf2(
        password,
        Buffer.from(userData?.salt as string, "base64"),
        310000,
        32,
        "sha256",
        async function (err, hashedPassword) {
          const token = jwt.sign(
            { userName: username, password: userData?.password },
            process.env.TOKEN_KEY as string,
            {
              expiresIn: "2h",
            }
          );
          if (userData) {
            userData.token = token;
            await expect(
              AppDataSource.manager.update(
                User,
                { username: username },
                userData
              )
            ).resolves.toBeTruthy();
          }
        }
      );
    });
    test("Could not sign in", async () => {
      const userRepository = AppDataSource.getRepository(User);
      const userData = await userRepository.findOne({
        where: { username: `${username}` },
      });
      crypto.pbkdf2(
        password,
        Buffer.from(userData?.salt as string, "base64"),
        310000,
        32,
        "sha256",
        async function (err, hashedPassword) {
          const token = jwt.sign(
            { UserName: username, Password: userData?.password },
            process.env.TOKEN_KEY as string,
            {
              expiresIn: "2h",
            }
          );
          if (userData) {
            userData.token = token;
            await expect(
              AppDataSource.manager.update(
                User,
                { username: username },
                userData
              )
            ).rejects.toBeInstanceOf(Error);
          }
        }
      );
    });
  });
  describe("refreshUser tests", () => {
    const username = "Test";
    test("Refresh successful", async () => {
      const userRepository = AppDataSource.getRepository(User);
      const userData = await userRepository.findOne({
        where: { username: `${username}` },
      });
      if (userData)
        await expect(
          jwt.verify(userData.token, process.env.TOKEN_KEY as string)
        ).resolves.toBeTruthy();
    });
    test("Invalid Token", async () => {
      const userRepository = AppDataSource.getRepository(User);
      const userData = await userRepository.findOne({
        where: { username: `${username}` },
      });
      if (userData)
        await expect(
          jwt.verify(userData.token, process.env.TOKEN_KEY as string)
        ).rejects.toBeInstanceOf(Error);
    });
  });
  describe("signOutUser tests", () => {
    const username = "Test";
    test("User signed out successfully", async () => {
      const userRepository = AppDataSource.getRepository(User);
      const userData = await userRepository.findOne({
        where: { username: `${username}` },
      });
      if (userData) {
        userData.token = "";
        await expect(
          AppDataSource.manager.update(
            User,
            { username: `${username}` },
            userData
          )
        ).resolves.toBeTruthy();
      }
    });
    test("Error signing out user", async () => {
      const userRepository = AppDataSource.getRepository(User);
      const userData = await userRepository.findOne({
        where: { username: `${username}` },
      });
      if (userData) {
        userData.token = "";
        await expect(
          AppDataSource.manager.update(
            User,
            { username: `${username}` },
            userData
          )
        ).rejects.toBeInstanceOf(Error);
      }
    });
  });
  afterAll(async () => {
    await AppDataSource.manager.delete(User, { username: "Test" });
    await AppDataSource.destroy()
      .then(() => {
        console.log("Data Source has been destroyed");
      })
      .catch((error) => console.log(error));
  }, 10000);
});
