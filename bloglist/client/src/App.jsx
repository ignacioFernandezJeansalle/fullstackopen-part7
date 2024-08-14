import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { initializeBlogs } from "./reducers/blogsReducer";
import { initializeUser, logoutUser } from "./reducers/userReducer";
import { Routes, Route, useMatch } from "react-router-dom";

import "./App.css";

import FormLogin from "./components/FormLogin";
import FormBlog from "./components/FormBlog";
import Togglable from "./components/Togglable";
import Blog from "./components/Blog";
import Users from "./components/Users";
import BlogsByUser from "./components/BlogsByUser";
import Notification from "./components/Notification";

const App = () => {
  const dispatch = useDispatch();
  const blogs = useSelector(({ blogs }) => blogs);
  const user = useSelector(({ user }) => user);
  const users = useSelector(({ users }) => users);
  const formBlogRef = useRef();

  const match = useMatch("/users/:id");
  const userDetails = match ? users.find((u) => u.id === match.params.id) : null;

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
        {user === null ? (
          <FormLogin />
        ) : (
          <section className="user-info">
            <h2>{user.name}</h2>
            <button onClick={() => dispatch(logoutUser())}>Logout</button>
          </section>
        )}

        <Routes>
          <Route
            path="/"
            element={
              user && (
                <>
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
              )
            }
          />
          <Route path="/users" element={<Users />} />
          <Route path="/users/:id" element={<BlogsByUser data={userDetails} />} />
        </Routes>

        <Notification />
      </main>
    </>
  );
};

export default App;
