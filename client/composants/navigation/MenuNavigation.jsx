import { Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'

import { NavigationContainer } from "@react-navigation/native"
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import ProfilNavigation from './ProfilNavigation';
import { useContext } from 'react';

import Accueil from '../Accueil';
import Connexion from '../Connexion';
import { ProfilContext } from "../../contexts/profilContext";

const Menu = createBottomTabNavigator();

const MenuNavigation = () => {
  const { backData, JWT, setJWT } = useContext(ProfilContext);

  return (
    <NavigationContainer>
      { JWT 
        &&
        <Pressable style={styles.deconnexion} onPress={() => setJWT("")}>
          <Text style={styles.deconnexionText}>Déconnexion</Text>
        </Pressable>
      }

        <Menu.Navigator screenOptions={{
        tabBarIconStyle : { display : "none" },
        tabBarActiveTintColor : "white",
        tabBarActiveBackgroundColor : "rgb(55, 55, 55)",
        }}>
        <Menu.Screen name="Accueil" component={ Accueil } />
        { JWT
        ?
        <Menu.Screen name="Profil" component={ ProfilNavigation }/>
        :
        <Menu.Screen name="Connexion" component={ Connexion } />
        }
        </Menu.Navigator>
    </NavigationContainer>
  )
}

export default MenuNavigation

const styles = StyleSheet.create({
  deconnexion: {
    backgroundColor: "red",
    width: "200px",
    paddingVertical: "6px",
    textAlign: "center",
    borderRadius: "4px",
    margin: "10px",
    alignSelf: "flex-end"
  },
  deconnexionText: {
    color: "white",
    fontWeight: "700"
  }
})