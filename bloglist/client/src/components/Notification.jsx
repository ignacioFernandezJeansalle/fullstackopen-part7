import { useSelector } from "react-redux";
import { Message } from "semantic-ui-react";

const Notification = () => {
  const [content, error] = useSelector(({ notification }) => notification);

  const show = content !== "";

  return (
    <Message hidden={!show} visible={show} negative={error} positive={!error}>
      {content}
    </Message>
  );
};

export default Notification;
