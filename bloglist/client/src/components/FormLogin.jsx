import { useState } from "react";
import { useDispatch } from "react-redux";
import { loginUser } from "../reducers/userAuthorizationReducer";

import { Header, Form, FormField, Input, Button } from "semantic-ui-react";

const FormLogin = () => {
  const dispatch = useDispatch();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const onSubmit = (event) => {
    event.preventDefault();
    dispatch(loginUser(username, password));
    setUsername("");
    setPassword("");
  };

  return (
    <section style={{ maxWidth: 400, marginLeft: 32 }}>
      <Header as="h2">Login</Header>
      <Form onSubmit={onSubmit}>
        <FormField>
          <Input
            size="small"
            type="text"
            label="Username"
            value={username}
            onChange={({ target }) => setUsername(target.value)}
          />
        </FormField>
        <FormField>
          <Input
            size="small"
            type="password"
            label="Password"
            value={password}
            onChange={({ target }) => setPassword(target.value)}
          />
        </FormField>
        <Button type="submit">Login</Button>
      </Form>
    </section>
  );
};

export default FormLogin;
