import React, { useState } from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";
import { Picker } from "@react-native-picker/picker";

const DoctorView = () => {
  const [selectedPatient, setSelectedPatient] = useState("");

  // Mock data for patients
  const mockPatients = [
    { id: 1, name: "Alice Brown", symptoms: "Headache", date: "2023-12-01" },
    { id: 2, name: "Bob Smith", symptoms: "Fever", date: "2023-12-02" },
    { id: 3, name: "Charlie Johnson", symptoms: "Cough", date: "2023-12-03" },
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Select Patient</Text>
      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={selectedPatient}
          onValueChange={(itemValue) => setSelectedPatient(itemValue)}
        >
          <Picker.Item label="Select a patient" value="" />
          {mockPatients.map((patient) => (
            <Picker.Item key={patient.id} label={patient.name} value={patient.name} />
          ))}
        </Picker>
      </View>

      <Text style={styles.label}>Patient Details</Text>
      <View style={styles.grid}>
        <View style={styles.gridHeader}>
          <Text style={styles.gridHeaderText}>Patient Name</Text>
          <Text style={styles.gridHeaderText}>Symptoms</Text>
          <Text style={styles.gridHeaderText}>Date</Text>
        </View>
        <FlatList
          data={mockPatients.filter(
            (patient) => !selectedPatient || patient.name === selectedPatient
          )}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View style={styles.gridRow}>
              <Text style={styles.gridCell}>{item.name}</Text>
              <Text style={styles.gridCell}>{item.symptoms}</Text>
              <Text style={styles.gridCell}>{item.date}</Text>
            </View>
          )}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f5f5f5",
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
    fontWeight: "bold",
  },
  pickerContainer: {
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 20,
    backgroundColor: "#fff",
  },
  grid: {
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 5,
    overflow: "hidden",
  },
  gridHeader: {
    flexDirection: "row",
    backgroundColor: "#ddd",
    padding: 10,
  },
  gridHeaderText: {
    flex: 1,
    fontWeight: "bold",
    textAlign: "center",
  },
  gridRow: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    padding: 10,
  },
  gridCell: {
    flex: 1,
    textAlign: "center",
  },
});

export default DoctorView;
