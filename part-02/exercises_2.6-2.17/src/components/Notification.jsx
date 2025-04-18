const Notification = ({ user }) => {
  if (user === "") {
    return null;
  } else {
    return <div className="notification">Added {user}</div>;
  }
};
export default Notification