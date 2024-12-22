import { Text, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";

export default function CustomButton({ onPress, text }) {
  return (
    <TouchableOpacity onPress={onPress} style={styles.button}>
      <Text style={styles.buttonText}>{text}</Text>
    </TouchableOpacity>
  );
}
const styles = StyleSheet.create({
  button: {
    backgroundColor: "#26c6da",
    borderRadius: 6,
    elevation: 10,
    paddingVertical: 15,
    paddingHorizontal: 30,
    minWidth: 225,
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
    textTransform: "uppercase",
    fontSize: 16,
    textAlign: "center",
  },
});
