import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

const RoleSelectionView = ({ navigation }) => {
  // Reusable function to handle navigation
  const handleRoleSelect = (role) => {
    navigation.replace(role);
  };

  // Reusable button component
  const RoleButton = ({ title, onPress }) => (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <Text style={styles.buttonText}>{title}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Choose Your Role</Text>

      {/* Doctor Role Button */}
      <RoleButton title="Act as Doctor" onPress={() => handleRoleSelect("Doctor")} />

      {/* Patient Role Button */}
      <RoleButton title="Act as Patient" onPress={() => handleRoleSelect("Patient")} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#f5f5f5", // Light background for better aesthetics
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 30,
    textAlign: "center",
  },
  button: {
    width: "80%",
    backgroundColor: "#007BFF", // Blue color for the button
    padding: 15,
    borderRadius: 8,
    marginBottom: 15,
    alignItems: "center",
  },
  buttonText: {
    fontSize: 18,
    color: "#fff", // White text for contrast
    fontWeight: "bold",
  },
});

export default RoleSelectionView;
