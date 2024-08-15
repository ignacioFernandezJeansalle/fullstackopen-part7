import { useDispatch, useSelector } from "react-redux";
import { logoutAuthorizedUser } from "../reducers/userAuthorizationReducer";
import { Link } from "react-router-dom";

const Navbar = () => {
  const dispatch = useDispatch();
  const authorizedUser = useSelector(({ userAuthorization }) => userAuthorization);

  return (
    <nav>
      <Link to="/">Blogs</Link>
      <Link to="/users">Users</Link>
      <div>
        <p>{authorizedUser.name}</p>
        <button onClick={() => dispatch(logoutAuthorizedUser())}>Logout</button>
      </div>
    </nav>
  );
};

export default Navbar;
