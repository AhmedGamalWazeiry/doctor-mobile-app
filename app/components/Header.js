import { View, Text, StyleSheet, TouchableOpacity,Image } from "react-native";
import React, { useState, useEffect } from "react";

export default function Header(props) {
  return (
    <View 
      style={styles.header}>
      <Text style={styles.text}>{props.children}</Text>
      <Image source={require('../assets/logo.png')}  style={styles.logoImage}/>
    </View>
  );
}
const styles = StyleSheet.create({
  text: {
    color: "white",
    fontSize: 28,
  },
  logoImage:{
    width:"50%",
    height:"80%",
    resizeMode: 'contain',
  },
  header:{
    flex:1,  
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width:"100%",
    
  }
});
