import { runSaga, stdChannel } from "redux-saga";
import { userSaga, watchLogin, watchAddNewUser, watchAuthenticate, watchSignupUser, watchRegisterUser } from "../redux/user/saga";
import {
  login,
  addNewUser,
  authenticate,
  signup,
  register,
  loginSuccess,
  setNewUserVerification,
  registerSuccess,
} from "../redux/user/slice";
import userReducer from "../redux/user/slice";

afterEach(() => {
  jest.clearAllMocks();
});

describe("userSaga", () => {
  it("should handle login, addNewUser, authenticate, signup, and register actions", async () => {
    const dispatched: any[] = [];
    const mockUser = { id: 1, username: "john_doe" };
    const channel = stdChannel();

    runSaga(
      {
        dispatch: (action) => dispatched.push(action),
        channel,
      },
      userSaga
    );

    // Simulate login
    channel.put(login({ username: "john_doe", password: "password123" }));

    // Simulate adding a new user
    channel.put(addNewUser(mockUser));

    // Simulate authenticating a user
    channel.put(authenticate("mockToken"));

    // Simulate signing up a user
    channel.put(signup({ /* your signup data */ }));
    // Add assertions based on your specific requirements for signup

    // Simulate registering a user
    channel.put(register({ /* your register data */ }));

    // Assert the expected dispatched actions
    expect(dispatched).toEqual([
      login({ username: "john_doe", password: "password123" }),
      loginSuccess("mockToken"),
      addNewUser(mockUser),
      setNewUserVerification(true),
      authenticate("mockToken"),
      loginSuccess("mockToken"),
      signup({ /* your signup data */ }),
      register({ /* your register data */ }),
      registerSuccess(),
    ]);
  });
});
