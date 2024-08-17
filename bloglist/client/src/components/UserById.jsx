import { useAuthorizedUser } from "../hooks";
import { Header, List, ListItem } from "semantic-ui-react";

const UserById = ({ data }) => {
  const { authorizedUser } = useAuthorizedUser();

  if (!authorizedUser || !data) return null;

  const { name, blogs } = data;

  return (
    <section>
      <Header as="h2">{name}</Header>
      <Header as="h3">Added blogs</Header>
      <List celled>
        {blogs.map((blog) => (
          <ListItem key={blog.id}>{blog.title}</ListItem>
        ))}
      </List>
    </section>
  );
};

export default UserById;
