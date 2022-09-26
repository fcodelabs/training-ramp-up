import { createSlice } from "@reduxjs/toolkit";

const studentSlice = createSlice({
  name: "student",
  initialState: {
    id: "",
    name: "",
    gender: "",
    address: "",
    mobileNo: "",
    birth: "",
    age: "",
  },

  reducers: {
    saveStudent(state, action) {
      console.log("payload", action.payload);
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
  },
});

export default studentSlice;
