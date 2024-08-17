import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { initializeUsers } from "../reducers/usersReducer";
import { useAuthorizedUser } from "../hooks";

import { Table, TableRow, TableHeader, TableHeaderCell, TableBody, TableCell } from "semantic-ui-react";

const Users = () => {
  const { authorizedUser } = useAuthorizedUser();
  const users = useSelector(({ users }) => users);
  const dispatch = useDispatch();

  useEffect(() => {
    if (users.length === 0) {
      dispatch(initializeUsers());
    }
  }, []);

  if (!authorizedUser) return null;

  return (
    <section>
      <Table celled>
        <TableHeader>
          <TableRow>
            <TableHeaderCell>Name</TableHeaderCell>
            <TableHeaderCell>Blog created</TableHeaderCell>
          </TableRow>
        </TableHeader>

        <TableBody>
          {users.map((user) => (
            <TableRow key={user.id}>
              <TableCell>
                <Link to={`/users/${user.id}`}>{user.name}</Link>
              </TableCell>
              <TableCell>{user.blogs.length}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </section>
  );
};

export default Users;
