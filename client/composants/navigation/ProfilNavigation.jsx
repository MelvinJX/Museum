import { Button, FlatList, Image, Pressable, StyleSheet, Text, TextInput, TouchableWithoutFeedback, View } from 'react-native'
import { useEffect, useState, useContext } from 'react';
import React from 'react'
import { ProfilContext } from '../../contexts/profilContext';

const ProfilNavigation = () => {

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

  const deleteOeuvre = (id) => {
      fetch(`http://localhost:4010/oeuvre/${id}`, {method:"delete", headers: {"x-token": JWT}})
      .then(response => response.json())
      .then(data => {
        setBackData(data)
      })
  }

  const editOeuvre = (id) => {
    const champs = { nom, description, image, auteur }
    // console.log(champs)
    fetch(`http://localhost:4010/oeuvre/${id}`, {method:"put", body: JSON.stringify(champs), headers: {"x-token": JWT, "content-type":"application/json"}})
    .then(response => response.json())
    .then(data => {
        setBackData(data)
        setRecherche("oeuvre/all")
    })
  }

  return (
    <View style={styles.box}>
      { backData.length == 0 && <Text style={styles.emptyData}>Aucunes oeuvres pour le moment...</Text>}
      { recherche == "oeuvre/all" 
        ?
      <FlatList 
          data={ backData }
          renderItem={({ item }) => 
            <View style={styles.oeuvre}>
                <Text>{ item.nom }</Text>
                <Text>{ item.description }</Text>
                <Image style={styles.image} source={{ uri : item.image , width: "100%", height : 300 }}/>
                <Text>{ item.auteur }</Text>
                <Text>{ item.dt_creation }</Text>
                <View style={{flexDirection: "row", justifyContent: "space-around", marginTop: "6px"}}>
                  <Pressable style={styles.delete} onPress={() => deleteOeuvre(item._id)}>
                    <Text style={{color:"white", textAlign:"center", padding: "8px"}}>Supprimer</Text>
                  </Pressable>
                  <Pressable style={styles.edit} onPress={() => setRecherche(`oeuvre/${item._id}`)}>
                    <Text style={{color:"white", textAlign:"center", padding: "8px"}}>Modifier</Text>
                  </Pressable>
                </View>
            </View>
          }
      />
      :
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
      }
    </View>
  )
}

export default ProfilNavigation;

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
    backgroundColor: "red",
    width: "40%",
    borderRadius: "4px",
    marginVertical: "4px",
    alignSelf: "flex-start"
  },
  edit: {
    backgroundColor: "blue",
    width: "40%",
    borderRadius: "4px",
    marginVertical: "4px",
    alignSelf: "flex-start"
  }
})