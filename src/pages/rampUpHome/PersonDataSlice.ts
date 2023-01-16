import { Person } from '../../helpers/interface'
import { createSlice } from '@reduxjs/toolkit'

const temp: Person[] = []

const personSlice = createSlice({
  name: 'personData',
  initialState: {
    person: temp,
    isFetching: false,
    error: false,
  },
  reducers: {
    getPersonDataStart: (state) => {
      state.isFetching = true
    },
    getPersonDataSuccess: (state, action) => {
      state.isFetching = false
      state.person = action.payload
      state.error = false
    },
    getPersonDataFailure: (state) => {
      state.isFetching = false
      state.error = true
    },
    addPersonDataStart: (state, action) => {
      state.isFetching = true
    },
    addPersonDataSuccess: (state, action) => {
      state.isFetching = false
      state.error = false
      // console.log(action.payload);
      state.person.push(action.payload)
    },
    addPersonDataFailure: (state) => {
      state.isFetching = false
      state.error = true
    },
  },
})

export const {
  getPersonDataStart,
  getPersonDataSuccess,
  getPersonDataFailure,
  addPersonDataStart,
  addPersonDataFailure,
  addPersonDataSuccess,
} = personSlice.actions
export default personSlice.reducer
