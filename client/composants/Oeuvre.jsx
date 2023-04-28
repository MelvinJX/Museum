import { Button, FlatList, Image, Pressable, StyleSheet, Text, TextInput, TouchableWithoutFeedback, View } from 'react-native'
import { useEffect, useState, useContext } from 'react';
import React from 'react'
import { ProfilContext } from '../contexts/profilContext';

const Oeuvre = ({route}) => {

  const { JWT } = useContext(ProfilContext)

  const [ backData, setBackData ] = useState([]);
  const [ recherche, setRecherche ] = useState("oeuvre/all");

  const [ nom, setNom ] = useState("");
  const [ description, setDescription ] = useState("");
  const [ image, setImage ] = useState("");
  const [ auteur, setAuteur ] = useState("");
  
  useEffect(function(){
    fetch(`http://localhost:4010/${recherche}`)
      .then(response => response.json())
      .then(data => {
        setBackData(data)
      })
  }, [recherche, backData])

  const editOeuvre = (id) => {
    const champs = { nom, description, image, auteur }
    // console.log(champs)
    fetch(`http://localhost:4010/oeuvre/${route.params.id}`, {method:"put", body: JSON.stringify(champs), headers: {"x-token": JWT, "content-type":"application/json"}})
    .then(response => response.json())
    .then(data => {
        setBackData(data)
        setRecherche("oeuvre/all")
    })
  }

  return (
    <View style={styles.box}>
      { backData.length == 0 && <Text style={styles.emptyData}>Aucunes oeuvres pour le moment...</Text>}
      <View style={styles.editOeuvre.box}>
        <View>
          <Text>Nom</Text>
          <TextInput onChangeText={(userValue) => setNom(userValue)} placeholder={backData.nom} style={{borderWidth: "1px", margin: "10px"}}/>
          <Text>Description</Text>
          <TextInput onChangeText={(userValue) => setDescription(userValue)} placeholder={backData.description} style={{borderWidth: "1px", margin: "10px"}}/>
          <Text>Image</Text>
          <TextInput onChangeText={(userValue) => setImage(userValue)} placeholder={backData.image} style={{borderWidth: "1px", margin: "10px"}}/>
          <Text>Auteur</Text>
          <TextInput onChangeText={(userValue) => setAuteur(userValue)} placeholder={backData.auteur} style={{borderWidth: "1px", margin: "10px"}}/>
          <Button title="Soumettre" onPress={() => editOeuvre(backData._id)}/>
        </View>
      </View>
    </View>
  )
}

export default Oeuvre;

const styles = StyleSheet.create({
  box: {
    flex: 1
  },
  oeuvre: {
    flexWrap: "wrap",
    margin: 20,
    width: "400px",
    borderWidth: "1px"
  },
  editOeuvre: {
    flexWrap: "wrap",
    margin: 20,
    width: "400px",
    borderWidth: "1px"
  },
  image: {
    cursor: "pointer"
  },
  emptyData: {
    textAlign: "center",
    fontSize: "30px"
  },
  actionButton: {
    width: "30%",
    borderRadius: "4px"
  },
  delete: {
    backgroundColor: "#e82828",
    width: "40%",
    borderRadius: "4px",
    marginVertical: "4px",
    alignSelf: "flex-start"
  },
  edit: {
    backgroundColor: "#3271c2",
    width: "40%",
    borderRadius: "4px",
    marginVertical: "4px",
    alignSelf: "flex-start"
  }
})