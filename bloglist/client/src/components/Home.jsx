import { useSelector } from "react-redux";
import { useAuthorizedUser } from "../hooks";
import FormBlog from "./FormBlog";
import BlogList from "./BlogList";

const Home = () => {
  const { authorizedUser } = useAuthorizedUser();
  const blogs = useSelector(({ blogs }) => blogs);

  if (!authorizedUser) return null;

  return (
    <>
      <FormBlog />
      <BlogList blogs={blogs} />
    </>
  );
};

export default Home;
