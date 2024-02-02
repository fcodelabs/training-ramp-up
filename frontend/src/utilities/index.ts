import { GridRowsProp } from "@mui/x-data-grid";

export const calculateAge = (dateOfBirth: Date) => {
  if (!dateOfBirth) {
    return null;
  }

  const today = new Date();
  const birthDate = new Date(dateOfBirth);
  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDiff = today.getMonth() - birthDate.getMonth();

  if (
    monthDiff < 0 ||
    (monthDiff === 0 && today.getDate() < birthDate.getDate())
  ) {
    age--;
  }

  return age;
};

export const formatDate = (value: string | null): string => {
  const dateObject = value ? new Date(value) : new Date();

  return dateObject
    ? `${dateObject.toLocaleDateString("en-US", { weekday: "short" })}
         ${dateObject.toLocaleDateString("en-US", { month: "short" })} 
         ${dateObject.toLocaleDateString("en-US", { day: "numeric" })} 
         ${dateObject.toLocaleDateString("en-US", { year: "numeric" })}`
    : "";
};

export const formatMobileDisplay = (mobile: string) => {
  const numericMobile = mobile.replace(/\D/g, "");
  if (numericMobile.startsWith("94")) {
    const formattedMobile = "0" + numericMobile.slice(2);

    return formattedMobile.replace(/(\d{3})(\d{3})(\d{4})/, "$1-$2-$3");
  } else {
    return numericMobile
      .replace(/^\+/, "")
      .replace(/(\d{3})(\d{3})(\d{3,})/, "$1-$2-$3");
  }
};

export const generateNewId = (data: GridRowsProp) => {
  const maxId = data.reduce((max, item) => (item.id > max ? item.id : max), -1);
  return maxId + 1;
};

export const Columns = [
  "id",
  "name",
  "address",
  "gender",
  "mobile",
  "birthday",
  "age",
  "action",
];

export const emptyRows = [
  {
    id: 1,
    error: true,
  },
  {
    id: 2,
    error: true,
  },
  {
    id: 3,
    error: true,
  },
  {
    id: 4,
    error: true,
  },
  {
    id: 5,
    error: true,
  },
];

export enum NotificationTypes {
  LOADING_DATA = "LOADING_DATA",
  ADD_USER = "ADD_USER",
  SAVE_USER = "SAVE_USER",
  MISSING_FIELDS = "MISSING_FIELDS",
  DISCARD_CHANGES = "DISCARD_CHANGES",
  SAVE_NEW_USER = "SAVE_NEW_USER",
  FAIL_SAVE_NEW_USER = "FAIL_SAVE_NEW_USER",
  FAIL_UPDATE_USER = "FAIL_UPDATE_USER",
  DELETE_USER = "DELETE_USER",
  DELETE_USER_SUCCESS = "DELETE_USER_SUCCESS",
  LOGOUT_USER = "LOGOUT_USER",
  SUCCESS_REGISTER_OBSERVER = "SUCCESS_REGISTER_OBSERVER",
  SUCCESS_SEND_EMAIL = "SUCCESS_SEND_EMAIL",
  FAIL_SEND_EMAIL = "FAIL_SEND_EMAIL",
}

export const NotificationTexts: Record<NotificationTypes, string> = {
  [NotificationTypes.LOADING_DATA]:
    "Unable to retrieve table details. Please try again later.",
  [NotificationTypes.ADD_USER]: "A new student added successfully",
  [NotificationTypes.SAVE_USER]: "Student details updated successfully",
  [NotificationTypes.MISSING_FIELDS]: "Mandatory fields missing.",
  [NotificationTypes.DISCARD_CHANGES]: "Discard changes?",
  [NotificationTypes.SAVE_NEW_USER]: "A new student added successfully",
  [NotificationTypes.FAIL_SAVE_NEW_USER]:
    "Unable to add the new student. Please try again later",
  [NotificationTypes.FAIL_UPDATE_USER]:
    "Cannot update the student details. Please try again later",
  [NotificationTypes.DELETE_USER]:
    "Are you sure you want to remove this student?",
  [NotificationTypes.DELETE_USER_SUCCESS]: "Student deleted successfully",
  [NotificationTypes.LOGOUT_USER]: "Are you sure you want to logout?",
  [NotificationTypes.SUCCESS_REGISTER_OBSERVER]: "Your account has been successfully created.",
  [NotificationTypes.SUCCESS_SEND_EMAIL]: "A password creation link has been sent to the  provided email address.",
  [NotificationTypes.FAIL_SEND_EMAIL]: "Failed to send the password creation link. Please try again later.",
};
