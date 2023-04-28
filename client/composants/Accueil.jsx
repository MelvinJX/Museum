import { Button, FlatList, Image, Pressable, StyleSheet, Text, TouchableWithoutFeedback, View } from 'react-native'
import { useEffect, useState, useContext } from 'react';
import React from 'react'
import { ProfilContext } from '../contexts/profilContext';

const Accueil = () => {
  const { JWT } = useContext(ProfilContext)

  const [ backData, setBackData ] = useState([]);
  const [ recherche, setRecherche ] = useState("oeuvre/all");
  
  useEffect(function(){
    fetch(`http://localhost:4010/${recherche}`)
      .then(response => response.json())
      .then(data => {
        setBackData(data)
      })
  }, [recherche, backData])

  return (
    <View style={styles.box}>
      { recherche == "oeuvre/all" 
        ?
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
              </View>
            }
        />
        :
        <View style={styles.oeuvre}>
            <Text>{ backData.nom }</Text>
            <Text>{ backData.description }</Text>
            <TouchableWithoutFeedback onPress={() => setRecherche(`oeuvre/${backData._id}`)}>
              <Image style={styles.image} source={{ uri : backData.image , width: "100%", height : 300 }}/>
            </TouchableWithoutFeedback>
            <Text>{ backData.auteur }</Text>
            <Text>{ backData.dt_creation }</Text>
            <Button title="Retour à l'accueil" onPress={() => setRecherche(`oeuvre/all`)}/>
        </View>
      }
    </View>
  )
}

export default Accueil;

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
  deleteOeuvre: {
    backgroundColor: "red"
  }
})