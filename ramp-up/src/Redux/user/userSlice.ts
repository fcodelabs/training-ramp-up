import { randomCreatedDate } from '@mui/x-data-grid-generator'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

type User = {
    id: number
    uid: number
    name: string
    gender: string
    address: string
    mobile: string
    birthday: Date
    age: number
}

type initialDataType = {
    isLoading: boolean
    rows: User[]
}
const initialState: initialDataType = {
    isLoading: false,
    rows: [
        {
            id: 1,
            uid: 1,
            name: 'UserA',
            gender: 'Male',
            address: '123 Main St, Cityville, Country',
            mobile: '0123456789',
            birthday: randomCreatedDate(),
            age: 25,
        },
        {
            id: 2,
            uid: 2,
            name: 'UserB',
            gender: 'Female',
            address: '456 Oak St, Townsville, Country',
            mobile: '0987654321',
            birthday: randomCreatedDate(),
            age: 30,
        },
        {
            id: 3,
            uid: 3,
            name: 'UserC',
            gender: 'Other',
            address: '789 Pine St, Villageton, Country',
            mobile: '0555123456',
            birthday: randomCreatedDate(),
            age: 22,
        },
    ],
}


const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        fetchUsers: (state) => {
            state.isLoading = false
        },
        fetchUsersFailure: (state) => {
            state.isLoading = true
        },
        addUser: (state, action: PayloadAction<User>) => {
            state.rows.push(action.payload)
        },
        discardUser: (state, action: PayloadAction<number>) => {
            state.rows = state.rows.filter(
                (user) => user.uid !== action.payload
            )
        },
        updateUser: (
            state,
            action: PayloadAction<{ uid: number; updates: Partial<User> }>
        ) => {
            state.rows = state.rows.map((user) =>
                user.uid === action.payload.uid
                    ? { ...user, ...action.payload.updates }
                    : user
            )
        },
    },
})

export const {
    fetchUsers,
    fetchUsersFailure,
    addUser,
    discardUser,
    updateUser,
} = userSlice.actions

export default userSlice.reducer
