import PropTypes from "prop-types";
import { Header, List, ListItem, ListIcon, ListContent } from "semantic-ui-react";
import { Link } from "react-router-dom";

const BlogList = ({ blogs }) => {
  return (
    <section>
      <Header as="h2">Blogs</Header>
      <List>
        {blogs
          .toSorted((a, b) => b.likes - a.likes)
          .map((blog) => (
            <ListItem key={blog.id}>
              <ListIcon name="check square outline" />
              <ListContent>
                <Link to={`/blogs/${blog.id}`}>
                  <b>{blog.title.toUpperCase()}</b> - {blog.author}
                </Link>
              </ListContent>
            </ListItem>
          ))}
      </List>
    </section>
  );
};

BlogList.propTypes = {
  blogs: PropTypes.array.isRequired,
};

export default BlogList;
