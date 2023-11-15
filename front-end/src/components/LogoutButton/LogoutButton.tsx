import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { clearCurrentUser } from "../../redux/currentUserReducer";
import { logout } from "../../saga/apiService";

const LogoutButton = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout().catch((error: any) => {
      console.error("Login error:", error);
    });
    dispatch(clearCurrentUser());
    navigate("/login");
  };

  return (
    <div>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default LogoutButton;
