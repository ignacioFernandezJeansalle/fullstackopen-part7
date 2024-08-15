import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const Blog = ({ blog }) => {
  return (
    <li
      style={{
        marginTop: "6px",
        padding: "6px",
        border: "1px solid #ccc",
      }}
    >
      <Link to={`/blogs/${blog.id}`}>
        <b>{blog.title.toUpperCase()}</b> - {blog.author}
      </Link>
    </li>
  );
};

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
};

export default Blog;
