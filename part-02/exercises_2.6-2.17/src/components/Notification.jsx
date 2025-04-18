const Notification = ({ error, user }) => {
  if (user === "") {
    return null;
  } else if (error) {
    return (
      <div className="error">
        Information of {user} has been removed from server
      </div>
    );
  } else {
    return <div className="notification">Added {user}</div>;
  }
};
export default Notification;
