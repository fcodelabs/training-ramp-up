import { User } from "../src/models/User";
import { AppDataSource } from "../src/configs/DataSourceConfig";
import * as userService from "../src/services/userServices";

describe("User Service test", () => {
  const user = {
    Email: "test@gmail.com",
    Password: "$2b$10$HCTEVvYzhtaeqmPpS3h0MuuxvVtGnSSiB4bL0TuZrhGOeofioXZ9G",
  } as unknown as User;
  const user2 = {
    Email: "test@gmail.com",
  } as unknown as User;
  const createUser = {
    UserId: 1,
    Email: "test@gmail.com",
    Password: "$2b$10$HCTEVvYzhtaeqmPpS3h0MuuxvVtGnSSiB4bL0TuZrhGOeofioXZ9G",
    Role: "test",
  } as unknown as User;
  describe("Create user service test", () => {
    it("test create user", async () => {
      const spyAppDataSource = jest.spyOn(AppDataSource.manager, "save");
      spyAppDataSource.mockResolvedValue(createUser);
      try {
        const result = await userService.registerUserService(user);
      } catch (e) {
        expect(e).toEqual(new Error("Error in creating user"));
      }
      spyAppDataSource.mockRestore();
    });
  });
});
