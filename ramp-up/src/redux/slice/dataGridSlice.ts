import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface DataGridState {
  rows: any[]
  rowModesModel: Record<string, any>
}

const initialState: DataGridState = {
  rows: [],
  rowModesModel: {},
}

const dataGridSlice = createSlice({
  name: 'dataGrid',
  initialState,
  reducers: {
    setRows: (state, action: PayloadAction<any[]>) => {
      state.rows = action.payload
    },
    setRowModesModel: (state, action: PayloadAction<Record<string, any>>) => {
      state.rowModesModel = action.payload
    },
  },
})

export const { setRows, setRowModesModel } = dataGridSlice.actions
export default dataGridSlice.reducer
