import { useState } from "react";
import { useDispatch } from "react-redux";
import { createBlog } from "../reducers/blogsReducer";
import { useAuthorizedUser } from "../hooks";

const FormBlog = ({ hide }) => {
  const dispatch = useDispatch();
  const { authorizedUser } = useAuthorizedUser();

  const EMPTY_BLOG = { title: "", author: "", url: "" };
  const KEY_TITLE = "title";
  const KEY_AUTHOR = "author";
  const KEY_URL = "url";

  const [blog, setBlog] = useState(EMPTY_BLOG);

  const handleChangeData = () => {
    const $form = document.getElementById("form-blog");
    const $formData = new FormData($form);

    setBlog({
      title: $formData.get(KEY_TITLE),
      author: $formData.get(KEY_AUTHOR),
      url: $formData.get(KEY_URL),
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    dispatch(createBlog(blog, authorizedUser.token));
    setBlog(EMPTY_BLOG);
    hide();
  };

  return (
    <form id="form-blog" onSubmit={handleSubmit}>
      <h2>Create new blog</h2>
      <div>
        <label htmlFor="blog-title">Title: </label>
        <input
          data-testid="title"
          id="blog-title"
          type="text"
          value={blog.title}
          name={KEY_TITLE}
          onChange={handleChangeData}
        />
      </div>
      <div>
        <label htmlFor="blog-author">Author: </label>
        <input
          data-testid="author"
          id="blog-author"
          type="text"
          value={blog.author}
          name={KEY_AUTHOR}
          onChange={handleChangeData}
        />
      </div>
      <div>
        <label htmlFor="blog-url">url: </label>
        <input
          data-testid="url"
          id="blog-url"
          type="text"
          value={blog.url}
          name={KEY_URL}
          onChange={handleChangeData}
        />
      </div>

      <button type="submit" data-testid="submit-button">
        Create
      </button>
    </form>
  );
};

export default FormBlog;
