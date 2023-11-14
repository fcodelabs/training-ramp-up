import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import CustomizeButton from "../Button/Button";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import "react-datepicker/dist/react-datepicker.css";
import TableCellInput from "../TableCellInput/TableCellInput";
import TableCellNewInput from "../TableCellNewInput/TableCellNewInput";
import { RootState } from "../../redux/store";
import {
  addUser,
  deleteUser,
  fetchUsers,
  updateUser,
} from "../../redux/userReducer";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.action.hover,
    color: theme.palette.common.black,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(even)": {
    backgroundColor: theme.palette.action.hover,
  },
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

interface Props {
  visible: boolean;
  onDiscardClick: () => void;
}

const UserTable = ({ visible, onDiscardClick }: Props) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchUsers());
  }, []);

  const existingUsers = useSelector((state: RootState) => state.users);

  // Local
  const [editId, setEditId] = useState(-1);
  const [user, setUser] = useState({
    id: "",
    username: "",
    email: "",
    password: "",
    role: "USER",
  });

  const clearUserData = () =>
    setUser({
      id: "",
      username: "",
      email: "",
      password: "",
      role: "USER",
    });

  //validations
  const validateForm = (action: string) => {
    if (user.username.length === 0) {
      return alert("Invalid Form, username cannot be empty");
    }
    if (user.email.length === 0) {
      return alert("Invalid Form, email cannot be empty");
    }
    if (action === "Add") {
      return dispatch(addUser(user));
    }
    if (action === "Edit") {
      return dispatch(updateUser(user));
    }
  };
  return (
    <>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <StyledTableCell align="left">username</StyledTableCell>
              <StyledTableCell align="left">Email</StyledTableCell>
              <StyledTableCell align="left">Password</StyledTableCell>
              <StyledTableCell align="left">Role</StyledTableCell>
              <StyledTableCell align="left"></StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {visible && (
              <StyledTableRow>
                <TableCellNewInput
                  onChange={(event) =>
                    setUser({
                      ...user,
                      username: event.target.value,
                    })
                  }
                />
                <TableCellNewInput
                  onChange={(event) =>
                    setUser({
                      ...user,
                      email: event.target.value,
                    })
                  }
                />
                <TableCellNewInput
                  onChange={(event) =>
                    setUser({
                      ...user,
                      password: event.target.value,
                    })
                  }
                />
                <select
                  value={user.role}
                  onChange={(event) =>
                    setUser({
                      ...user,
                      role: event.target.value,
                    })
                  }
                >
                  <option value="ADMIN">ADMIN</option>
                  <option value="USER">USER</option>
                </select>
                <TableCell align="left">
                  <div>
                    <CustomizeButton
                      label="Add"
                      color="black"
                      backgroundColor="#f0f8ff"
                      onClick={() => {
                        validateForm("Add");
                        clearUserData();
                        onDiscardClick();
                      }}
                    />
                  </div>
                  <div>
                    <CustomizeButton
                      label="Discard"
                      color="black"
                      backgroundColor="#f0f8ff"
                      onClick={() => {
                        onDiscardClick();
                        clearUserData();
                      }}
                    />
                  </div>
                </TableCell>
              </StyledTableRow>
            )}
            {existingUsers.map((val, key) => {
              if (key === editId) {
                return (
                  <StyledTableRow key={key}>
                    <TableCellInput
                      defaultValue={val.username}
                      onChange={(event) => {
                        setUser({
                          ...user,
                          username: event.target.value,
                        });
                      }}
                    />
                    <TableCellInput
                      defaultValue={val.email}
                      onChange={(event) =>
                        setUser({
                          ...user,
                          email: event.target.value,
                        })
                      }
                    />
                    <TableCellInput
                      defaultValue={val.password}
                      onChange={(event) =>
                        setUser({
                          ...user,
                          password: event.target.value,
                        })
                      }
                    />
                    <select
                      value={user.role}
                      onChange={(event) =>
                        setUser({
                          ...user,
                          role: event.target.value,
                        })
                      }
                    >
                      <option value="ADMIN">ADMIN</option>
                      <option value="USER">USER</option>
                    </select>
                    <TableCell align="left">
                      <div>
                        <CustomizeButton
                          label="Update"
                          color="black"
                          backgroundColor="#f0f8ff"
                          onClick={() => {
                            validateForm("Edit");
                            setEditId(-1);
                            clearUserData();
                          }}
                        />
                      </div>
                      <div>
                        <CustomizeButton
                          label="Cancel"
                          color="black"
                          backgroundColor="#f0f8ff"
                          onClick={() => {
                            setEditId(-1);
                            onDiscardClick();
                            clearUserData();
                          }}
                        />
                      </div>
                    </TableCell>
                  </StyledTableRow>
                );
              } else {
                return (
                  <StyledTableRow key={key}>
                    <TableCell align="left">{val.username}</TableCell>
                    <TableCell align="left">{val.email}</TableCell>
                    <TableCell align="left"></TableCell>
                    <TableCell align="left">{val.role}</TableCell>
                    <TableCell align="left">
                      <div>
                        <CustomizeButton
                          label="Edit"
                          color="white"
                          backgroundColor="red"
                          onClick={() => {
                            onDiscardClick();
                            setEditId(key);
                            setUser({
                              ...user,
                              ...val,
                            });
                          }}
                        />
                        <CustomizeButton
                          label="Remove"
                          color="black"
                          backgroundColor="#f0f8ff"
                          onClick={() => dispatch(deleteUser(val.id))}
                        />
                      </div>
                    </TableCell>
                  </StyledTableRow>
                );
              }
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default UserTable;
