import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { initializeBlogs } from "./reducers/blogsReducer";
import { initializeAuthorizedUser, logoutAuthorizedUser } from "./reducers/userAuthorizationReducer";
import { Routes, Route, useMatch } from "react-router-dom";

import "./App.css";

import FormLogin from "./components/FormLogin";
import FormBlog from "./components/FormBlog";
import Togglable from "./components/Togglable";
import Blog from "./components/Blog";
import Users from "./components/Users";
import UserById from "./components/UserById";
import Notification from "./components/Notification";

const App = () => {
  const dispatch = useDispatch();
  const blogs = useSelector(({ blogs }) => blogs);
  const authorizedUser = useSelector(({ userAuthorization }) => userAuthorization);
  const users = useSelector(({ users }) => users);
  const formBlogRef = useRef();

  const match = useMatch("/users/:id");
  const userDetails = match ? users.find((u) => u.id === match.params.id) : null;

  useEffect(() => {
    dispatch(initializeAuthorizedUser());
    dispatch(initializeBlogs());
  }, []);

  return (
    <>
      <header>
        <h1>Blogs app</h1>
      </header>

      <main>
        {authorizedUser === null ? (
          <FormLogin />
        ) : (
          <section className="user-info">
            <h2>{authorizedUser.name}</h2>
            <button onClick={() => dispatch(logoutAuthorizedUser())}>Logout</button>
          </section>
        )}

        <Routes>
          <Route
            path="/"
            element={
              authorizedUser && (
                <>
                  <Togglable buttonLabel="Create new blog" ref={formBlogRef}>
                    <FormBlog hide={() => formBlogRef.current.toggleVisibility()} />
                  </Togglable>

                  <section className="list-of-blogs">
                    <h2>Blogs</h2>
                    <ul>
                      {blogs
                        .toSorted((a, b) => b.likes - a.likes)
                        .map((blog) => (
                          <Blog key={blog.id} blog={blog} />
                        ))}
                    </ul>
                  </section>
                </>
              )
            }
          />
          <Route path="/users" element={<Users />} />
          <Route path="/users/:id" element={<UserById data={userDetails} />} />
        </Routes>

        <Notification />
      </main>
    </>
  );
};

export default App;
