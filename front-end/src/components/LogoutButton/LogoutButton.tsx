import axios from "axios";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { clearCurrentUser } from "../../redux/currentUserReducer";

const API_BASE_URL = "http://127.0.0.1:8000/api";

const LogoutButton = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logout = async () => {
    try {
      await axios.post(API_BASE_URL + "/logout/");
      dispatch(clearCurrentUser());
      navigate("/login");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  return (
    <div>
      <button onClick={logout}>Logout</button>
    </div>
  );
};

export default LogoutButton;
