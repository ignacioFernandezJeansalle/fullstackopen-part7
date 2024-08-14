import { createSlice } from "@reduxjs/toolkit";
import blogsServices from "../services/blogs";

const blogSlice = createSlice({
  name: "blogs",
  initialState: [],
  reducers: {
    setBlogs: (state, action) => action.payload,
    appendBlog: (state, action) => state.concat(action.payload),
    modifyBlog: (state, action) => {
      const modifiedBlog = action.payload;
      return state.map((blog) => (blog.id !== modifiedBlog.id ? blog : modifiedBlog));
    },
    removeBlog: (state, action) => {
      const removedBlog = action.payload;
      return state.filter((blog) => blog.id !== removedBlog.id);
    },
  },
});

export const { setBlogs, appendBlog, modifyBlog, removeBlog } = blogSlice.actions;
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

export const updateBlog = (blog, token) => {
  return async (dispatch) => {
    const updatedBlog = await blogsServices.update(blog, token);
    dispatch(modifyBlog(updatedBlog));
  };
};

export const deleteBlog = (id, token) => {
  return async (dispatch) => {
    const removedBlog = await blogsServices.remove(id, token);
    dispatch(removeBlog(removedBlog));
  };
};
