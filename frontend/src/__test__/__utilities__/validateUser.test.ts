import {
  validateStudent,
  validateName,
  validateAge,
  validateMobile,
  validateAddress,
  validateBirthday,
} from "../../utilities/validateStudent";

afterEach(() => {
  jest.clearAllMocks();
});

describe("validateStudent", () => {
  it("should return true for a valid user", () => {
    const user = {
      name: "John Doe",
      age: 25,
      mobile: "0786576789",
      address: "123 Main St",
      birthday: "1995-01-01",
    };

    const requiredFields = ["name", "age", "mobile", "address", "birthday"];
    const isValid = validateStudent(user, requiredFields);

    expect(isValid).toBe(true);
  });

  it("should return false if name is not valid", () => {
    const user = {
      name: "",
      age: 25,
      mobile: "123-456-7890",
      address: "123 Main St",
      birthday: "1995-01-01",
    };

    const requiredFields = ["name"];
    const isValid = validateStudent(user, requiredFields);

    expect(isValid).toBe(false);
  });

  it("should return false if age is not valid", () => {
    const user = {
      name: "John Doe",
      age: 15,
      mobile: "123-456-7890",
      address: "123 Main St",
      birthday: "1995-01-01",
    };

    const requiredFields = ["age"];
    const isValid = validateStudent(user, requiredFields);

    expect(isValid).toBe(false);
  });

  it("should return false if mobile is not valid", () => {
    const user = {
      name: "John Doe",
      age: 25,
      mobile: "123-456-7890",
      address: "123 Main St",
      birthday: "1995-01-01",
    };

    const requiredFields = ["mobile"];
    const isValid = validateStudent(user, requiredFields);

    expect(isValid).toBe(false);
  });

  it("should return false if address is not valid", () => {
    const user = {
      name: "John Doe",
      age: 25,
      mobile: "123-456-7890",
      address: "",
      birthday: "1995-01-01",
    };

    const requiredFields = ["address"];
    const isValid = validateStudent(user, requiredFields);

    expect(isValid).toBe(false);
  });

  it("should return false if birthday is not valid", () => {
    const user = {
      name: "John Doe",
      age: 25,
      mobile: "123-456-7890",
      address: "123 Main St",
      birthday: null,
    };

    const requiredFields = ["birthday"];
    const isValid = validateStudent(user, requiredFields);

    expect(isValid).toBe(false);
  });
});
