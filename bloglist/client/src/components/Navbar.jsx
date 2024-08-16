import { useDispatch } from "react-redux";
import { logoutAuthorizedUser } from "../reducers/userAuthorizationReducer";
import { MenuMenu, MenuItem, Menu, Button, Header } from "semantic-ui-react";
import { Link } from "react-router-dom";
import { useAuthorizedUser } from "../hooks";
import { useState } from "react";

const Navbar = () => {
  const [activeItem, setActiveItem] = useState("blogs");
  const dispatch = useDispatch();
  const { authorizedUser } = useAuthorizedUser();

  if (!authorizedUser) return null;

  return (
    <nav>
      <Menu pointing secondary>
        <Link to="/" className={`item ${activeItem === "blogs" && "active"}`} onClick={() => setActiveItem("blogs")}>
          Blogs
        </Link>
        <Link
          to="/users"
          className={`item ${activeItem === "users" && "active"}`}
          onClick={() => setActiveItem("users")}
        >
          Users
        </Link>
        <MenuMenu position="right">
          <p className="item">{authorizedUser.name}</p>
          <MenuItem>
            <Button onClick={() => dispatch(logoutAuthorizedUser())}>Logout</Button>
          </MenuItem>
        </MenuMenu>
      </Menu>
    </nav>
  );
};

export default Navbar;
