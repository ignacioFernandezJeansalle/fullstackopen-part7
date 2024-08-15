import { useDispatch, useSelector } from "react-redux";
import { updateBlog, deleteBlog } from "../reducers/blogsReducer";

const BlogById = ({ blog }) => {
  const dispatch = useDispatch();
  const authorizedUser = useSelector(({ userAuthorization }) => userAuthorization);

  if (!blog) return null;

  const { title, author, url, likes, user } = blog;

  const addLike = () => dispatch(updateBlog({ ...blog, likes: blog.likes + 1 }, authorizedUser.token));

  const remove = () => dispatch(deleteBlog(blog, authorizedUser.token));

  return (
    <section>
      <h2>
        {title} by {author}
      </h2>
      <a href={url} target="_blank" rel="noreferrer">
        {url}
      </a>
      <p>{likes} likes</p>
      <button onClick={addLike}>Like</button>
      <p>Added by {user.name}</p>
      {blog.user.id === authorizedUser.id && (
        <button
          onClick={remove}
          style={{
            marginTop: "12px",
            padding: "2px 4px",
            background: "#c00",
            border: "1px solid #800",
            color: "#fff",
          }}
        >
          Remove
        </button>
      )}
    </section>
  );
};

export default BlogById;
