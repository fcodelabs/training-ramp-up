interface NotificationProps {
  notifications: string[];
}

export const NotifiactionComponent = ({ notifications }: NotificationProps) => {
  return (
    <div
      style={{
        position: "fixed",
        top: "500px",
        right: "10px",
        padding: "10px",
        background: "#fff",
        border: "1px solid #ccc",
        borderRadius: "5px",
        boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
        maxHeight: "100px",
        overflowY: "auto",
      }}
    >
      <h3 style={{ textAlign: "center" }}>Notifications</h3>
      <ul>
        {notifications.map((notification, index) => (
          <li key={index}>{notification}</li>
        ))}
      </ul>
    </div>
  );
};
