import { View, Text } from "react-native";
import { useTasks } from "../hooks/useTasks";
import { useState,useEffect,useMemo, useCallback } from "react";
import { styles } from "./Task.Style";
import {ReusableButton,ReusableTextInput} from "@components";
import { AccessibilityRole } from "../types/task";


export default function EditTask({ route, navigation }: any) {
  const { id } = route.params;
  const { tasks, updateTask } = useTasks();

  const task = useMemo(() => {
    return tasks.find((t) => t.id === id);
  }, [tasks, id])
    
  const [title, setTitle] = useState(task?.title);

  useEffect(() => {
  if (task) setTitle(task.title);
}, [task]);

const handlePress = useCallback(() => {
    updateTask(id, { title });
    navigation.goBack();
},[id,title])

  return (
    <View 
      accessible = {true} 
      style={styles.editScreen}
    >
      <Text 
        accessibilityLabel={'edit task'} 
        accessibilityRole={AccessibilityRole.TEXT} 
      >
        Edit Task
      </Text>
      <ReusableTextInput
        accessible={true}
        value={title}
        onChangeText={setTitle}
        style={styles.editScreenInput}
      />

      <ReusableButton
        title="Save"
        onPress={handlePress}
      />
    </View>
  );
}
