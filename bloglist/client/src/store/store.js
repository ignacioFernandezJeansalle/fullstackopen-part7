import { configureStore } from "@reduxjs/toolkit";

import notificationReducer from "../reducers/notificationReducer";
import blogsReducer from "../reducers/blogsReducer";
import userAuthorizationReducer from "../reducers/userAuthorizationReducer";
import usersReducer from "../reducers/usersReducer";

const store = configureStore({
  reducer: {
    notification: notificationReducer,
    blogs: blogsReducer,
    userAuthorization: userAuthorizationReducer,
    users: usersReducer,
  },
});

export default store;
