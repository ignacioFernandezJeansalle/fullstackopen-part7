import { useSelector } from "react-redux";

import "./Notification.css";

const Notification = () => {
  const [content, error] = useSelector(({ notification }) => notification);

  if (content === "") return null;

  const className = error ? "notification error" : "notification";

  return <div className={className}>{content}</div>;
};

export default Notification;
