import { useEffect, useState, useCallback } from "react";
import { Task } from "../types/task";
import { loadTasks, saveTasks } from "../services/taskStorage";
import AsyncStorage from "@react-native-async-storage/async-storage";

const PAGE_SIZE = 5;

const STORAGE_KEY = "tasks";

export function useTasks() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [page, setPage] = useState(1);
  const [filter, setFilter] = useState<"all" | "active" | "completed">("all");
  const [sort, setSort] = useState<"asc" | "desc">("asc");

  // Load tasks on mount
  useEffect(() => {
    loadTasks().then(setTasks);
  }, []);

   useEffect(() => {
    loadTasksFromStorage();
  }, []);

  // Save tasks whenever they change
  useEffect(() => {
    saveTasks(tasks);
  }, [tasks]);

  const addTask = useCallback((title: string) => {
    const newTask: Task = {
      id: Date.now().toString(),
      title,
      completed: false,
    };
    setTasks((prev) => [...prev, newTask]);
  }, []);

  const loadTasksFromStorage = async () => {
  try {
    const stored = await AsyncStorage.getItem(STORAGE_KEY);
    if (stored) {
      setTasks(JSON.parse(stored));
    }
  } catch (err) {
    console.log("Error loading tasks:", err);
  }
};


  const toggleTask = useCallback((id: string) => {
    setTasks((prev) =>
      prev.map((t) =>
        t.id === id ? { ...t, completed: !t.completed } : t
      )
    );
  }, []);

   const updateTask = useCallback(async (id: string, updates: Partial<Task>) => {
 
    const updated = tasks.map(task =>
      task.id === id ? { ...task, ...updates } : task
    );

    await saveTasks(updated);
  }, [tasks]);

  const deleteTask = useCallback((id: string) => {
    setTasks((prev) => prev.filter((t) => t.id !== id));
  }, []);

  // Apply filter
  const filtered = tasks.filter((t) => {
    if (filter === "active") return !t.completed;
    if (filter === "completed") return t.completed;
    return true;
  });

  // Apply sorting
  const sorted = [...filtered].sort((a, b) => {
    return sort === "asc"
      ? a.title.localeCompare(b.title)
      : b.title.localeCompare(a.title);
  });

  // Apply pagination
  const paginated = sorted.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const totalPages = Math.ceil(sorted.length / PAGE_SIZE);

  return {
    tasks: paginated,
    addTask,
    updateTask,
    toggleTask,
    deleteTask,
    page,
    setPage,
    totalPages,
    filter,
    setFilter,
    sort,
    setSort,
    loadTasksFromStorage,
  };
}
