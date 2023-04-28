import { View, Text, Button, TextInput, StyleSheet, Pressable } from 'react-native'
import React, { useEffect, useState, useContext } from 'react'
import { ProfilContext } from '../contexts/profilContext';

const Connexion = ({navigation}) => {

    const { setBackData, setJWT, setRole } = useContext(ProfilContext);

    const [ email, setEmail ] = useState("test@gmail.com");
    const [ password, setPassword ] = useState("Password0000");

    const submit = () => {
      const identifiant = { email, password }
      console.log(identifiant);
      fetch(`http://localhost:4010/login`, {method:"post", body: JSON.stringify(identifiant), headers: {"content-type":"application/json"}})
        .then(response => response.json())
        .then(data => {
          console.log(data)
          setBackData(data)
          setJWT(data.token)
          setRole(data.role)
      })
    }

  return (
    <View style={styles.container}>
      {/* <Button title="Retourner à l'accueil" onPress={() => {navigation.navigate("Accueil")}}/> */}
      <Text>E-mail</Text>
      <TextInput value={email} onChangeText={(userValue) => setEmail(userValue)} placeholder="E-mail" style={styles.textInput}/>
      <Text>Mot de passe</Text>
      <TextInput value={password} onChangeText={(userValue) => setPassword(userValue)} placeholder="Mot de passe" style={styles.textInput}/>
      <Pressable style={styles.button} onPress={submit}>
        <Text style={styles.textButton} >Soumettre</Text>
      </Pressable>
    </View>
  )
}

export default Connexion

const styles = StyleSheet.create({
  container: {
    width: "24%",
    margin: "auto",
  },
  textInput: {
    borderWidth: "1px",
    borderColor: "black",
    borderRadius: "4px",
    marginBottom: "10px",
    padding: "8px"
  },
  button: {
    padding: "8px",
    backgroundColor: "red",
    alignSelf: "flex-start",
    borderRadius: "4px",
    margin: "auto",
    marginTop: "10px",
    width: "50%"
  },
  textButton: {
    color: "white",
    textAlign: "center",
    fontWeight: "500"
  }
})