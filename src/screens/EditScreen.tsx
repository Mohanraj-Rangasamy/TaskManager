import { View, Text, TextInput, Button } from "react-native";
import { useTasks } from "../hooks/useTasks";
import { useState,useEffect } from "react";
import { styles } from "./Task.Style";

export default function EditTask({ route, navigation }: any) {
  const { id } = route.params;
  const { tasks, updateTask } = useTasks();

  const task = tasks.find((t) => t.id === id);
    
  const [title, setTitle] = useState(task?.title);

  useEffect(() => {
  if (task) setTitle(task.title);
}, [task]);

  return (
    <View style={styles.editScreen}>
      <Text>Edit Task</Text>

      <TextInput
        value={title}
        onChangeText={setTitle}
        style={styles.editScreenInput}
      />

      <Button
        title="Save"
        onPress={() => {
          updateTask(id, { title });
            navigation.goBack();
        }}
      />
    </View>
  );
}
