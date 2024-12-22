import { createNativeStackNavigator } from "@react-navigation/native-stack";
// import Move from "../screens/move";
// import ViewEntity from "../screens/view";
// import { NavigationContainer } from "@react-navigation/native";
import Login from "../screens/login";
import SignUP from "../screens/signup";
import RoleSelection from "../screens/roleSelection";
import Patient from "../screens/patient";
import Doctor from "../screens/doctor";
// import { createDrawerNavigator } from "@react-navigation/drawer";
import { Button, StyleSheet, Text, View } from "react-native";

const Stack = createNativeStackNavigator();

function HomeStack() {
  return (
    <Stack.Navigator
    >
      <Stack.Screen name="Login" component={Login} options={
        {
          headerShown: false
        }
      } />
       <Stack.Screen name="SignUP" component={SignUP} options={
        {
          headerShown: false
        }
      } />

        <Stack.Screen name="RoleSelection" component={RoleSelection} options={
        {
          headerShown: false
        }
      } />

        <Stack.Screen name="Patient" component={Patient} options={
        {
          headerShown: false
        }
      } />
       <Stack.Screen name="Doctor" component={Doctor} options={
        {
          headerShown: false
        }
      } />
      {/* <Stack.Screen name="Drawer" component={MainDrawer} options={
        {
          headerShown: false
        }
      } /> */}
    </Stack.Navigator>
  );
}

const styles = StyleSheet.create({
  customStyle: {
    height: 100,
    borderBottomLeftRadius: 50,
    borderBottomRightRadius: 50,
    backgroundColor: "#26c6da",
    shadowColor: "#000",
    elevation: 25,
  },
  text: {
    backgroundColor: "white",
  },
});

export default HomeStack;
