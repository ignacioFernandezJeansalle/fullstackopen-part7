import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { initializeBlogs } from "./reducers/blogsReducer";
import { initializeAuthorizedUser } from "./reducers/userAuthorizationReducer";
import { Routes, Route, useMatch } from "react-router-dom";

import "./App.css";

import Navbar from "./components/Navbar";
import FormLogin from "./components/FormLogin";
import FormBlog from "./components/FormBlog";
import Togglable from "./components/Togglable";
import BlogList from "./components/BlogList";
import Users from "./components/Users";
import UserById from "./components/UserById";
import BlogById from "./components/BlogById";
import Notification from "./components/Notification";

const App = () => {
  const dispatch = useDispatch();
  const blogs = useSelector(({ blogs }) => blogs);
  const authorizedUser = useSelector(({ userAuthorization }) => userAuthorization);
  const users = useSelector(({ users }) => users);
  const formBlogRef = useRef();

  const matchUsersById = useMatch("/users/:id");
  const userDetails = matchUsersById ? users.find((u) => u.id === matchUsersById.params.id) : null;

  const matchBlogsById = useMatch("/blogs/:id");
  const blogDetails = matchBlogsById ? blogs.find((b) => b.id === matchBlogsById.params.id) : null;

  useEffect(() => {
    dispatch(initializeAuthorizedUser());
    dispatch(initializeBlogs());
  }, []);

  return (
    <>
      <header>
        <h1>Blogs app</h1>

        {authorizedUser === null ? <FormLogin /> : <Navbar name={authorizedUser.name} />}
      </header>

      <main>
        <Routes>
          <Route
            path="/"
            element={
              authorizedUser && (
                <>
                  <Togglable buttonLabel="Create new blog" ref={formBlogRef}>
                    <FormBlog hide={() => formBlogRef.current.toggleVisibility()} />
                  </Togglable>

                  <BlogList blogs={blogs} />
                </>
              )
            }
          />
          <Route path="/users" element={<Users />} />
          <Route path="/users/:id" element={<UserById data={userDetails} />} />
          <Route path="/blogs/:id" element={<BlogById blog={blogDetails} />} />
        </Routes>

        <Notification />
      </main>
    </>
  );
};

export default App;
