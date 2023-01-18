import { createSlice } from '@reduxjs/toolkit'

const temp: string[] = []

const NoticationSlice = createSlice({
  name: 'notification',
  initialState: {
    notifications: temp,
    isFetching: false,
    error: false,
  },
  reducers: {
    getNotificationStart: (state) => {
      state.isFetching = true
    },
    getNotificationSuccess: (state, action) => {
      state.isFetching = false
      state.notifications.unshift(action.payload)
      state.error = false
    },
    getNotificationFailure: (state) => {
      state.isFetching = false
      state.error = true
    },
    addNotificationStart: (state, action) => {
      state.isFetching = true
    },
    addNotificationSuccess: (state, action) => {
      state.isFetching = false
      state.error = false
      // console.log(action.payload);
      state.notifications.push(action.payload)
    },
    addNotificationFailure: (state) => {
      state.isFetching = false
      state.error = true
    },
    delteNotification: (state) => {
      state.isFetching = false
      state.error = true
      state.notifications.splice(-1, 1)
    },
  },
})

export const {
  getNotificationStart,
  getNotificationSuccess,
  getNotificationFailure,
  addNotificationStart,
  addNotificationFailure,
  addNotificationSuccess,
delteNotification
} = NoticationSlice.actions
export default NoticationSlice.reducer
