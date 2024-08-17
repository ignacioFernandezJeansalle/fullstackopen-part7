import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { updateBlog, deleteBlog, addComment } from "../reducers/blogsReducer";
import { useAuthorizedUser } from "../hooks";
import { Header, Label, Icon, Button, Form, FormField, Input, List, ListItem } from "semantic-ui-react";

const BlogById = ({ blog }) => {
  const dispatch = useDispatch();
  const { authorizedUser } = useAuthorizedUser();
  const [comment, setComment] = useState("");
  const navigate = useNavigate();

  if (!blog || !authorizedUser) return null;

  const { title, author, url, likes, user, comments } = blog;

  const addLike = () => dispatch(updateBlog({ ...blog, likes: blog.likes + 1 }, authorizedUser.token));

  const remove = () => {
    dispatch(deleteBlog(blog, authorizedUser.token));
    navigate("/");
  };

  const submitComment = (event) => {
    event.preventDefault();
    dispatch(addComment(blog.id, comment));
    setComment("");
  };

  return (
    <section>
      <Header as="h2">
        {title} by {author}
      </Header>
      <a href={url} target="_blank" rel="noreferrer">
        {url}
      </a>
      <div>
        <Label>
          {likes} <Icon name="heart" />
        </Label>
        <Button onClick={addLike}>Like</Button>
      </div>
      <p>Added by {user.name}</p>
      {blog.user.id === authorizedUser.id && (
        <button
          onClick={remove}
          className="ui button"
          style={{
            background: "#c00",
            color: "#fff",
          }}
        >
          <Icon name="trash" />
          Remove
        </button>
      )}

      <Header as="h3">Comments</Header>

      <Form onSubmit={submitComment}>
        <FormField>
          <Input
            size="small"
            label="Comment"
            type="text"
            value={comment}
            onChange={({ target }) => setComment(target.value)}
          />
        </FormField>
        <Button type="submit">Add comment</Button>
      </Form>

      <List celled>
        {comments.map((comment) => (
          <ListItem key={comment.id}>{comment.content}</ListItem>
        ))}
      </List>
    </section>
  );
};

export default BlogById;
