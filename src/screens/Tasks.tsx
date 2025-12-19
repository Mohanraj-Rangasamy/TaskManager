import  { useState,useEffect } from "react";
import { View, FlatList, Image, Pressable } from "react-native";
import { Text, useTheme  } from "react-native-paper";
import { useIsFocused } from "@react-navigation/native";
import { useTaskContext } from "../context/TaskContext";
import { styles } from "./Task.Style";
import ReusableButton from "../components/Reusable_Button";
import ReusableTextInput from "../components/Reusable_textInput";
// import { getEnableNewUI } from "../services/remoteConfig";


export default function Tasks({navigation}:any) {
  // const showNewUI = getEnableNewUI();
  const isFocused = useIsFocused();
  const { colors } = useTheme();
  const {
    tasks,
    addTask,
    toggleTask,
    deleteTask,
    sort,
    setSort,
    loadTasksFromStorage,
    setFilter,
    page,
    setPage,
    totalPages
  } = useTaskContext();

  const [input, setInput] = useState("");

  useEffect(() => {
    if (isFocused) {
      loadTasksFromStorage(); 
    }
  }, [isFocused]);

  return (
    <View style={styles.container}>
      <Text variant="displayLarge" style={{ color: colors.primary }}>Tasks</Text>
      {/* {showNewUI && <Text style={styles.newUITag}>New UI Enabled</Text>} */}
      <ReusableTextInput
        placeholder="New Task"
        value={input}
        onChangeText={setInput}
        style={styles.addTaskInput}
      />

      <ReusableButton
        title="Add Task"
        onPress={() => {
          if (input.trim()) {
            addTask(input);
            setInput("");
          }
        }}
      />

       {/* Filters */}
      <View style={styles.allActive}>
        <ReusableButton title="All" onPress={() => setFilter("all")} />
        <ReusableButton title="Active" onPress={() => setFilter("active")} />
        <ReusableButton title="Completed" onPress={() => setFilter("completed")} />
      </View>

      {/* Sort */}
     {tasks && tasks.length > 1 && (
        <ReusableButton
          title={`Sort (${sort})`}
          onPress={() => setSort(sort === "asc" ? "desc" : "asc")}
        />
      )}


      <FlatList
        data={tasks}
        keyExtractor={(t) => t.id}
        renderItem={({ item }) => {
        return (
          <View
            style={styles.listItem}
          >
            
            <Text
              onPress={() => toggleTask(item.id)}
              accessible
              style={[
              styles.listText,
              { textDecorationLine: item.completed ? "line-through" : "none" }
            ]}

            >
              {item.title}
            </Text>
            <Pressable 
              accessible={true}
              accessibilityRole={'image'}
              accessibilityLabel={'task update icon'}
              style={styles.updateDelete}
              onPress={()=>deleteTask(item.id)}  
            >
            <Image
              resizeMode='contain'
              style={styles.image}
              source={require('../../assets/delete_1.png')}
            />
            </Pressable>
             <Pressable 
              accessible={true}
              accessibilityRole={'image'}
              accessibilityLabel={'task Delete icon'}
              style={styles.updateDelete}
              onPress={() =>navigation.navigate("EditTask", { id: item.id })}  
            >
            <Image
              resizeMode='contain'
              style={styles.image}
              source={require('../../assets/edit.png')}
            />
            </Pressable>

             
      
          </View>
        )}}
      />
      {/* Pagination */}
        <View style={styles.paginationContainer}>
        <ReusableButton
          title="Prev"
          disabled={page <= 1}
          onPress={() => setPage(page - 1)}
        />
        <Text style={styles.paginationText}>
          Page {page} / {totalPages}
        </Text>
        <ReusableButton
          title="Next"
          disabled={page >= totalPages}
          onPress={() => setPage(page + 1)}
        />
      </View>
    </View>
  );
}
