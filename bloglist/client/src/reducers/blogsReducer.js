import { createSlice } from "@reduxjs/toolkit";
import blogsServices from "../services/blogs";
import { setNotificationWithTime } from "./notificationReducer";

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
    try {
      const addedBlog = await blogsServices.create(blog, token);
      dispatch(appendBlog(addedBlog));
      dispatch(setNotificationWithTime(`A new blog: ${addedBlog.title} by ${addedBlog.author}`, false, 5000));
    } catch (error) {
      dispatch(setNotificationWithTime("Error create new blog", true, 5000));
    }
  };
};

export const updateBlog = (blog, token) => {
  return async (dispatch) => {
    try {
      const updatedBlog = await blogsServices.update(blog, token);
      dispatch(modifyBlog(updatedBlog));
    } catch (error) {
      dispatch(setNotificationWithTime("Error update likes", true, 5000));
    }
  };
};

export const deleteBlog = (blog, token) => {
  return async (dispatch) => {
    if (!window.confirm(`Do you really want to remove ${blog.title} by ${blog.author}?`)) return;

    try {
      const removedBlog = await blogsServices.remove(blog.id, token);
      dispatch(removeBlog(removedBlog));
      dispatch(
        setNotificationWithTime(`The blog ${removedBlog.title} by ${removedBlog.author} has been deleted`, false, 5000)
      );
    } catch (error) {
      dispatch(setNotificationWithTime("Error delete blog", true, 5000));
    }
  };
};

export const addComment = (id, content) => {
  return async (dispatch) => {
    try {
      const updatedBlog = await blogsServices.comment(id, content);
      dispatch(modifyBlog(updatedBlog));
    } catch (error) {
      dispatch(setNotificationWithTime("Error update comments", true, 5000));
    }
  };
};
