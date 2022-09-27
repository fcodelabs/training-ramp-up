import { createSlice } from "@reduxjs/toolkit";

const studentSlice = createSlice({
  name: "student",
  initialState: {
    student: [],
  },

  reducers: {
    saveStudent(state, action) {
      console.log("payload", action.payload);
      state.student = action.payload;

      //   state.id = action.payload.id;
      //   state.name = action.payload.name;
      //   state.gender = action.payload.gender;
      //   state.address = action.payload.address;
      //   state.mobileNo = action.payload.mobileNo;
      //   state.age = action.payload.age;
      //   state.birth = action.payload.birth;

      //state.token = action.payload;
      console.log("SliceToken", state.name);
      //   console.log("SliceName", state.token.name);
    },
    createStudent() {},
    deleteStudent() {},
    updateStudent() {},
    getStudents() {},
  },
});

export default studentSlice;
