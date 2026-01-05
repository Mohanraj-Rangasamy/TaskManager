import AsyncStorage from "@react-native-async-storage/async-storage";
import { Task,StorageKeys } from "../types/task";


export async function loadTasks(userId: string): Promise<Task[]> {
  const userSpecificKey = `${StorageKeys.TASKS_PREFIX}${userId}`;
  const data = await AsyncStorage.getItem(userSpecificKey);
  return data ? JSON.parse(data) : [];
}

export async function saveTasks(tasks: Task[], userId: string) {
  const userSpecificKey = `${StorageKeys.TASKS_PREFIX}${userId}`;
  
  await AsyncStorage.setItem(userSpecificKey, JSON.stringify(tasks));
}
