import { useEffect, useState } from "react";
import AddNewButton from "../../components/AddNewButton/AddNewButton";
import StudentTable from "../../components/StudentTable/StudentTable";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { useNavigate } from "react-router-dom";
import LogoutButton from "../../components/LogoutButton/LogoutButton";

const HomePage = () => {
  const navigate = useNavigate();
  const [visible, setVisible] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const currentUser = useSelector((state: RootState) => state.currentUser);

  useEffect(() => {
    if (currentUser.role === "") {
      navigate("/login");
    }
  }, []);
  if (currentUser.role === "ADMIN") {
    setIsAdmin(true);
    return null;
  }

  const renderComponents = () => {
    return (
      <>
        {isAdmin && (
          <AddNewButton label="Add New" onClick={() => setVisible(!visible)} />
        )}
        <StudentTable
          visible={visible}
          onDiscardClick={() => setVisible(false)}
          isAdmin={isAdmin}
        />
        <LogoutButton />
      </>
    );
  };

  return (
    <div>
      <div>{currentUser.userName}</div>
      {currentUser.role === "ADMIN" || currentUser.role === "USER"
        ? renderComponents()
        : null}
    </div>
  );
};

export default HomePage;
