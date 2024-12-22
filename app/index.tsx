import "react-native-gesture-handler";
import {StyleSheet} from "react-native";
import Navigator from "./routes/homeStack";
import { NavigationContainer } from "@react-navigation/native";


export default function App() {
  return (
      <Navigator />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
