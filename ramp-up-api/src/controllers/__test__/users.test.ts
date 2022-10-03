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
        where: { UserName: `${username}` },
      });
      expect(userData).not.toBeNull();
    });
    test("User registration successful", async () => {
      const newUser = new User();
      newUser.UserName = username;
      const salt = crypto.randomBytes(16);
      crypto.pbkdf2(
        password,
        salt,
        310000,
        32,
        "sha256",
        async function (err, hashedPassword) {
          newUser.Password = hashedPassword.toString("base64");
          newUser.Salt = salt.toString("base64");
          const token = jwt.sign(
            { UserName: username, Password: newUser.Password },
            process.env.TOKEN_KEY as string,
            {
              expiresIn: "2h",
            }
          );
          newUser.Token = token;
          await expect(
            AppDataSource.manager.save(newUser)
          ).rejects.toBeInstanceOf(Error);
        }
      );
    });
    test("Could not signUp", async () => {
      const newUser = new User();
      newUser.UserName = username;
      const salt = crypto.randomBytes(16);
      crypto.pbkdf2(
        password,
        salt,
        310000,
        32,
        "sha256",
        async function (err, hashedPassword) {
          newUser.Password = hashedPassword.toString("base64");
          newUser.Salt = salt.toString("base64");
          const token = jwt.sign(
            { UserName: username, Password: newUser.Password },
            process.env.TOKEN_KEY as string,
            {
              expiresIn: "2h",
            }
          );
          newUser.Token = token;
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
          where: { UserName: `${username}` },
        })
      ).resolves.toBeNull();
    });
    test("Incorrect password", async () => {
      const userRepository = AppDataSource.getRepository(User);
      const userData = await userRepository.findOne({
        where: { UserName: `${username}` },
      });
      crypto.pbkdf2(
        password,
        Buffer.from(userData?.Salt as string, "base64"),
        310000,
        32,
        "sha256",
        async function (err, hashedPassword) {
          expect(
            crypto.timingSafeEqual(
              Buffer.from(userData?.Password as string, "base64"),
              hashedPassword
            )
          ).toBe(false);
        }
      );
    });
    test("User signed in successfully", async () => {
      const userRepository = AppDataSource.getRepository(User);
      const userData = await userRepository.findOne({
        where: { UserName: `${username}` },
      });
      crypto.pbkdf2(
        password,
        Buffer.from(userData?.Salt as string, "base64"),
        310000,
        32,
        "sha256",
        async function (err, hashedPassword) {
          const token = jwt.sign(
            { UserName: username, Password: userData?.Password },
            process.env.TOKEN_KEY as string,
            {
              expiresIn: "2h",
            }
          );
          if (userData) {
            userData.Token = token;
            await expect(
              AppDataSource.manager.update(
                User,
                { UserName: username },
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
        where: { UserName: `${username}` },
      });
      crypto.pbkdf2(
        password,
        Buffer.from(userData?.Salt as string, "base64"),
        310000,
        32,
        "sha256",
        async function (err, hashedPassword) {
          const token = jwt.sign(
            { UserName: username, Password: userData?.Password },
            process.env.TOKEN_KEY as string,
            {
              expiresIn: "2h",
            }
          );
          if (userData) {
            userData.Token = token;
            await expect(
              AppDataSource.manager.update(
                User,
                { UserName: username },
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
        where: { UserName: `${username}` },
      });
      if (userData)
        await expect(
          jwt.verify(userData.Token, process.env.TOKEN_KEY as string)
        ).resolves.toBeTruthy();
    });
    test("Invalid Token", async () => {
      const userRepository = AppDataSource.getRepository(User);
      const userData = await userRepository.findOne({
        where: { UserName: `${username}` },
      });
      if (userData)
        await expect(
          jwt.verify(userData.Token, process.env.TOKEN_KEY as string)
        ).rejects.toBeInstanceOf(Error);
    });
  });
  describe("signOutUser tests", () => {
    const username = "Test";
    test("User signed out successfully", async () => {
      const userRepository = AppDataSource.getRepository(User);
      const userData = await userRepository.findOne({
        where: { UserName: `${username}` },
      });
      if (userData) {
        userData.Token = "";
        await expect(
          AppDataSource.manager.update(
            User,
            { UserName: `${username}` },
            userData
          )
        ).resolves.toBeTruthy();
      }
    });
    test("Error signing out user", async () => {
      const userRepository = AppDataSource.getRepository(User);
      const userData = await userRepository.findOne({
        where: { UserName: `${username}` },
      });
      if (userData) {
        userData.Token = "";
        await expect(
          AppDataSource.manager.update(
            User,
            { UserName: `${username}` },
            userData
          )
        ).rejects.toBeInstanceOf(Error);
      }
    });
  });
  afterAll(async () => {
    // await AppDataSource.manager.delete(User, { UserName: "Test" });
    await AppDataSource.destroy()
      .then(() => {
        console.log("Data Source has been destroyed");
      })
      .catch((error) => console.log(error));
  }, 10000);
});
