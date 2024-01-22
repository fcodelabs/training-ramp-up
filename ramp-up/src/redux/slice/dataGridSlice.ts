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
        state.rows = action.payload;
      },
      setRowModesModel: (state, action: PayloadAction<Record<string, any>>) => {
        state.rowModesModel = action.payload;
      },
      addRow: (state, action: PayloadAction<any>) => {
        state.rows = [action.payload, ...state.rows];
      },
      updateRow: (state, action: PayloadAction<any>) => {
        const { id, updatedRow } = action.payload;
        state.rows = state.rows.map((row) => (row.id === id ? updatedRow : row));
      },
      deleteRow: (state, action: PayloadAction<number>) => {
        const idToDelete = action.payload;
        state.rows = state.rows.filter((row) => row.id !== idToDelete);
      },
  },
})

export const { setRows, setRowModesModel,addRow, updateRow, deleteRow } = dataGridSlice.actions
export default dataGridSlice.reducer
