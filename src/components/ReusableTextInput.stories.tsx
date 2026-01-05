import { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import ReusableTextInput from '../components/Reusable_textInput';
import { lightTheme } from '../theme/theme';

export default {
  title: 'Components/ReusableTextInput',
  component: ReusableTextInput,
};

// Basic Placeholder Input
export const Basic = () => (
  <View style={styles.container}>
    <ReusableTextInput 
      placeholder="Enter your name" 
      style={styles.input} 
    />
  </View>
);

// Password Input (Secure Entry)
export const Password = () => (
  <View style={styles.container}>
    <ReusableTextInput 
      placeholder="Enter password" 
      secureTextEntry={true} 
      style={styles.input} 
    />
  </View>
);

// Pre-filled and Capitalized
export const PreFilled = () => (
  <View style={styles.container}>
    <ReusableTextInput 
      value="Test user" 
      autoCapitalize="characters"
      style={styles.input} 
    />
  </View>
);

// Interactive State (Testing typing)
export const Interactive = () => {
  const [text, setText] = useState('');
  return (
    <View style={styles.container}>
      <ReusableTextInput
        placeholder="Type something here..."
        value={text}
        onChangeText={setText}
        style={styles.input}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    justifyContent: 'center',
    flex: 1,
  },
  input: {
    borderWidth: 1,
    borderColor: lightTheme.colors.inputBackground,
    padding: 12,
    borderRadius: 8,
    fontSize: lightTheme.fonts.bodyMedium.fontSize
  },
});