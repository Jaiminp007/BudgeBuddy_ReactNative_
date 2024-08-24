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
  Alert
} from "react-native";
import { useRouter } from "expo-router";
import { CheckBox } from "react-native-elements";
import { authService } from "../services/apiHost";
import { useNavigation } from "@react-navigation/native"; 
import AsyncStorage from '@react-native-async-storage/async-storage';

const LoginScreen = () => {
  const navigation = useNavigation();

  const [loading, setLoading] = useState(true);
  const [initialLoad, setInitialLoad] = useState(false);
  const [username, setUsername] = useState("");
  const [userData, setUserData] = useState(null);

  const router = useRouter();

  const loadStoredData = async () => {};

  const handleInitialLoad = async () => {
    await loadStoredData();
    setLoading(false);
    setInitialLoad(true);
  };

  const clearAllData = async () => {
    try {
      await AsyncStorage.clear();
      console.log("All data cleared successfully");
      Alert.alert("All data cleared successfully!");
      setUserData({
        ...userData,
        username: "",
      }); // Reset to default values
    } catch (e) {
      console.error("Failed to clear the AsyncStorage:", e);
      Alert.alert("Error clearing data.");
    }
  };

  useEffect(() => {
    loadUserData();
    if (!initialLoad) {
      setLoading(true);
      setTimeout(handleInitialLoad, 2000);
    }
  }, [initialLoad]);


  const loadUserData = async () => {
    try {
      // Assuming the user data is stored under a specific key in AsyncStorage
      const storedUserData = await AsyncStorage.getItem('userDetails');
      console.log(storedUserData)
      if (storedUserData) {
        setUserData(JSON.parse(storedUserData));
      }
      setLoading(false);
    } catch (error) {
      console.error('Error loading user data', error);
    }
  };

  const handleNavigation = async () => {
    const userId = Math.floor(100 + Math.random() * 900);
    console.log(userId)
    setUsername('')
    navigation.navigate("LoginPage", {userId,username});
  }

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
        <ActivityIndicator size="large" color="#007bff" />
      </View>
    );
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.enterDetailsText}>Sign Up Form</Text>
        <Text style={styles.usernameText}>Enter your Username</Text>
        <TextInput
          style={styles.input}
          value={username}
          onChangeText={(text) => setUsername(text)}
          placeholder="Enter username"
          placeholderTextColor="#aaa"
        />
        <TouchableOpacity
        style={styles.signUpButton}
        onPress={handleNavigation}>
          <Text style={styles.signUpButtonText}>Sign Up</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.signUpButton} onPress={clearAllData}>
            <Text style={styles.signUpButtonText}>Clear Data</Text>
          </TouchableOpacity>
        <Text style={styles.accounts}>Your Accounts</Text>
      </ScrollView>
    </KeyboardAvoidingView>
  </SafeAreaView>
);
};

const styles = StyleSheet.create({
container: {
  flexGrow: 1,
  alignItems: "center",
  paddingHorizontal: 16,
  backgroundColor: "#f0f4f7",
  paddingTop: 60,
},
loadingContainer: {
  flex: 1,
  justifyContent: "center",
  alignItems: "center",
  backgroundColor: "#f0f4f7",
},
enterDetailsText: {
  fontSize: 36,
  fontWeight: "bold",
  color: "#333",
  marginBottom: 40,
  textAlign: "center",
},
usernameText: {
  fontSize: 25,
  fontWeight: "bold",
  color: "#333",
  marginBottom: 10,
  alignSelf: 'flex-start' 
},
accounts: {
  fontSize: 36,
  fontWeight: "bold",
  color: "#333",
  marginBottom: 40,
  textAlign: "center",
},
input: {
  width: "100%",
  height: 50,
  borderColor: "#ccc",
  borderWidth: 1,
  borderRadius: 8,
  paddingHorizontal: 10,
  fontSize: 16,
  marginBottom: 30,
  backgroundColor: "#fff",
},
signUpButton: {
  marginTop: 20,
 marginBottom: 50,
  backgroundColor: "#007bff",
  borderRadius: 8,
  paddingVertical: 15,
  paddingHorizontal: 40,
},
signUpButtonText: {
  color: "#fff",
  fontSize: 16,
  fontWeight: "bold",
  textAlign: "center",
},
});

export default LoginScreen;