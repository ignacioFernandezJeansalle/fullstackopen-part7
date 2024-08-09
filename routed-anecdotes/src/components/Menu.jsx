import { Link } from "react-router-dom";

import "./Menu.css";

const Menu = () => {
  return (
    <nav className="navbar">
      <Link className="link" to="/">
        Anecdotes
      </Link>
      <Link className="link" to="/create">
        Create new
      </Link>
      <Link className="link" to="/about">
        About
      </Link>
    </nav>
  );
};

export default Menu;
