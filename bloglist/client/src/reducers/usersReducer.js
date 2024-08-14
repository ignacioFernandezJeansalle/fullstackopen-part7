import { createSlice } from "@reduxjs/toolkit";
import usersServices from "../services/users";

const usersSlice = createSlice({
  name: "users",
  initialState: [],
  reducers: {
    set: (state, action) => action.payload,
  },
});

export const { set } = usersSlice.actions;
export default usersSlice.reducer;

export const initializeUsers = () => {
  return async (dispatch) => {
    const users = await usersServices.getAll();
    dispatch(set(users));
  };
};
