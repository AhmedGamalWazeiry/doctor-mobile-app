import {
    View,
    Text,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    Image,
    ActivityIndicator,
  } from "react-native";
  import React, { useEffect, useState } from "react";
  import { globalStyles } from "../styles/global";
  import * as SecureStore from "expo-secure-store";
  import { domain, friendlyHttpStatus } from "../globalConstants";
  
  export default function Login({ navigation }) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState(""); // New state for confirm password
    const [errorNonfield, setErrorNonfield] = useState("");
    const [errorUsername, setErrorUsername] = useState("");
    const [errorPassword, setErrorPassword] = useState("");
    const [errorConfirmPassword, setErrorConfirmPassword] = useState(""); // New error state
    const [loading, setLoading] = useState(true);
  
    const handleSignUP = () => {
      // Check if password and confirmPassword match
      if (password !== confirmPassword) {
        setErrorConfirmPassword("Passwords do not match");
        return; // Don't proceed if passwords don't match
      } else {
        setErrorConfirmPassword(""); // Clear the error if passwords match
      }
  
      const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username: username, password: password }),
      };
      let status = 0;
      fetch(domain + "/users/register/", requestOptions)
        .then((response) => {
          status = response.status;
          console.log(status);
          if (status !== 200 && status != 400) {
            throw status;
          }
          return response.json();
        })
        .then((data) => {
          setErrorUsername("");
          setErrorPassword("");
          setErrorNonfield("");
          if (status != 200) {
            if (data.username) setErrorUsername(data.username);
            if (data.password) setErrorPassword(data.password);
            if (data.non_field_errors) setErrorNonfield(data.non_field_errors);
            if (data.message) setErrorNonfield(data.message);
          } else {
            const token = data.token;
  
            return SecureStore.setItemAsync("location_token", token);
          }
        })
        .then(() => {
          if (status == 200) {
            navigation.replace("RoleSelection");
          }
        })
        .catch((e) => {
          console.log(e);
          if (e == 404) {
            setErrorNonfield("Can't access server");
          } else {
            setErrorNonfield(friendlyHttpStatus[e]);
          }
        });
    };
  
    const handleChangeUsername = (newusername) => {
      setUsername(newusername);
    };
  
    const handleChangePassword = (newpassword) => {
      setPassword(newpassword);
    };
  
    const handleChangeConfirmPassword = (newconfirmPassword) => {
      setConfirmPassword(newconfirmPassword); // Handle confirm password change
    };
  
    useEffect(() => {
      let token, status;
      SecureStore.getItemAsync("location_token")
        .then((value) => {
          token = value;
          fetch(domain + "/api/users/get_user_data/", {
            method: "GET",
            headers: {
              "Content-type": "application/json",
              Authorization: "Token " + token,
            },
          })
            .then((response) => {
              status = response.status;
              if (status != 200) {
                throw status;
              } else {
                navigation.replace("RoleSelection");
              }
              setLoading(false);
            })
            .catch((e) => {
              setLoading(false);
            });
        })
        .catch((e) => {
          setLoading(false);
        });
    }, []);
  
    if (loading) {
      return (
        <View style={styles.announcement}>
          <ActivityIndicator size="large" />
        </View>
      );
    }
  
    return (
      <View style={styles.form}>
        <Image source={require("../assets/logo.png")} style={styles.logoImage} />
        {errorNonfield != "" && (
          <Text style={styles.errorText}>{errorNonfield}</Text>
        )}
        <Text style={styles.label}>Sign UP</Text>
        <Text style={styles.fieldLabel}>Username*</Text>
        <TextInput
          style={globalStyles.textInput}
          placeholder="Enter your username"
          value={username}
          onChangeText={handleChangeUsername}
        />
  
        {errorUsername != "" && (
          <Text style={styles.errorText}>{errorUsername}</Text>
        )}
        <Text style={styles.fieldLabel}>Password*</Text>
        <TextInput
          secureTextEntry={true}
          style={globalStyles.textInput}
          placeholder="Enter your password"
          value={password}
          onChangeText={handleChangePassword}
        />
        {errorPassword != "" && (
          <Text style={styles.errorText}>{errorPassword}</Text>
        )}
  
        <Text style={styles.fieldLabel}>Confirm Password*</Text>
        <TextInput
          secureTextEntry={true}
          style={globalStyles.textInput}
          placeholder="Confirm your password"
          value={confirmPassword}
          onChangeText={handleChangeConfirmPassword}
        />
        {errorConfirmPassword != "" && (
          <Text style={styles.errorText}>{errorConfirmPassword}</Text>
        )}
  
        <TouchableOpacity style={styles.button} onPress={handleSignUP}>
          <Text style={{ color: "white" }}>Sign Up</Text>
        </TouchableOpacity>
      </View>
    );
  }
  
  const styles = StyleSheet.create({
    form: {
      flex: 1,
      backgroundColor: "#fff",
      alignItems: "center",
      justifyContent: "center",
      padding: 40,
    },
    button: {
      margin: 30,
      padding: 10,
      backgroundColor: "#26c6da",
      width: "50%",
      alignItems: "center",
      borderRadius: 6,
      elevation: 10,
    },
    errorText: {
      color: "red",
      borderRadius: 6,
      borderColor: "red",
      borderWidth: 1,
      padding: 10,
    },
    logoImage: {
      width: "50%",
      height: "20%",
      resizeMode: "contain",
    },
    label: {
      fontSize: 40,
      marginBottom: 50,
      fontWeight: "500",
    },
    fieldLabel: {
      textAlign: "left",
      width: "100%",
    },
    announcement: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
      padding: 40,
    },
  });
  