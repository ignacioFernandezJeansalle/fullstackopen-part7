import { useSelector } from "react-redux";

export const useAuthorizedUser = () => {
  const authorizedUser = useSelector(({ userAuthorization }) => userAuthorization);

  return { authorizedUser };
};
