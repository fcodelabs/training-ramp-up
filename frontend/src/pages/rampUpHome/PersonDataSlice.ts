import { Person } from '../../models/interface'
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
    getPersonDataStart: (state, action) => {
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
      action.payload.inEdit = false
      state.person.push(action.payload)
    },
    addPersonDataFailure: (state) => {
      state.isFetching = false
      state.error = true
    },
    updatePersonDataStart: (state, action) => {
      state.isFetching = true
    },
    updatePersonDataSuccess: (state, action) => {
      action.payload.inEdit = false
      state.isFetching = false
      state.error = false
      state.person[state.person.findIndex((item) => item.PersonID === action.payload.PersonID)] =
        action.payload
    },
    updatePersonDataFailure: (state) => {
      state.isFetching = false
      state.error = true
    },
    deletePersonDataStart: (state, action) => {
      state.isFetching = true
    },
    deletePersonDataSuccess: (state, action) => {
      state.isFetching = false
      state.error = false
      state.person.splice(
        state.person.findIndex((item) => item.PersonID === action.payload),
        1,
      )
    },
    deletePersonDataFailure: (state) => {
      state.isFetching = false
      state.error = true
    },
    clearPersonData: (state) => {
      state.person = temp
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
  updatePersonDataStart,
  updatePersonDataFailure,
  updatePersonDataSuccess,
  deletePersonDataStart,
  deletePersonDataFailure,
  deletePersonDataSuccess,
  clearPersonData,
} = personSlice.actions
export default personSlice.reducer
