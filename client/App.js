import { StatusBar } from 'expo-status-bar';
import { Button, FlatList, StyleSheet, Text, View } from 'react-native';
import { useEffect, useState } from 'react';

export default function App() {

  const [ backData, setBackData ] = useState({});

  useEffect(() => {
    fetch("http://localhost:4010/oeuvre/all")
      .then(response => response.json())
      .then(data => {
        setBackData(data);
        console.log(data);
      })
  }, [])

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
