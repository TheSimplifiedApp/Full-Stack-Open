import { createSlice } from "@reduxjs/toolkit";

const initialState = ''

const filter = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    createFilter(state, action) {
      return state = action.payload
    }
  }
})

export const { createFilter } = filter.actions
export default filter.reducer