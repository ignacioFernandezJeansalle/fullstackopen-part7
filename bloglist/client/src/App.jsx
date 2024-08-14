import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { initializeBlogs } from "./reducers/blogsReducer";
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
              <FormBlog user={user} hide={() => formBlogRef.current.toggleVisibility()} />
            </Togglable>

            <section className="list-of-blogs">
              <h2>Blogs</h2>
              <ul>
                {blogs
                  .toSorted((a, b) => b.likes - a.likes)
                  .map((blog) => (
                    <Blog key={blog.id} blog={blog} user={user} />
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
