import { createSlice } from "@reduxjs/toolkit";

const notificationSlice = createSlice({
  name: "notification",
  initialState: ["", false],
  reducers: {
    setNotification: (state, action) => action.payload,
    clearNotification: () => ["", false],
  },
});

export const { setNotification, clearNotification } = notificationSlice.actions;
export default notificationSlice.reducer;

export const setNotificationWithTime = (content, error = false, time = 2000) => {
  return (dispatch) => {
    dispatch(setNotification([content, error]));
    setTimeout(() => {
      dispatch(clearNotification());
    }, time);
  };
};
