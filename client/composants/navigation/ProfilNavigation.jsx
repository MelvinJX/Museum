import { Button, FlatList, Image, Pressable, StyleSheet, Text, TouchableWithoutFeedback, View } from 'react-native'
import { useEffect, useState, useContext } from 'react';
import React from 'react'
import { ProfilContext } from '../../contexts/profilContext';

const ProfilNavigation = () => {

  const { JWT, setJWT } = useContext(ProfilContext)

  const [ backData, setBackData ] = useState([]);
  const [ recherche, setRecherche ] = useState("oeuvre/all");

  const getBack = () => {

  }
  
  useEffect(function(){
    fetch(`http://localhost:4010/${recherche}`)
      .then(response => response.json())
      .then(data => {
        setBackData(data)
      })
  }, [recherche, backData])

  const deleteOeuvre = (id) => {
      fetch(`http://localhost:4010/oeuvre/${id}`, {method:"delete", headers: {"x-token": JWT }})
      .then(response => response.json())
      .then(data => {
        setBackData(data)
      })
  }

  return (
    <View style={styles.box}>
      { backData.length == 0 && <Text style={styles.emptyData}>Aucunes oeuvres pour le moment...</Text>}
      <FlatList 
          data={ backData }
          renderItem={({ item }) => 
            <View style={styles.oeuvre}>
                <Text>{ item.nom }</Text>
                <Text>{ item.description }</Text>
                <TouchableWithoutFeedback onPress={() => setRecherche(`oeuvre/${item._id}`)}>
                  <Image style={styles.image} source={{ uri : item.image , width: "100%", height : 300 }}/>
                </TouchableWithoutFeedback>
                <Text>{ item.auteur }</Text>
                <Text>{ item.dt_creation }</Text>
                <Button color="red" title={`Supprimer ${item.nom}`} onPress={() => deleteOeuvre(item._id)} />
            </View>
          }
      />
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
  image: {
    cursor: "pointer"
  },
  emptyData: {
    textAlign: "center",
    fontSize: "30px"
  }
})