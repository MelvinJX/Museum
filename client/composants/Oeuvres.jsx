import { FlatList, Image, Pressable, StyleSheet, Text, View } from 'react-native'
import { useEffect, useState, useContext } from 'react';
import React from 'react'
import { ProfilContext } from '../contexts/profilContext';

const Oeuvres = ({navigation}) => {

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

  const deleteOeuvre = (id) => {
      fetch(`http://localhost:4010/oeuvre/${id}`, {method:"delete", headers: {"x-token": JWT}})
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
                <Image style={styles.image} source={{ uri : item.image , width: "100%", height : 300 }}/>
                <Text>{ item.auteur }</Text>
                <Text>{ item.dt_creation }</Text>
                <View style={{flexDirection: "row", justifyContent: "space-around", marginTop: "6px"}}>
                  <Pressable style={styles.delete} onPress={() => deleteOeuvre(item._id)}>
                    <Text style={{color:"white", textAlign:"center", padding: "8px"}}>Supprimer</Text>
                  </Pressable>
                  <Pressable style={styles.edit} onPress={() => navigation.navigate("Oeuvre", {id:item._id})}>
                    <Text style={{color:"white", textAlign:"center", padding: "8px"}}>Modifier</Text>
                  </Pressable>
                </View>
            </View>
          }
      />
    </View>
  )
}

export default Oeuvres;

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