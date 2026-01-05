import { useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import { useErrors } from "../context/ErrorContext";
import { fetchInitialData } from "../api/initApi";

export default function BootstrapScreen({navigation}) {
  const { logError,errors } = useErrors();
  useEffect(() => {
    (async () => {
      try {
        await fetchInitialData();
        navigation.navigate("Home"); 
      } catch (err: any) {
        logError(err.message || "Initial API failed");
      }
    })();
  }, []);

  return (
    <View style={styles.container} >
        <Text style={styles.text}>{errors.message }</Text>
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    text:{
        fontSize:24,
        fontWeight:'bold',
        color:'red'
    }
})
