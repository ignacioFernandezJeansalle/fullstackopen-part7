import PropTypes from "prop-types";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteBlog, updateBlog } from "../reducers/blogsReducer";

import "./Blog.css";

const Blog = ({ blog }) => {
  const dispatch = useDispatch();
  const authorizedUser = useSelector(({ userAuthorization }) => userAuthorization);
  const [visible, setVisible] = useState(false);

  const remove = () => dispatch(deleteBlog(blog, authorizedUser.token));

  const addLike = () => dispatch(updateBlog({ ...blog, likes: blog.likes + 1 }, authorizedUser.token));

  return (
    <li className="bloglist-item">
      <div className="title">
        <p>
          <b>{blog.title.toUpperCase()}</b> - {blog.author}
        </p>
        <button onClick={() => setVisible(!visible)} data-testid="view-button">
          {visible ? "Hide" : "View"}
        </button>
      </div>

      {visible && (
        <div className="content">
          <p>
            <i>link:</i> {blog.url}
          </p>
          <span>
            <p>
              <i>likes:</i> {blog.likes}
            </p>
            <button onClick={addLike} data-testid="like-button">
              Like
            </button>
          </span>
          <p>
            <i>user:</i> {blog.user.name}
          </p>

          {blog.user.id === authorizedUser.id && (
            <button onClick={remove} className="remove" data-testid="remove-button">
              Remove
            </button>
          )}
        </div>
      )}
    </li>
  );
};

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
};

export default Blog;
