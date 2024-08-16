import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateBlog, deleteBlog, addComment } from "../reducers/blogsReducer";

const BlogById = ({ blog }) => {
  const dispatch = useDispatch();
  const authorizedUser = useSelector(({ userAuthorization }) => userAuthorization);
  const [comment, setComment] = useState("");

  if (!blog) return null;

  const { title, author, url, likes, user, comments } = blog;

  const addLike = () => dispatch(updateBlog({ ...blog, likes: blog.likes + 1 }, authorizedUser.token));

  const remove = () => dispatch(deleteBlog(blog, authorizedUser.token));

  const submitComment = (event) => {
    event.preventDefault();
    dispatch(addComment(blog.id, comment));
    setComment("");
  };

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
      <h3>Comments</h3>
      <form onSubmit={submitComment}>
        <input type="text" value={comment} onChange={({ target }) => setComment(target.value)} />
        <button type="submit">Add comment</button>
      </form>
      <ul>
        {comments.map((comment) => (
          <li key={comment.id}>{comment.content}</li>
        ))}
      </ul>
    </section>
  );
};

export default BlogById;
