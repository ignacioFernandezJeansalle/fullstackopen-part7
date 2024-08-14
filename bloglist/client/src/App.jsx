import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setNotificationWithTime } from "./reducers/notificationReducer";
import { initializeBlogs, createBlog, updateBlog, deleteBlog } from "./reducers/blogsReducer";
import { initializeUser, logoutUser } from "./reducers/userReducer";

import "./App.css";

import FormLogin from "./components/FormLogin";
import FormBlog from "./components/FormBlog";
import Togglable from "./components/Togglable";
import Blog from "./components/Blog";
import Notification from "./components/Notification";

const App = () => {
  const dispatch = useDispatch();
  const blogs = useSelector(({ blogs }) => blogs);
  const user = useSelector(({ user }) => user);
  const formBlogRef = useRef();

  useEffect(() => {
    dispatch(initializeUser());
    dispatch(initializeBlogs());
  }, []);

  const addBlog = async (blog) => {
    try {
      dispatch(createBlog(blog, user.token));
      dispatch(setNotificationWithTime(`A new blog: ${blog.title} by ${blog.author}`, false, 5000));
      formBlogRef.current.toggleVisibility();
    } catch (error) {
      console.log(error);
      dispatch(setNotificationWithTime("Error create new blog", true, 5000));
    }
  };

  const removeBlog = async (blog) => {
    if (!window.confirm(`Do you really want to remove ${blog.title} by ${blog.author}?`)) return;

    try {
      dispatch(deleteBlog(blog.id, user.token));
      dispatch(setNotificationWithTime(`The blog ${blog.title} by ${blog.author} has been deleted`, false, 5000));
    } catch (error) {
      console.log(error);
      dispatch(setNotificationWithTime("Error delete blog", true, 5000));
    }
  };

  const addLikeToBlog = async (blog) => {
    try {
      const blogUpdated = { ...blog, likes: blog.likes + 1 };
      dispatch(updateBlog(blogUpdated, user.token));
    } catch (error) {
      console.log(error);
      dispatch(setNotificationWithTime("Error update likes", true, 5000));
    }
  };

  return (
    <>
      <header>
        <h1>Blogs app</h1>
      </header>

      <main>
        <Notification />
        {user === null ? (
          <FormLogin />
        ) : (
          <>
            <section className="user-info">
              <h2>{user.name}</h2>
              <button onClick={() => dispatch(logoutUser())}>Logout</button>
            </section>

            <Togglable buttonLabel="Create new blog" ref={formBlogRef}>
              <FormBlog handleSubmit={addBlog} />
            </Togglable>

            <section className="list-of-blogs">
              <h2>Blogs</h2>
              <ul>
                {blogs
                  .toSorted((a, b) => b.likes - a.likes)
                  .map((blog) => (
                    <Blog key={blog.id} blog={blog} user={user} addLike={addLikeToBlog} remove={removeBlog} />
                  ))}
              </ul>
            </section>
          </>
        )}
      </main>
    </>
  );
};

export default App;
