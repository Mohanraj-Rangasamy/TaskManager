import React from "react";
import { render } from "@testing-library/react-native";
import ErrorsScreen from "../ErrorsScreen";
import { useErrors } from "../../context/ErrorContext";
import { useAuth } from "../../hooks/useAuth";

jest.mock("../../context/ErrorContext");
jest.mock("../../hooks/useAuth");

const mockUseErrors = useErrors as jest.Mock;
const mockUseAuth = useAuth as jest.Mock;

describe("ErrorsScreen", () => {
  const navigation = {
    replace: jest.fn(),
  } as any;

  afterEach(() => {
    jest.clearAllMocks();
  });

 
  it("redirects non-admin user to Tasks screen", () => {
    mockUseAuth.mockReturnValue({
      user: { role: "ROLE_USER" },
    });

    mockUseErrors.mockReturnValue({
      errors: [],
    });

    const { queryByText } = render(
      <ErrorsScreen navigation={navigation} />
    );

    expect(navigation.replace).toHaveBeenCalledWith("Tasks");
    expect(queryByText("Logged Errors")).toBeNull();
  });


  it("shows empty state when no errors are logged", () => {
    mockUseAuth.mockReturnValue({
      user: { role: "ROLE_ADMIN" },
    });

    mockUseErrors.mockReturnValue({
      errors: [],
    });

    const { getByText } = render(
      <ErrorsScreen navigation={navigation} />
    );

    expect(getByText("Logged Errors")).toBeTruthy();
    expect(getByText("No errors logged yet.")).toBeTruthy();
  });


  it("renders list of logged errors for admin user", () => {
    mockUseAuth.mockReturnValue({
      user: { role: "ROLE_ADMIN" },
    });

    mockUseErrors.mockReturnValue({
      errors: [
        {
          id: "1",
          message: "Something went wrong",
          time: "2024-01-01 10:00",
        },
      ],
    });

    const { getByText } = render(
      <ErrorsScreen navigation={navigation} />
    );

    expect(getByText("Logged Errors")).toBeTruthy();
    expect(getByText("Something went wrong")).toBeTruthy();
    expect(getByText("2024-01-01 10:00")).toBeTruthy();
  });
});
