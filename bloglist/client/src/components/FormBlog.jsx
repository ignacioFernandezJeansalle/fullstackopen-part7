import { useState } from "react";
import { useDispatch } from "react-redux";
import { createBlog } from "../reducers/blogsReducer";
import { useAuthorizedUser } from "../hooks";

import { Accordion, AccordionTitle, AccordionContent, Icon, Form, FormField, Input, Button } from "semantic-ui-react";

const FormBlog = () => {
  const [active, setActive] = useState(false);
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
    setActive(false);
  };

  return (
    <section style={{ maxWidth: 400, marginBottom: 32 }}>
      <Accordion>
        <AccordionTitle as="h2" active={active} onClick={() => setActive(!active)}>
          <Icon name="dropdown" />
          Create new blog
        </AccordionTitle>
        <AccordionContent active={active}>
          <Form id="form-blog" onSubmit={handleSubmit}>
            <FormField>
              <Input
                size="small"
                label="Title"
                type="text"
                value={blog.title}
                name={KEY_TITLE}
                onChange={handleChangeData}
              />
            </FormField>
            <FormField>
              <Input
                size="small"
                label="Author"
                type="text"
                value={blog.author}
                name={KEY_AUTHOR}
                onChange={handleChangeData}
              />
            </FormField>
            <FormField>
              <Input size="small" label="url" type="text" value={blog.url} name={KEY_URL} onChange={handleChangeData} />
            </FormField>
            <Button type="submit">Create</Button>
          </Form>
        </AccordionContent>
      </Accordion>
    </section>
  );
};

export default FormBlog;
