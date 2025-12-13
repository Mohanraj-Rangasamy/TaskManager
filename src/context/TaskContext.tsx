import { createContext, useContext } from "react";
import { useTasks } from "../hooks/useTasks";

const TaskContext = createContext(null);

export const TaskProvider = ({ children }) => {
  const taskStore = useTasks(); 
  return (
    <TaskContext.Provider value={taskStore}>
      {children}
    </TaskContext.Provider>
  );
};

export const useTaskContext = () => useContext(TaskContext);
