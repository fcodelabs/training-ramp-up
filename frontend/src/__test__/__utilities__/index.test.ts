import {
  formatMobileDisplay,
  generateNewId,
  calculateAge,
  formatDate,
} from "../../utilities/index";

afterEach(() => {
  jest.clearAllMocks();
});
describe("formatMobileDisplay", () => {
  it('should format mobile number starting with "94"', () => {
    const mobileNumber = "947123456789";
    const formattedMobile = formatMobileDisplay(mobileNumber);
    expect(formattedMobile).toBe("071-234-56789");
  });

  it("should format other mobile numbers", () => {
    const mobileNumber = "+123456789012";
    const formattedMobile = formatMobileDisplay(mobileNumber);
    expect(formattedMobile).toBe("123-456-789012");
  });
});

describe("generateNewId", () => {
  it("should generate a new ID based on existing data", () => {
    const existingData = [
      { id: 1, name: "John Doe" },
      { id: 3, name: "Jane Doe" },
      // ... other data entries
    ];

    const newId = generateNewId(existingData);
    expect(newId).toBe(4); 
  });

  it("should handle an empty data array", () => {
    const existingData: any = [];
    const newId = generateNewId(existingData);
    expect(newId).toBe(0); // If the array is empty, the new ID should be 0
  });
});

describe("calculateAge", () => {
  it("should calculate age correctly", () => {
    const dateOfBirth = new Date("1990-01-01");
    const age = calculateAge(dateOfBirth);
    expect(age).toBeGreaterThan(0); 
  });

  it("should handle future birth dates", () => {
    const futureDateOfBirth = new Date("2050-01-01");
    const age = calculateAge(futureDateOfBirth);
    expect(age).toBeLessThanOrEqual(0); // Age should not be negative for future dates
  });
});

