import React, { useEffect, useState } from "react";
import {
  View,
  TextInput,
  StyleSheet,
  Text,
  TouchableOpacity,
  Animated,
  Easing,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
  SafeAreaView,
} from "react-native";
import { useRouter } from "expo-router";
import { CheckBox } from "react-native-elements";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { authService } from "../services/apiHost";

const LoginScreen = () => {
  const [loading, setLoading] = useState(true);
  const [initialLoad, setInitialLoad] = useState(false);

  const [username, setUsername] = useState("");

  const router = useRouter();

  const loadStoredData = async () => {};

  const handleInitialLoad = async () => {
    await loadStoredData();
    setLoading(false);
    setInitialLoad(true);
  };

  useEffect(() => {
    if (!initialLoad) {
      setLoading(true);
      setTimeout(handleInitialLoad, 2000);
    }
  }, [initialLoad]);

  const handleLogin = async () => {
    try {
      // // Store credentials in AsyncStorage
      // const key = `${serverName}_${username}`;
      // await AsyncStorage.setItem(key, JSON.stringify(credentials));
      // await AsyncStorage.setItem("current_key", key);

      // Navigate to the dashboard
      router.push({
        pathname: "/dashboard",
      });
    } catch (error) {
      console.error("Error", error);
    }
  };

  const clearAsyncStorage = async () => {
    try {
      await AsyncStorage.clear();
      console.log("AsyncStorage cleared");
    } catch (error) {
      console.error("Error clearing AsyncStorage", error);
    }
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.loadingText}>BudgetBuddy</Text>
        <ActivityIndicator size="large" color="#007bff" />
      </View>
    );
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}>
        <ScrollView contentContainerStyle={styles.container}>
          <Text style={styles.branding}>BudgetBuddy</Text>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f0f4f7",
  },
  loadingText: {
    fontSize: 32,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#333",
  },
  container: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 16,
    backgroundColor: "#f0f4f7",
  },
  branding: {
    fontSize: 32,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 40,
    color: "#333",
  },
});

export default LoginScreen;
