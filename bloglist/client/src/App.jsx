import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { initializeBlogs } from "./reducers/blogsReducer";
import { initializeAuthorizedUser } from "./reducers/userAuthorizationReducer";
import { Routes, Route, useMatch } from "react-router-dom";
import { useAuthorizedUser } from "./hooks";

import Navbar from "./components/Navbar";
import FormLogin from "./components/FormLogin";
import Home from "./components/Home";
import Users from "./components/Users";
import UserById from "./components/UserById";
import BlogById from "./components/BlogById";
import Notification from "./components/Notification";

import { Container, Header } from "semantic-ui-react";

const App = () => {
  const dispatch = useDispatch();
  const blogs = useSelector(({ blogs }) => blogs);
  const { authorizedUser } = useAuthorizedUser();
  const users = useSelector(({ users }) => users);

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
      <header style={{ marginBottom: 16 }}>
        <Header as="h1" block attached="top">
          Blogs app
        </Header>
        {authorizedUser !== null && <Navbar />}
      </header>

      <main>
        <Container>
          {authorizedUser === null && <FormLogin />}

          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/users" element={<Users />} />
            <Route path="/users/:id" element={<UserById data={userDetails} />} />
            <Route path="/blogs/:id" element={<BlogById blog={blogDetails} />} />
          </Routes>

          <Notification />
        </Container>
      </main>
    </>
  );
};

export default App;
