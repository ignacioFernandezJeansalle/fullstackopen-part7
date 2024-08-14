import { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setNotificationWithTime } from "./reducers/notificationReducer";
import { initializeBlogs, createBlog } from "./reducers/blogsReducer";

import "./App.css";

import blogService from "./services/blogs";
import loginService from "./services/login";
import FormLogin from "./components/FormLogin";
import FormBlog from "./components/FormBlog";
import Togglable from "./components/Togglable";
import Blog from "./components/Blog";
import Notification from "./components/Notification";

const App = () => {
  const dispatch = useDispatch();
  const blogsRedux = useSelector(({ blogs }) => blogs);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);
  const [blogs, setBlogs] = useState([]);
  const formBlogRef = useRef();

  useEffect(() => {
    dispatch(initializeBlogs());
  }, []);

  useEffect(() => {
    setBlogs(blogsRedux);
  }, [blogsRedux]);

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

  const removeBlog = async (id, title, author) => {
    if (!window.confirm(`Do you really want to remove ${title} by ${author}?`)) return;

    try {
      const removedBlog = await blogService.remove(id, user.token);
      dispatch(
        setNotificationWithTime(`The blog ${removedBlog.title} by ${removedBlog.author} has been deleted`, false, 5000)
      );
      const newBlogs = blogs.filter((blog) => blog.id !== removedBlog.id);
      setBlogs(newBlogs);
    } catch (error) {
      console.log(error);
      dispatch(setNotificationWithTime("Error delete blog", true, 5000));
    }
  };

  const addLike = async (id, currentLikes) => {
    try {
      const likes = { likes: currentLikes + 1 };
      const updatedBlog = await blogService.updateLikes(id, likes, user.token);

      const newBlogs = blogs.map((blog) => {
        if (blog.id === updatedBlog.id) {
          return updatedBlog;
        }

        return blog;
      });

      setBlogs(newBlogs);
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
