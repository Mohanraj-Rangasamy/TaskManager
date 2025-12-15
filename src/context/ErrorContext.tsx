import { createContext, useContext, useState, ReactNode } from "react";

export interface LoggedError {
  id: string;
  message: string;
  time: string;
}

interface ErrorContextType {
  errors: LoggedError[];
  logError: (msg: string) => void;
}

const ErrorContext = createContext<ErrorContextType | undefined>(undefined);

export const ErrorProvider = ({ children }: { children: ReactNode }) => {
  const [errors, setErrors] = useState<LoggedError[]>([]);
  const logError = (message: string) => {
    const newError = {
      id: Date.now().toString(),
      message,
      time: new Date().toISOString()
    };
    setErrors(prev => [newError, ...prev]);
  };

  return (
    <ErrorContext.Provider value={{ errors, logError }}>
      {children}
    </ErrorContext.Provider>
  );
};

export const useErrors = () => {
  const ctx = useContext(ErrorContext);
  
  if (!ctx) throw new Error("useErrors must be used inside ErrorProvider");
  return ctx;
};
