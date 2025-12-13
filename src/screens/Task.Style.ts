import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({

container: { 
    padding: 20, 
    margin:10, 
    borderRadius:8 
},
containerText:{ 
    fontSize: 20 
},
addTaskInput:{ 
    borderWidth: 1, 
    marginTop: 10, 
    padding: 8 
},
listItem:{
    flex:1,
    padding: 10,
    borderBottomWidth: 1,
    flexDirection: "row",
},
listText:{
    flex:2
},
editScreen:{ 
  padding: 20 
},
editScreenInput:{
  borderWidth: 1,
  padding: 10,
  marginVertical: 10,
},
image:{
  width:30,
  height:30
},
updateDelete:{
  flex:1
}
});
