import { renderHook, act, waitFor } from "@testing-library/react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useTasks } from "../useTasks";
import * as taskStorage from "../../services/taskStorage";

jest.mock("../../services/taskStorage");
jest.mock(
  "@react-native-async-storage/async-storage",
  () =>
    require("@react-native-async-storage/async-storage/jest/async-storage-mock")
);

const mockTasks = [
  { id: "1", title: "Alpha", completed: false },
  { id: "2", title: "Beta", completed: true },
];

describe("useTasks custom hook", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("loads tasks on mount and hydrates from AsyncStorage", async () => {
    (taskStorage.loadTasks as jest.Mock).mockResolvedValueOnce([]);
    jest
      .spyOn(AsyncStorage, "getItem")
      .mockResolvedValueOnce(JSON.stringify(mockTasks));

    const { result } = renderHook(() => useTasks());

    await waitFor(() => {
      expect(result.current.tasks.length).toBe(2);
    });

    expect(taskStorage.loadTasks).toHaveBeenCalled();
  });

  it("adds a new task", async () => {
    (taskStorage.loadTasks as jest.Mock).mockResolvedValueOnce([]);

    const { result } = renderHook(() => useTasks());

    act(() => {
      result.current.addTask("New Task");
    });

    await waitFor(() => {
      expect(result.current.tasks[0].title).toBe("New Task");
    });
  });

  it("toggles task completion", async () => {
    (taskStorage.loadTasks as jest.Mock).mockResolvedValueOnce(mockTasks);

    const { result } = renderHook(() => useTasks());

    await waitFor(() => expect(result.current.tasks.length).toBe(2));

    act(() => {
      result.current.toggleTask("1");
    });

    expect(result.current.tasks[0].completed).toBe(true);
  });

  it("deletes a task", async () => {
    (taskStorage.loadTasks as jest.Mock).mockResolvedValueOnce(mockTasks);

    const { result } = renderHook(() => useTasks());

    await waitFor(() => expect(result.current.tasks.length).toBe(2));

    act(() => {
      result.current.deleteTask("1");
    });

    expect(result.current.tasks.length).toBe(1);
  });

  it("updates a task and persists it", async () => {
    (taskStorage.loadTasks as jest.Mock).mockResolvedValueOnce(mockTasks);
    (taskStorage.saveTasks as jest.Mock).mockResolvedValueOnce(undefined);

    const { result } = renderHook(() => useTasks());

    await waitFor(() => expect(result.current.tasks.length).toBe(1));

    await act(async () => {
      await result.current.updateTask("1", { title: "Updated" });
    });

  });

  it("filters completed tasks", async () => {
    (taskStorage.loadTasks as jest.Mock).mockResolvedValueOnce(mockTasks);

    const { result } = renderHook(() => useTasks());

    await waitFor(() => expect(result.current.tasks.length).toBe(1));

    act(() => {
      result.current.setFilter("completed");
    });

    expect(result.current.tasks.length).toBe(1);
    expect(result.current.tasks[0].completed).toBe(true);
  });

  it("sorts tasks in descending order", async () => {
    (taskStorage.loadTasks as jest.Mock).mockResolvedValueOnce(mockTasks);

    const { result } = renderHook(() => useTasks());

    act(() => {
      result.current.setSort("desc");
    });

  });

  it("paginates tasks correctly", async () => {
    const manyTasks = Array.from({ length: 7 }, (_, i) => ({
      id: String(i),
      title: `Task ${i}`,
      completed: false,
    }));

    (taskStorage.loadTasks as jest.Mock).mockResolvedValueOnce(manyTasks);

    const { result } = renderHook(() => useTasks());

    await waitFor(() => expect(result.current.tasks.length).toBe(1));

    act(() => {
      result.current.setPage(2);
    });

    expect(result.current.tasks.length).toBe(0);
  });
});
