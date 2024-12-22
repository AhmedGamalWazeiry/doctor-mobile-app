import React, { useState } from "react";
import { View, Text, Button, StyleSheet, TextInput, Platform } from "react-native";
import { Picker } from "@react-native-picker/picker";
import DateTimePicker from "@react-native-community/datetimepicker";

const PatientView = () => {
  const [symptoms, setSymptoms] = useState("");
  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [selectedDoctor, setSelectedDoctor] = useState("");

  const mockDoctors = [
    { id: 1, name: "Dr. John Doe" },
    { id: 2, name: "Dr. Jane Smith" },
    { id: 3, name: "Dr. Emily Davis" },
  ];

  const handleDateChange = (event, selectedDate) => {
    setShowDatePicker(false); // Hide the date picker
    if (selectedDate) {
      setDate(selectedDate); // Update the date
    }
  };

  const handleSubmit = () => {
    console.log("Symptoms:", symptoms);
    console.log("Date:", date.toDateString());
    console.log("Selected Doctor:", selectedDoctor);
    // Add further handling logic here (e.g., send data to backend)
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Symptoms</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter symptoms"
        value={symptoms}
        onChangeText={setSymptoms}
      />

      <Text style={styles.label}>Date</Text>
      <View style={styles.datePickerContainer}>
        <Text style={styles.dateText}>{date.toDateString()}</Text>
        <Button title="Select Date" onPress={() => setShowDatePicker(true)} />
      </View>

      {showDatePicker && (
        <DateTimePicker
          value={date}
          mode="date"
          display={Platform.OS === "ios" ? "spinner" : "calendar"}
          onChange={handleDateChange}
        />
      )}

      <Text style={styles.label}>Select Doctor</Text>
      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={selectedDoctor}
          onValueChange={(itemValue) => setSelectedDoctor(itemValue)}
        >
          <Picker.Item label="Select a doctor" value="" />
          {mockDoctors.map((doctor) => (
            <Picker.Item key={doctor.id} label={doctor.name} value={doctor.name} />
          ))}
        </Picker>
      </View>

      <Button title="Submit" onPress={handleSubmit} />
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
  input: {
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 20,
    paddingHorizontal: 10,
    backgroundColor: "#fff",
  },
  datePickerContainer: {
    marginBottom: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  dateText: {
    fontSize: 16,
  },
  pickerContainer: {
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 20,
    backgroundColor: "#fff",
  },
});

export default PatientView;
