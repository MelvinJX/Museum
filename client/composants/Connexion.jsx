import { View, Text, Button, TextInput } from 'react-native'
import React, { useEffect, useState, useContext } from 'react'
import { ProfilContext } from '../contexts/profilContext';

const Connexion = ({navigation}) => {

    const { setBackData, setJWT } = useContext(ProfilContext);

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
      })
    }

  return (
    <View>
      <Button title="Retourner à l'accueil" onPress={() => {navigation.navigate("Accueil")}}/>
      <TextInput value={email} onChangeText={(userValue) => setEmail(userValue)} placeholder="E-mail" style={{borderWidth: "1px", margin: "10px"}}/>
      <TextInput value={password} onChangeText={(userValue) => setPassword(userValue)} placeholder="Mot de passe" style={{borderWidth: "1px", margin: "10px"}}/>
      <Button title="Soumettre" onPress={submit}/>
    </View>
  )
}

export default Connexion