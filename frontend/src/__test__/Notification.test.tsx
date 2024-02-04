import React from "react";
import { render, fireEvent } from "@testing-library/react";
import NotificationPopup from "../components/Notification/Notification";
import { NotificationTypes, NotificationTexts } from "../utilities";

afterEach(() => {
  jest.clearAllMocks();
});
const onCloseMock = jest.fn();
const onSubmitMock = jest.fn();

describe("NotificationPopup", () => {
  test("renders correctly with loading", () => {
    const { getByText } = render(
      <NotificationPopup
        open={true}
        onClose={onCloseMock}
        onSubmit={onSubmitMock}
        type={NotificationTypes.LOADING_DATA}
      />
    );
    expect(
      getByText(NotificationTexts[NotificationTypes.LOADING_DATA])
    ).toBeInTheDocument();
    fireEvent.click(getByText("ok"));
    expect(onCloseMock).toHaveBeenCalled();
  });

  test("renders correctly with add function", () => {
    const { getByText } = render(
      <NotificationPopup
        open={true}
        onClose={onCloseMock}
        onSubmit={onSubmitMock}
        type={NotificationTypes.ADD_USER}
      />
    );
    expect(
      getByText(NotificationTexts[NotificationTypes.ADD_USER])
    ).toBeInTheDocument();
    fireEvent.click(getByText("Confirm"));
    expect(onCloseMock).toHaveBeenCalled();
  });

  test("renders correctly with update function", () => {
    const { getByText } = render(
      <NotificationPopup
        open={true}
        onClose={onCloseMock}
        onSubmit={onSubmitMock}
        type={NotificationTypes.SAVE_USER}
      />
    );
    expect(
      getByText(NotificationTexts[NotificationTypes.SAVE_USER])
    ).toBeInTheDocument();
    fireEvent.click(getByText("Confirm"));
    expect(onCloseMock).toHaveBeenCalled();
  });

  test("renders correctly with missing fields", () => {
    const { getByText } = render(
      <NotificationPopup
        open={true}
        onClose={onCloseMock}
        onSubmit={onSubmitMock}
        type={NotificationTypes.MISSING_FIELDS}
      />
    );
    expect(
      getByText(NotificationTexts[NotificationTypes.MISSING_FIELDS])
    ).toBeInTheDocument();
    fireEvent.click(getByText("keep editing"));
    expect(onCloseMock).toHaveBeenCalled();
  });

  test("renders correctly with discard changes", () => {
    const { getByText } = render(
      <NotificationPopup
        open={true}
        onClose={onCloseMock}
        onSubmit={onSubmitMock}
        type={NotificationTypes.DISCARD_CHANGES}
      />
    );
    expect(
      getByText(NotificationTexts[NotificationTypes.DISCARD_CHANGES])
    ).toBeInTheDocument();
    fireEvent.click(getByText("Dismiss"));
    expect(onCloseMock).toHaveBeenCalled();
    fireEvent.click(getByText("Confirm"));
    expect(onSubmitMock).toHaveBeenCalled();
  });

  test("renders correctly with delete", () => {
    const { getByText } = render(
      <NotificationPopup
        open={true}
        onClose={onCloseMock}
        onSubmit={onSubmitMock}
        type={NotificationTypes.DELETE_USER}
      />
    );
    expect(
      getByText(NotificationTexts[NotificationTypes.DELETE_USER])
    ).toBeInTheDocument();
    fireEvent.click(getByText("Dismiss"));
    expect(onCloseMock).toHaveBeenCalled();
    fireEvent.click(getByText("Confirm"));
    expect(onSubmitMock).toHaveBeenCalled();
  });

  test("renders correctly with delete user success", () => {
    const { getByText } = render(
      <NotificationPopup
        open={true}
        onClose={onCloseMock}
        onSubmit={onSubmitMock}
        type={NotificationTypes.DELETE_USER_SUCCESS}
      />
    );
    expect(
      getByText(NotificationTexts[NotificationTypes.DELETE_USER_SUCCESS])
    ).toBeInTheDocument();
    fireEvent.click(getByText("ok"));
    expect(onCloseMock).toHaveBeenCalled();
  })

  test("renders correctly with save new user", () => {
    const { getByText } = render(
      <NotificationPopup
        open={true}
        onClose={onCloseMock}
        onSubmit={onSubmitMock}
        type={NotificationTypes.SAVE_NEW_USER}
      />
    );
    expect(
      getByText(NotificationTexts[NotificationTypes.SAVE_NEW_USER])
    ).toBeInTheDocument();
    fireEvent.click(getByText("ok"));
    expect(onCloseMock).toHaveBeenCalled();
  });

  test("renders correctly with fail save new user", () => {
    const { getByText } = render(
      <NotificationPopup
        open={true}
        onClose={onCloseMock}
        onSubmit={onSubmitMock}
        type={NotificationTypes.FAIL_SAVE_NEW_USER}
      />
    );
    expect(
      getByText(NotificationTexts[NotificationTypes.FAIL_SAVE_NEW_USER])
    ).toBeInTheDocument();
    fireEvent.click(getByText("try again"));
  });

  test("renders correctly with fail update user", () => {
    const { getByText } = render(
      <NotificationPopup
        open={true}
        onClose={onCloseMock}
        onSubmit={onSubmitMock}
        type={NotificationTypes.FAIL_UPDATE_USER}
      />
    );
    expect(
      getByText(NotificationTexts[NotificationTypes.FAIL_UPDATE_USER])
    ).toBeInTheDocument();
    fireEvent.click(getByText("try again"));
  });
});

  
