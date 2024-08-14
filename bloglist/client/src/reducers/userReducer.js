import { createSlice } from "@reduxjs/toolkit";
import loginServices from "../services/login";
import { setNotificationWithTime } from "./notificationReducer";

const userSlice = createSlice({
  name: "user",
  initialState: null,
  reducers: {
    set: (state, action) => action.payload,
    clear: () => null,
  },
});

export const { set, clear } = userSlice.actions;
export default userSlice.reducer;

export const initializeUser = () => {
  return (dispatch) => {
    const loggedUserJSON = window.localStorage.getItem("loggedBlogsAppUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      dispatch(set(user));
    }
  };
};

export const loginUser = (username, password) => {
  return async (dispatch) => {
    try {
      const user = await loginServices.login({ username, password });
      window.localStorage.setItem("loggedBlogsAppUser", JSON.stringify(user));
      dispatch(set(user));
    } catch (error) {
      dispatch(setNotificationWithTime("Wrong credentials", true, 5000));
    }
  };
};

export const logoutUser = () => {
  return (dispatch) => {
    window.localStorage.removeItem("loggedBlogsAppUser");
    dispatch(clear());
  };
};
