import { Saga, runSaga, stdChannel } from "redux-saga";
import { studentSaga, watchAddNewStudent } from "../redux/student/saga"; // Replace with your actual file path
import {
  fetchStudents,
  addStudent,
  discardStudent,
  setStudents,
} from "../redux/student/slice";
import userReducer, { initialState } from "../redux/student/slice"; // Adjust the import based on your actual file path

afterEach(() => {
  jest.clearAllMocks();
});

describe("userSaga", () => {
  it("should watch for fetchStudents, addStudent, and discardStudent actions", () => {
    const dispatched: any[] = [];
    const mockUser = { id: 1, name: "John Doe" };
    const channel = stdChannel();

    runSaga(
      {
        dispatch: (action) => dispatched.push(action),
        channel,
      },
      studentSaga
    );

    channel.put(fetchStudents());
    channel.put(addStudent({ id: 1, name: "John Doe" }));
    channel.put(discardStudent(1));
  });

  it("should handle addStudent action for new user", async () => {
    const dispatched: any[] = [];
    const mockUser = { id: 1, name: "John Doe", isNew: true };
    const addStudentsAsyncMock = jest.fn(() => mockUser);

    await runSaga(
      {
        dispatch: (action) => dispatched.push(action),
      },
      watchAddNewStudent as Saga, // Update the type of watchAddNewStudent
      { payload: mockUser },
      addStudentsAsyncMock
    ).toPromise();
  });
});

// userReducer tests
// discardStudent
describe("userReducer", () => {
  it("should handle discardStudent action", () => {
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
      discardStudent(userIdToDiscard)
    );

    // Expectations
    expect(newState.rows).toHaveLength(initialStateWithUsers.rows.length - 1);
    expect(
      newState.rows.some((user) => user.id === userIdToDiscard)
    ).toBeFalsy();
  });

  //setStudents

  it("should handle setStudents action", () => {
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

    const newState = userReducer(initialStateWithUsers, setStudents(newUsers));

    // Expectations
    expect(newState.rows).toHaveLength(newUsers.length);
  });
});
