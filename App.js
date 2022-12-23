import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Music_Player from './Src/Screens/Music_Player';

export default function App() {
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <Music_Player />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
