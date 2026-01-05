import { useEffect, useState, useCallback, useMemo } from "react";
import { Task } from "../types/task";
import { loadTasks, saveTasks } from "../services/taskStorage";

const PAGE_SIZE = 5;


export function useTasks(userId: string = "default_user") {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [hydrated, setHydrated] = useState(false);
  const [page, setPage] = useState(1);
  const [filter, setFilter] = useState<"all" | "active" | "completed">("all");
  const [sort, setSort] = useState<"asc" | "desc">("asc");

  const loadFromStorage = useCallback(async () => {
    const stored = await loadTasks(userId);
    setTasks(stored);
    setHydrated(true);
  }, [userId]);

  useEffect(() => {
    loadFromStorage();
  }, [loadFromStorage]);

  useEffect(() => {
    if (hydrated) {
      saveTasks(tasks, userId);
    }
  }, [tasks, hydrated, userId]);

  const addTask = useCallback((title: string) => {
    setTasks(prev => [...prev, { id: Date.now().toString(), title, completed: false }]);
  }, []);

  const toggleTask = useCallback((id: string) => {
    setTasks(prev => prev.map(t => t.id === id ? { ...t, completed: !t.completed } : t));
  }, []);

  const deleteTask = useCallback((id: string) => {
    setTasks(prev => prev.filter(t => t.id !== id));
  }, []);

  const updateTask = useCallback((id: string, updates: Partial<Task>) => {
    setTasks(prev => prev.map(t => t.id === id ? { ...t, ...updates } : t));
  }, []);

  const filteredAndSorted = useMemo(() => {
    const result = tasks.filter(t => {
      if (filter === "active") return !t.completed;
      if (filter === "completed") return t.completed;
      return true;
    });

    return result.sort((a, b) => 
      sort === "asc" ? a.title.localeCompare(b.title) : b.title.localeCompare(a.title)
    );
  }, [tasks, filter, sort]);

  const paginated = useMemo(() => {
    return filteredAndSorted.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);
  }, [filteredAndSorted, page]);

  const totalPages = Math.ceil(filteredAndSorted.length / PAGE_SIZE);

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
    loadTasksFromStorage: loadFromStorage,
  };
}