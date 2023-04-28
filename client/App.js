import { StatusBar } from 'expo-status-bar';
import { Button, StyleSheet, Text, View } from 'react-native';

import { ProfilContextProvider } from './contexts/profilContext';
import MenuNavigation from './composants/navigation/MenuNavigation';

export default function App() {

  return (
    <View style={styles.container}>
      <ProfilContextProvider>
        <MenuNavigation />
      </ProfilContextProvider>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#262626",
  },
});
