import { createSlice } from "@reduxjs/toolkit";
import loginServices from "../services/login";
import { setNotificationWithTime } from "./notificationReducer";

const userAuthorization = createSlice({
  name: "userAuthorization",
  initialState: null,
  reducers: {
    setAuthorizedUser: (state, action) => action.payload,
    clearAuthorizedUser: () => null,
  },
});

export const { setAuthorizedUser, clearAuthorizedUser } = userAuthorization.actions;
export default userAuthorization.reducer;

export const initializeAuthorizedUser = () => {
  return (dispatch) => {
    const loggedUserJSON = window.localStorage.getItem("loggedBlogsAppUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      dispatch(setAuthorizedUser(user));
    }
  };
};

export const loginUser = (username, password) => {
  return async (dispatch) => {
    try {
      const user = await loginServices.login({ username, password });
      window.localStorage.setItem("loggedBlogsAppUser", JSON.stringify(user));
      dispatch(setAuthorizedUser(user));
    } catch (error) {
      dispatch(setNotificationWithTime("Wrong credentials", true, 5000));
    }
  };
};

export const logoutAuthorizedUser = () => {
  return (dispatch) => {
    window.localStorage.removeItem("loggedBlogsAppUser");
    dispatch(clearAuthorizedUser());
  };
};

/* authorizedUser */
