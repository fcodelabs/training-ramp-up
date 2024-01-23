import React from "react";
import {
  render,
  screen,
  fireEvent,
  getByLabelText,
} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ThemeProvider } from "styled-components";
import { createTheme } from "@mui/material/styles";
import EditableCell from "../containers/Home/Table/TableColumns/FixedColumns/EditCells/EditCells";
import { Provider } from "react-redux";
import store from "../redux/store";
import {
  validateAge,
  validateBirthday,
  validateMobile,
} from "../utilities/validateUser";
const theme = createTheme();
describe("EditableCell", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test("calls handleChange on text field change", () => {
    const handleChangeMock = jest.fn();
    const params: any = {
      id: 1,
      field: "name",
      value: "John Doe",
      api: {
        setEditCellValue: jest.fn(),
      },
    };

    render(
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <EditableCell
            params={params}
            field="name"
            value="John Doe"
            validate={() => true}
          />
        </ThemeProvider>
      </Provider>
    );

    const textField = screen.getByRole("textbox");
    fireEvent.change(textField, { target: { value: "New Name" } });

    expect(params.api.setEditCellValue).toHaveBeenCalledWith({
      id: 1,
      field: "name",
      value: "New Name",
    });
  });

  test("renders age field as disabled number input", () => {
    const handleChangeMock = jest.fn();

    const ageParams: any = {
      id: 1,
      field: "age",
      value: 2,
      api: {
        setEditCellValue: jest.fn(),
      },
    };

    render(
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <EditableCell
            params={ageParams}
            field="age"
            value={ageParams.value}
            validate={validateAge}
          />
        </ThemeProvider>
      </Provider>
    );

    const ageInput = screen.getByRole("spinbutton");
    fireEvent.change(ageInput, { target: { value: 3 } }); //should not change

    expect(ageInput).toHaveAttribute("disabled");
  });

  test("error message shown under mobile input field", () => {
    const mobileParams: any = {
      id: 1,
      field: "mobile",
      value: "01234567",
      api: {
        setEditCellValue: jest.fn(),
      },
    };

    render(
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <EditableCell
            params={mobileParams}
            field="mobile"
            value={mobileParams.value} //wrong number
            validate={validateMobile}
          />
        </ThemeProvider>
      </Provider>
    );

    const mobileInput = screen.getByDisplayValue("01234567");
    expect(mobileInput).toBeInTheDocument();
    fireEvent.change(mobileInput, { target: { value: "01234567" } });

    expect(screen.getByText(/enter a valid phone number/i)).toBeInTheDocument();
  });

  test("address field renders as text area", () => {
    const handleChangeMock = jest.fn();
    const addressParams: any = {
      id: 1,
      field: "address",
      value: "123 Main St",
      api: {
        setEditCellValue: jest.fn(),
      },
    };

    render(
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <EditableCell
            params={addressParams}
            field="address"
            value={addressParams.value}
            validate={() => true}
          />
        </ThemeProvider>
      </Provider>
    );

    const addressTextArea = screen.getByRole("textbox");
    fireEvent.change(addressTextArea, { target: { value: "456 Oak St" } });
    expect(addressTextArea).toBeInTheDocument();
  });

  test("birthday field renders correctly", () => {
    const handleChangeMock = jest.fn();
    const birthdayParams: any = {
      id: 1,
      field: "birthday",
      value: "1990-05-15",
      api: {
        setEditCellValue: jest.fn(),
      },
    };

    render(
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <EditableCell
            params={birthdayParams}
            field="birthday"
            value={birthdayParams.value}
            validate={validateBirthday}
          />
        </ThemeProvider>
      </Provider>
    );

    const birthdayInput = screen.getByDisplayValue("1990-05-15");
    expect(birthdayInput).toBeInTheDocument();
  });

  test("test for genders column", () => {
    const options = ["Male", "Female", "Other"];
    const handleChangeMock = jest.fn();
    const genderParams: any = {
      id: 1,
      field: "gender",
      value: "Male",
      api: {
        setEditCellValue: jest.fn(),
      },
    };

    render(
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <EditableCell
            params={genderParams}
            field="gender"
            options={options}
            value={genderParams.value}
            validate={validateBirthday}
          />
        </ThemeProvider>
      </Provider>
    );

    const genderInput = screen.getByDisplayValue("Male");
    expect(genderInput).toBeInTheDocument();
  });
});
