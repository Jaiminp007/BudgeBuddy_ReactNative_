import { useEffect } from "react";
import { StyleSheet, View, Text } from "react-native";
import { Link } from "expo-router";
import LoginScreen from "./components/LoginScreen";

export default function App() {
  return <LoginScreen />;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
