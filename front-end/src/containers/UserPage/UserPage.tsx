import { useEffect, useState } from "react";
import AddNewButton from "../../components/AddNewButton/AddNewButton";
import UserTable from "../../components/UserTable/UserTable";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import LogoutButton from "../../components/LogoutButton/LogoutButton";
import CustomizeButton from "../../components/Button/Button";
import { NotifiactionComponent } from "../../components/Notification/Notification";

interface NotificationProps {
  notifications: string[];
}

const UserPage = ({ notifications }: NotificationProps) => {
  const navigate = useNavigate();
  const [visible, setVisible] = useState(false);
  const currentUser = useSelector((state: RootState) => state.currentUser);

  useEffect(() => {
    if (currentUser.role === "") {
      navigate("/login");
    }
  }, []);

  if (currentUser.role === "USER") {
    return <div>Unauthorize access</div>;
  }

  return (
    <div>
      <div style={{ paddingBottom: 5 }}>
        <CustomizeButton
          label="Home Page"
          color="black"
          backgroundColor="#f0f8aa"
          onClick={() => {
            navigate("/");
          }}
        />
      </div>
      <AddNewButton label="Add New" onClick={() => setVisible(!visible)} />
      <UserTable visible={visible} onDiscardClick={() => setVisible(false)} />
      <LogoutButton />
      <NotifiactionComponent notifications={notifications} />
    </div>
  );
};

export default UserPage;
