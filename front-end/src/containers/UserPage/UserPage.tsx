import { useState } from "react";
import AddNewButton from "../../components/AddNewButton/AddNewButton";
import UserTable from "../../components/UserTable/UserTable";

const UserPage = () => {
  const [visible, setVisible] = useState(false);
  return (
    <div>
      <AddNewButton label="Add New" onClick={() => setVisible(!visible)} />
      <UserTable visible={visible} onDiscardClick={() => setVisible(false)} />
    </div>
  );
};

export default UserPage;
