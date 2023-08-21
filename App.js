import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import MusicPlayer from './Src/Screens/Music_Player';

export default function App() {

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <MusicPlayer />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
