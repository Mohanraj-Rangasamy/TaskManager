import { View, FlatList, Image, Pressable } from "react-native";
import { Text } from "react-native-paper";
import { styles } from "./Task.Style";
import {ReusableButton,ReusableTextInput} from "@components";

export interface TaskItem {
  id: string;
  title: string;
  completed: boolean;
}

interface TasksViewProps {
  tasks: TaskItem[];
  input: string;
  setInput: (text: string) => void;
  colors: any;
  sort: string;
  page: number;
  totalPages: number;
  onAddTask: () => void;
  onToggleTask: (id: string) => void;
  onDeleteTask: (id: string) => void;
  onEditTask: (id: string) => void;
  onSetFilter: (filter: "all" | "active" | "completed") => void;
  onToggleSort: () => void;
  onPrevPage: () => void;
  onNextPage: () => void;
}

export default function TasksView(props: TasksViewProps) {
  const { 
    tasks, input, setInput, colors, sort, page, totalPages,
    onAddTask, onToggleTask, onDeleteTask, onEditTask, 
    onSetFilter, onToggleSort, onPrevPage, onNextPage 
  } = props;

  const renderItem = ({ item }:{item: TaskItem}) => (
          <View style={styles.listItem}>
            <Text
              onPress={() => onToggleTask(item.id)}
              style={[
                styles.listText,
                { textDecorationLine: item.completed ? "line-through" : "none" }
              ]}
            >
              {item.title}
            </Text>
            
            <Pressable 
                accessible={true}
                accessibilityLabel={'delete task'}
                accessibilityRole={'imagebutton'}
                style={styles.updateDelete} 
                onPress={() => onDeleteTask(item.id)}
            >
              <Image style={styles.image} source={require('../../assets/delete_1.png')} />
            </Pressable>

            <Pressable 
                accessible={true}
                accessibilityLabel={'edit task'}
                accessibilityRole={'imagebutton'}
                style={styles.updateDelete} 
                onPress={() => 
                onEditTask(item.id)}
            >
              <Image style={styles.image} source={require('../../assets/edit.png')} />
            </Pressable>
          </View>
        )

  return (
    <View style={styles.container}>
      <Text variant="displayLarge" style={{ color: colors.primary }}>Tasks</Text>
      
      <ReusableTextInput
        placeholder="New Task"
        value={input}
        onChangeText={setInput}
        style={styles.addTaskInput}
      />

      <ReusableButton title="Add Task" onPress={onAddTask} />

      <View style={styles.allActive}>
        <ReusableButton title="All" onPress={() => onSetFilter("all")} />
        <ReusableButton title="Active" onPress={() => onSetFilter("active")} />
        <ReusableButton title="Completed" onPress={() => onSetFilter("completed")} />
      </View>

      {tasks && tasks.length > 1 && (
        <ReusableButton title={`Sort (${sort})`} onPress={onToggleSort} />
      )}

      <FlatList
        data={tasks}
        keyExtractor={(t) => t.id}
        renderItem={renderItem}
      />

      <View style={styles.paginationContainer}>
        <ReusableButton title="Prev" disabled={page <= 1} onPress={onPrevPage} />
        <Text style={styles.paginationText}>Page {page} / {totalPages}</Text>
        <ReusableButton title="Next" disabled={page >= totalPages} onPress={onNextPage} />
      </View>
    </View>
  );
}