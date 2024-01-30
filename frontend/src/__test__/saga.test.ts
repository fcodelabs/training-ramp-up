import { fetchUsersAsync } from "../utilities/studentServices";
import { Saga, runSaga, stdChannel } from "redux-saga";
import { userSaga, watchAddNewUser } from "../redux/student/saga"; // Replace with your actual file path
import {
  fetchUsers,
  addUser,
  discardUser,
  setUsers,
} from "../redux/student/slice";
import userReducer, { initialState } from "../redux/student/slice"; // Adjust the import based on your actual file path

afterEach(() => {
  jest.clearAllMocks();
});

describe("userSaga", () => {
  it("should watch for fetchUsers, addUser, and discardUser actions", () => {
    const dispatched: any[] = [];
    const mockUser = { id: 1, name: "John Doe" };
    const channel = stdChannel();

    runSaga(
      {
        dispatch: (action) => dispatched.push(action),
        channel,
      },
      userSaga
    );

    channel.put(fetchUsers());
    channel.put(addUser({ id: 1, name: "John Doe" }));
    channel.put(discardUser(1));
  });

  it("should handle addUser action for new user", async () => {
    const dispatched: any[] = [];
    const mockUser = { id: 1, name: "John Doe", isNew: true };
    const addUsersAsyncMock = jest.fn(() => mockUser);

    await runSaga(
      {
        dispatch: (action) => dispatched.push(action),
      },
      watchAddNewUser as Saga, // Update the type of watchAddNewUser
      { payload: mockUser },
      addUsersAsyncMock
    ).toPromise();
  });
});

// userReducer tests
// discardUser
describe("userReducer", () => {
  it("should handle discardUser action", () => {
    const initialStateWithUsers = {
      ...initialState,
      rows: [
        {
          id: 1,
          name: "John Doe",
          gender: "Male",
          address: "123 Main St",
          mobile: "123-456-7890",
          birthday: "1990-01-01",
          age: "32",
          action: "",
          error: false,
        },
        // ... other user entries
      ],
    };

    const userIdToDiscard = 1;

    const newState = userReducer(
      initialStateWithUsers,
      discardUser(userIdToDiscard)
    );

    // Expectations
    expect(newState.rows).toHaveLength(initialStateWithUsers.rows.length - 1);
    expect(
      newState.rows.some((user) => user.id === userIdToDiscard)
    ).toBeFalsy();
  });

  //setUsers

  it("should handle setUsers action", () => {
    const initialStateWithUsers = {
      ...initialState,
      rows: [
        {
          id: 1,
          name: "John Doe",
          gender: "Male",
          address: "123 Main St",
          mobile: "123-456-7890",
          birthday: "1990-01-01",
          age: "32",
          action: "",
          error: false,
        },
      ],
    };

    const newUsers = [
      {
        id: 1,
        name: "John Doe",
        gender: "Male",
        address: "123 Main St",
        mobile: "123-456-7890",
        birthday: "1990-01-01",
        age: "32",
        action: "",
        error: false,
      },
      {
        id: 2,
        name: "John Doe",
        gender: "Male",
        address: "123 Main St",
        mobile: "123-456-7890",
        birthday: "1990-01-01",
        age: "32",
        action: "",
        error: false,
      },
    ];

    const newState = userReducer(initialStateWithUsers, setUsers(newUsers));

    // Expectations
    expect(newState.rows).toHaveLength(newUsers.length);
  });
});
