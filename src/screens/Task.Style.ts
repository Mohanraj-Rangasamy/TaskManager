import { StyleSheet } from "react-native";
import { typography } from "../theme/theme";

export const styles = StyleSheet.create({

container: { 
    padding: 20, 
    margin:10, 
    borderRadius:8 
},
containerText:{ 
    fontSize: typography.textLarge.fontSize
},
newUITag:{
    marginTop:5,
    fontSize: typography.bodyMedium.fontSize
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
},
allActive:{ 
  flexDirection: "row",
  justifyContent:'space-around', 
  marginVertical: 10 
},
paginationContainer:{ 
  flexDirection: "row", 
  marginTop: 10, 
  justifyContent:'space-evenly' 
},
paginationText:{ 
  marginHorizontal: 20 
}
});
