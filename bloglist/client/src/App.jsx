import { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setNotificationWithTime } from "./reducers/notificationReducer";
import { initializeBlogs, createBlog, updateBlog, deleteBlog } from "./reducers/blogsReducer";

import "./App.css";

import loginService from "./services/login";
import FormLogin from "./components/FormLogin";
import FormBlog from "./components/FormBlog";
import Togglable from "./components/Togglable";
import Blog from "./components/Blog";
import Notification from "./components/Notification";

const App = () => {
  const dispatch = useDispatch();
  const blogs = useSelector(({ blogs }) => blogs);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);
  const formBlogRef = useRef();

  useEffect(() => {
    dispatch(initializeBlogs());
  }, []);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedBlogsAppUser");
    if (loggedUserJSON) {
      const newUser = JSON.parse(loggedUserJSON);
      setUser(newUser);
    }
  }, []);

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const newUser = await loginService.login({ username, password });
      window.localStorage.setItem("loggedBlogsAppUser", JSON.stringify(newUser));
      setUser(newUser);
      setUsername("");
      setPassword("");
    } catch (error) {
      console.log(error);
      dispatch(setNotificationWithTime("Wrong credentials", true, 5000));
    }
  };

  const handleLogout = () => {
    window.localStorage.removeItem("loggedBlogsAppUser");
    setUser(null);
  };

  const addNewBlog = async (newBlog) => {
    try {
      dispatch(createBlog(newBlog, user.token));
      dispatch(setNotificationWithTime(`A new blog: ${newBlog.title} by ${newBlog.author}`, false, 5000));
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

  const addLike = async (blog) => {
    try {
      const blogUpdated = { ...blog, likes: blog.likes + 1 };
      dispatch(updateBlog(blogUpdated, user.token));
    } catch (error) {
      console.log(error);
      dispatch(setNotificationWithTime("Error update likes", true, 5000));
    }
  };

  const sortBlogsByLikes = (blogs) => {
    const copyOfBlogs = structuredClone(blogs);
    const smallestToLargest = false;

    copyOfBlogs.sort((a, b) => {
      if (a.likes > b.likes) {
        return smallestToLargest ? 1 : -1;
      }
      if (a.likes < b.likes) {
        return smallestToLargest ? -1 : 1;
      }

      return 0;
    });

    return copyOfBlogs;
  };

  return (
    <>
      <header>
        <h1>Blogs app</h1>
      </header>

      <main>
        <Notification />
        {user === null ? (
          <FormLogin
            username={username}
            password={password}
            handleChangeUsername={({ target }) => setUsername(target.value)}
            handleChangePassword={({ target }) => setPassword(target.value)}
            handleSubmit={handleLogin}
          />
        ) : (
          <>
            <section className="user-info">
              <h2>{user.name}</h2>
              <button onClick={handleLogout}>Logout</button>
            </section>

            <Togglable buttonLabel="Create new blog" ref={formBlogRef}>
              <FormBlog handleSubmit={addNewBlog} />
            </Togglable>

            <section className="list-of-blogs">
              <h2>Blogs</h2>
              <ul>
                {sortBlogsByLikes(blogs).map((blog) => (
                  <Blog key={blog.id} blog={blog} user={user} addLike={addLike} remove={removeBlog} />
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
