import { createSlice } from "@reduxjs/toolkit";

let timeoutId

const notificationSlice = createSlice({
  name: 'notification',
  initialState: '',
  reducers: {
    setMessage(state, action) {
      return state = action.payload
    }
  }
})

export const { setMessage } = notificationSlice.actions
export const setNotification = (message, time) => {
  return async dispatch => {
    clearTimeout(timeoutId)
    dispatch(setMessage(message))
    timeoutId = setTimeout(() => {
       dispatch(setMessage(''))
    }, time * 1000);
  }
}
export default notificationSlice.reducer