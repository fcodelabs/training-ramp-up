import { useState } from "react";
import AddNewButton from "../../components/AddNewButton/AddNewButton";
import UserTable from "../../components/UserTable/UserTable";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import LogoutButton from "../../components/LogoutButton/LogoutButton";

const UserPage = () => {
  const navigate = useNavigate();
  const [visible, setVisible] = useState(false);
  const currentUser = useSelector((state: RootState) => state.currentUser);
  if (currentUser.role === "") {
    navigate("/login");
    return null;
  }
  if (currentUser.role === "USER") {
    return <div>Unauthorize access</div>;
  }

  return (
    <div>
      <AddNewButton label="Add New" onClick={() => setVisible(!visible)} />
      <UserTable visible={visible} onDiscardClick={() => setVisible(false)} />
      <LogoutButton />
    </div>
  );
};

export default UserPage;
