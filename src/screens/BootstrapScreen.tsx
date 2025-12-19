import { useEffect } from "react";
import { StyleSheet, View } from "react-native";
import { Text } from "react-native-paper";
import { useErrors } from "../context/ErrorContext";
import { fetchInitialData } from "../api/initApi";
// import { initRemoteConfig } from "../services/remoteConfig";

export default function BootstrapScreen({navigation}) {
  const { logError,errors } = useErrors();
  useEffect(() => {
    (async () => {
      try {
        // await initRemoteConfig();
        await fetchInitialData();
        navigation.navigate("Home"); 
      } catch (err: any) {
        logError(err.message || "Initial API failed");
      }
    })();
  }, []);

  return (
    <View style={styles.container} >
        <Text variant="displayLarge" >{errors.message }</Text>
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
