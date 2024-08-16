import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
import { logoutAuthorizedUser } from "../reducers/userAuthorizationReducer";
import { Link } from "react-router-dom";

const Navbar = ({ name }) => {
  const dispatch = useDispatch();

  return (
    <nav>
      <Link to="/">Blogs</Link>
      <Link to="/users">Users</Link>
      <div>
        <p>{name}</p>
        <button onClick={() => dispatch(logoutAuthorizedUser())}>Logout</button>
      </div>
    </nav>
  );
};

Navbar.propTypes = {
  name: PropTypes.string.isRequired,
};

export default Navbar;
