import { useState } from "react";
import { useDispatch } from "react-redux";
import { loginUser } from "../reducers/userReducer";

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
    <form onSubmit={onSubmit}>
      <h2>Login</h2>
      <div>
        <label htmlFor="login-username">Username: </label>
        <input
          data-testid="username"
          id="login-username"
          type="text"
          value={username}
          name="username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        <label htmlFor="login-password">Password: </label>
        <input
          data-testid="password"
          id="login-password"
          type="password"
          value={password}
          name="password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button type="submit">Login</button>
    </form>
  );
};

export default FormLogin;
