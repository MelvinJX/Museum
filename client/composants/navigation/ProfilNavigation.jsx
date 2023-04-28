import { Button, FlatList, Image, Pressable, StyleSheet, Text, TextInput, TouchableWithoutFeedback, View } from 'react-native'
import { useEffect, useState, useContext } from 'react';
import React from 'react'
import { ProfilContext } from '../../contexts/profilContext';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Oeuvres from '../Oeuvres';
import Oeuvre from '../Oeuvre';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Navigate = createNativeStackNavigator();

const ProfilNavigation = () => {

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
      <Navigate.Navigator>
        <Navigate.Screen name="Oeuvres" component={Oeuvres} />
        <Navigate.Screen name="Oeuvre" component={Oeuvre} />
      </Navigate.Navigator>
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