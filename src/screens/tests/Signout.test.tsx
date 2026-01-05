import { useAuth } from "../../hooks/useAuth";
import SignOutScreen from "../SignOut";
import { render } from "@testing-library/react-native";

jest.mock("../../hooks/useAuth");
const mockUseAuth = useAuth as jest.Mock;

describe("SignOut Screen", () => {
    test("renders Sign Out button", () => {
        mockUseAuth.mockReturnValue({});
        const component = render(<SignOutScreen />);
        expect(component).toMatchSnapshot();
    });
})
