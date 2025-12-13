import  { useState,useEffect } from "react";
import { View, Text, Button, TextInput, FlatList, Image, Pressable } from "react-native";
import { useIsFocused } from "@react-navigation/native";
import { useTaskContext } from "../context/TaskContext";
import { styles } from "./Task.Style";


export default function Tasks({navigation}:any) {

  const isFocused = useIsFocused()
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
      console.log("Tasks screen focused → refreshing tasks");
      loadTasksFromStorage(); 
    }
  }, [isFocused]);

  return (
    <View style={styles.container}>
      <Text style={styles.containerText}>Tasks</Text>

      <TextInput
        placeholder="New Task"
        value={input}
        onChangeText={setInput}
        style={styles.addTaskInput}
      />

      <Button
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
        <Button title="All" onPress={() => setFilter("all")} />
        <Button title="Active" onPress={() => setFilter("active")} />
        <Button title="Completed" onPress={() => setFilter("completed")} />
      </View>

      {/* Sort */}
     {tasks && tasks.length > 1 && (
        <Button
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
              style={[
              styles.listText,
              { textDecorationLine: item.completed ? "line-through" : "none" }
            ]}

            >
              {item.title}
            </Text>
            <Pressable 
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
              style={styles.updateDelete}
              onPress={() =>navigation.navigate("EditTask", { id: item.id })}  
            >
            <Image
              resizeMode='cover'
              style={styles.image}
              source={require('../../assets/edit.png')}
            />
            </Pressable>

             
      
          </View>
        )}}
      />
      {/* Pagination */}
        <View style={styles.paginationContainer}>
        <Button
          title="Prev"
          disabled={page <= 1}
          onPress={() => setPage(page - 1)}
        />
        <Text style={styles.paginationText}>
          Page {page} / {totalPages}
        </Text>
        <Button
          title="Next"
          disabled={page >= totalPages}
          onPress={() => setPage(page + 1)}
        />
      </View>
    </View>
  );
}
