import  { useState, useEffect, useCallback } from "react";
import { useTheme } from "react-native-paper";
import { useIsFocused } from "@react-navigation/native";
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useTaskContext } from "../context/TaskContext";
import TasksView from "./TaskView"; 
import { loadTasks } from "../services/taskStorage";
import { useAuth } from "../hooks/useAuth";

type RootStackParamList = {
  Tasks: undefined;             
  TaskDetail: { id: string };   
  EditTask: { id: string }; // Added this based on your navigation call
};

type Props = NativeStackScreenProps<RootStackParamList, 'Tasks'>;

export default function Task({ navigation }: Props) {
  const isFocused = useIsFocused();
  const { colors } = useTheme();
  const [input, setInput] = useState("");
  
  const {
    tasks, 
    addTask, 
    setTasks,
    toggleTask, 
    deleteTask, 
    sort, 
    setSort, 
    setFilter, 
    page, 
    setPage, 
    totalPages
  } = useTaskContext();

  const { user } = useAuth();
  const userId = user?.id || "guest";

  useEffect(() => {
    if (isFocused)loadTasks(userId).then(setTasks)
  }, [isFocused, loadTasks]);

  const handleAddTask = useCallback(() => {
    if (input.trim()) {
      addTask(input);
      setInput("");
    }
  }, [input, addTask]);

  const handleEditTask = (id: string) => {
    navigation.navigate("EditTask", { id });
  };

  return (
    <TasksView
      tasks={tasks}
      input={input}
      setInput={setInput}
      colors={colors}
      sort={sort}
      page={page}
      totalPages={totalPages}
      onAddTask={handleAddTask}
      onToggleTask={toggleTask}
      onDeleteTask={deleteTask}
      onEditTask={handleEditTask}
      onSetFilter={setFilter}
      onToggleSort={() => setSort(sort === "asc" ? "desc" : "asc")}
      onPrevPage={() => setPage(page - 1)}
      onNextPage={() => setPage(page + 1)}
    />
  );
}