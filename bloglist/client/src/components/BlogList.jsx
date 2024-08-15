import PropTypes from "prop-types";
import BlogListItem from "./BlogListItem";

const BlogList = ({ blogs }) => {
  return (
    <section className="list-of-blogs">
      <h2>Blogs</h2>
      <ul>
        {blogs
          .toSorted((a, b) => b.likes - a.likes)
          .map((blog) => (
            <BlogListItem key={blog.id} blog={blog} />
          ))}
      </ul>
    </section>
  );
};

BlogList.propTypes = {
  blogs: PropTypes.array.isRequired,
};

export default BlogList;
