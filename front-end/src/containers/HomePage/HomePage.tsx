import { useContext, useState } from "react";
import AddNewButton from "../../components/AddNewButton/AddNewButton";
import { NotifiactionComponent } from "../../components/Notification/Notification";
import StudentTable from "../../components/StudentTable/StudentTable";
import AuthContext from "../../provider/authProvider";

const HomePage = () => {
  const [visible, setVisible] = useState(false);
  // const { user }: any = useContext(AuthContext);
  return (
    <div>
      {/* <div>{user.username}</div> */}
      <AddNewButton label="Add New" onClick={() => setVisible(!visible)} />
      <StudentTable
        visible={visible}
        onDiscardClick={() => setVisible(false)}
      />
      <NotifiactionComponent message="AA" />
    </div>
  );
};

export default HomePage;
