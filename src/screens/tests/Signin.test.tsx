import { render, fireEvent, waitFor } from "@testing-library/react-native";
import SignIn from "../SignIn";
import { useAuth } from "../../hooks/useAuth";
import { useErrors } from "../../context/ErrorContext";
import i18n from "../../i18n";
import { Platform } from "react-native";


// jest.spyOn(Platform, "OS", "get").mockReturnValue("android");


jest.mock("../../hooks/useAuth");
jest.mock("../../context/ErrorContext");


jest.mock("../../i18n", () => ({
  changeLanguage: jest.fn(),
}));


jest.mock("react-i18next", () => ({
  useTranslation: () => ({
    t: (key: string) => key, // return key as label
  }),
}));


jest.mock("../../components/Reusable_Button", () => {
  return ({ title, onPress }: any) => (
    <button onClick={onPress}>{title}</button>
  );
});

jest.mock("../../components/Reusable_textInput", () => {
  return ({ placeholder, value, onChangeText }: any) => (
    <input
      placeholder={placeholder}
      value={value}
      onChange={(e) => onChangeText(e.target.value)}
    />
  );
});

const mockSignIn = jest.fn();
const mockLogError = jest.fn();

describe("SignIn Screen", () => {
  beforeEach(() => {
    jest.clearAllMocks();

    (useAuth as jest.Mock).mockReturnValue({
      signIn: mockSignIn,
    });

    (useErrors as jest.Mock).mockReturnValue({
      logError: mockLogError,
    });
  });

  
 
  it("calls signIn when credentials are valid", async () => {
    mockSignIn.mockResolvedValueOnce(undefined);

    const { getByPlaceholderText, getByTestId } = render(<SignIn />);
    Platform.OS = "android";
    fireEvent.changeText(
      getByPlaceholderText("Username"),
      "admin"
    );
    fireEvent.changeText(
      getByPlaceholderText("Password"),
      "1234"
    );

    await fireEvent.press(getByTestId("login_button"));

    await waitFor(() => {
      expect(mockSignIn).toHaveBeenCalledWith("admin", "1234");
    });
  });

  
  it("logs error and shows message when signIn fails", async () => {
    mockSignIn.mockRejectedValueOnce(new Error("Invalid credentials"));

    const { getByPlaceholderText, getByText } = render(<SignIn />);

    fireEvent.changeText(
      getByPlaceholderText("Username"),
      "admin"
    );
    fireEvent.changeText(
      getByPlaceholderText("Password"),
      "wrong"
    );

    fireEvent.press(getByText("Login"));

    await waitFor(() => {
      expect(mockLogError).toHaveBeenCalledWith("Invalid credentials");
      expect(getByText("Invalid credentials")).toBeTruthy();
    });
  });

  
  it("changes language when language buttons are pressed", () => {
    const { getByTestId } = render(<SignIn />);

    fireEvent.press(getByTestId("Tamil_lang_button"));
    expect(i18n.changeLanguage).toHaveBeenCalledWith("ta");

    fireEvent.press(getByText("English"));
    expect(i18n.changeLanguage).toHaveBeenCalledWith("en");
  });
});
