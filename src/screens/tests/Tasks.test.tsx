import { render, fireEvent } from "@testing-library/react-native";
import Tasks from "../Tasks";
import { useIsFocused } from "@react-navigation/native";
import { useTaskContext } from "../../context/TaskContext";


jest.mock("@react-navigation/native", () => ({
  useIsFocused: jest.fn(),
}));

jest.mock("../../context/TaskContext");

jest.mock("../../components/Reusable_Button", () => {
  return ({ title, onPress, disabled }: any) => (
    <button disabled={disabled} onClick={onPress}>
      {title}
    </button>
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


const mockAddTask = jest.fn();
const mockToggleTask = jest.fn();
const mockDeleteTask = jest.fn();
const mockSetSort = jest.fn();
const mockSetFilter = jest.fn();
const mockLoadTasksFromStorage = jest.fn();
const mockSetPage = jest.fn();

const mockTasks = [
  { id: "1", title: "Task One", completed: false },
  { id: "2", title: "Task Two", completed: true },
];

describe("Tasks Screen", () => {
  const navigation = {
    navigate: jest.fn(),
  } as any;

  beforeEach(() => {
    jest.clearAllMocks();

    (useIsFocused as jest.Mock).mockReturnValue(true);

    (useTaskContext as jest.Mock).mockReturnValue({
      tasks: mockTasks,
      addTask: mockAddTask,
      toggleTask: mockToggleTask,
      deleteTask: mockDeleteTask,
      sort: "asc",
      setSort: mockSetSort,
      loadTasksFromStorage: mockLoadTasksFromStorage,
      setFilter: mockSetFilter,
      page: 1,
      setPage: mockSetPage,
      totalPages: 2,
    });
  });

 
  it("loads tasks when screen is focused", () => {
    render(<Tasks navigation={navigation} />);

    expect(mockLoadTasksFromStorage).toHaveBeenCalled();
  });

  
  it("adds a task when Add Task is pressed", () => {
    const { getByPlaceholderText, getByText } = render(
      <Tasks navigation={navigation} />
    );

    fireEvent.changeText(getByPlaceholderText("New Task"), "New Task");
    fireEvent.press(getByText("Add Task"));

    expect(mockAddTask).toHaveBeenCalledWith("New Task");
  });

 
  it("toggles task when task text is pressed", () => {
    const { getByText } = render(<Tasks navigation={navigation} />);

    fireEvent.press(getByText("Task One"));

    expect(mockToggleTask).toHaveBeenCalledWith("1");
  });


  it("deletes task when delete icon is pressed", () => {
    const { getAllByLabelText } = render(
      <Tasks navigation={navigation} />
    );

    fireEvent.press(getAllByLabelText("task update icon")[0]);

    expect(mockDeleteTask).toHaveBeenCalledWith("1");
  });

  
  it("navigates to EditTask when edit icon is pressed", () => {
    const { getAllByLabelText } = render(
      <Tasks navigation={navigation} />
    );

    fireEvent.press(getAllByLabelText("task Delete icon")[0]);

    expect(navigation.navigate).toHaveBeenCalledWith("EditTask", {
      id: "1",
    });
  });

  
  it("applies filters when filter buttons are pressed", () => {
    const { getByText } = render(<Tasks navigation={navigation} />);

    fireEvent.press(getByText("Active"));
    expect(mockSetFilter).toHaveBeenCalledWith("active");

    fireEvent.press(getByText("Completed"));
    expect(mockSetFilter).toHaveBeenCalledWith("completed");
  });

 
  it("toggles sort order when sort button is pressed", () => {
    const { getByText } = render(<Tasks navigation={navigation} />);

    fireEvent.press(getByText("Sort (asc)"));

    expect(mockSetSort).toHaveBeenCalledWith("desc");
  });

 
  it("changes page using pagination buttons", () => {
    const { getByText } = render(<Tasks navigation={navigation} />);

    fireEvent.press(getByText("Next"));
    expect(mockSetPage).toHaveBeenCalledWith(2);

    fireEvent.press(getByText("Prev"));
    expect(mockSetPage).toHaveBeenCalledWith(0);
  });
});
