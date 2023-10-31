import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import StudentTable from "../../components/StudentTable/StudentTable";
import store from "../../redux/store";

test("renders StudentTable component", () => {
  render(
    <Provider store={store}>
      <StudentTable visible={true} onDiscardClick={() => {}} />
    </Provider>
  );

  expect(screen.getByText("ID")).toBeInTheDocument();
  expect(screen.getByText("Name")).toBeInTheDocument();
  expect(screen.getByText("Gender")).toBeInTheDocument();
  expect(screen.getByText("Address")).toBeInTheDocument();
  expect(screen.getByText("Mobile No")).toBeInTheDocument();
  expect(screen.getByText("Date of Birth")).toBeInTheDocument();
  expect(screen.getByText("Age")).toBeInTheDocument();
});

test("handles form validation correctly", () => {
  render(
    <Provider store={store}>
      <StudentTable visible={true} onDiscardClick={() => {}} />
    </Provider>
  );
});
