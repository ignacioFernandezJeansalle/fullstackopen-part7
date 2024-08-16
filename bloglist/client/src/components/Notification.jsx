import { useSelector } from "react-redux";

const Notification = () => {
  const [content, error] = useSelector(({ notification }) => notification);

  if (content === "") return null;

  return <div>{content}</div>;
};

export default Notification;
