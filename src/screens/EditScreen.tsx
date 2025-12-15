import { View, Text } from "react-native";
import { useTasks } from "../hooks/useTasks";
import { useState,useEffect } from "react";
import { styles } from "./Task.Style";
import ReusableButton from "../components/Reusable_Button";
import ReusableTextInput from "../components/Reusable_textInput";


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

      <ReusableTextInput
        value={title}
        onChangeText={setTitle}
        style={styles.editScreenInput}
      />

      <ReusableButton
        title="Save"
        onPress={() => {
          updateTask(id, { title });
            navigation.goBack();
        }}
      />
    </View>
  );
}
