export interface Task {
  id: string;
  title: string;
  due?: string;
  completed: boolean;
  notes?: string;
}
