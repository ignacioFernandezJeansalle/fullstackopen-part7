import { createSlice } from "@reduxjs/toolkit";
import blogsServices from "../services/blogs";

const blogSlice = createSlice({
  name: "blogs",
  initialState: [],
  reducers: {
    setBlogs: (state, action) => action.payload,
    appendBlog: (state, action) => state.concat(action.payload),
  },
});

export const { setBlogs, appendBlog } = blogSlice.actions;
export default blogSlice.reducer;

export const initializeBlogs = () => {
  return async (dispatch) => {
    const blogs = await blogsServices.getAll();
    dispatch(setBlogs(blogs));
  };
};

export const createBlog = (blog, token) => {
  return async (dispatch) => {
    const addedBlog = await blogsServices.create(blog, token);
    dispatch(appendBlog(addedBlog));
  };
};
