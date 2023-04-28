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
  const { backData, JWT, setJWT, role } = useContext(ProfilContext);

  return (
    <NavigationContainer>
      { JWT 
        &&
        <View style={styles.headerContainer}>
          <Pressable style={styles.deconnexion} onPress={() => setJWT("")}>
            <Text style={styles.headerText}>Déconnexion</Text>
          </Pressable>
          <Text style={[styles.headerText, {marginVertical: "8px"}]}>Status : {role}</Text>
        </View>
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
  headerContainer: {
    alignSelf: "flex-end"
  },
  deconnexion: {
    backgroundColor: "red",
    width: "200px",
    paddingVertical: "6px",
    textAlign: "center",
    borderRadius: "4px",
    margin: "10px",
  },
  headerText: {
    color: "white",
    fontWeight: "700"
  }
})