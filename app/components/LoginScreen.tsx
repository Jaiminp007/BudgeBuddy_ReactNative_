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
  Alert,
  Image,
} from "react-native";
import { useRouter } from "expo-router";
import { CheckBox } from "react-native-elements";
import { authService } from "../services/apiHost";
import { useNavigation, useFocusEffect } from "@react-navigation/native"; 
import AsyncStorage from '@react-native-async-storage/async-storage';
import GlobalData from "../GlobalData";

import rupeeIcon from "../../assets/RupeeIcon.png"; // Adjust the path based on your folder structure
import dollarIcon from "../../assets/DollarIcon.png"; // Adjust the path based on your folder structure
import euroIcon from "../../assets/EuroIcon.png"; // Adjust the path based on your folder structure
import poundIcon from "../../assets/PoundIcon.png"; 

const LoginScreen = () => {
  const navigation = useNavigation();
  const [loading, setLoading] = useState(true);
  const [initialLoad, setInitialLoad] = useState(false);
  const [username, setUsername] = useState("");
  const [userData, setUserData] = useState(null);
  const [currencyIcon, setCurrencyIcon] = useState("");

  const router = useRouter();

  const loadStoredData = async () => {};

  const handleInitialLoad = async () => {
    await loadStoredData();
    setLoading(false);
    setInitialLoad(true);
  };

  const clearAllData = async () => {
    try {
      GlobalData.userid = null;
    console.log("Global Data resets")
      // Clear all user details from AsyncStorage
      await AsyncStorage.removeItem('userDetails');
      console.log("All data cleared successfully");
  
      // Update the state to remove all user boxes from the UI
      setUserData({});
  
      // Notify the user of the successful deletion
      Alert.alert("All data cleared successfully!");
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
    const unsubscribe = navigation.addListener('focus', () => {
      loadUserData();
    });
    return () => {
      unsubscribe();
    }
  }, [initialLoad, navigation]);


  const loadUserData = async () => {
    try {
      const jsonString = await AsyncStorage.getItem('userDetails');
      console.log(jsonString)
      if (jsonString) {
        const parsedData = JSON.parse(jsonString);
        console.log(parsedData)
        setUserData(parsedData.userDetails || {});
        const currencyIcon = userData["selectedCurrencyIcon"];
          if (currencyIcon == "RupeeIcon.png") {
            setCurrencyIcon(rupeeIcon);
          }else if(currencyIcon == "EuroIcon.png") {
            setCurrencyIcon(euroIcon);
          }else if (currencyIcon == "PoundIcon.png"){
            setCurrencyIcon(poundIcon);
          }else{
            setCurrencyIcon(dollarIcon);
          }
      }
    } catch (error) {
      console.log('Error fetching user details:', error);
    }
  };

  const handleUserClick = (userId) => {
    navigation.navigate('MainPage', { userId });
  };

  const handleNavigation = async () => {
    const userId = Math.floor(100 + Math.random() * 900);
    console.log(userId)
    setUsername('')
    navigation.navigate("LoginPage", {userId,username});
  }

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
          {Object.keys(userData).map((userId) => {
            const currencyIcon = userData[userId].selectedCurrencyIcon;
            let selectedIcon;
            if (currencyIcon === "RupeeIcon.png") {
              selectedIcon = rupeeIcon;
            } else if (currencyIcon === "EuroIcon.png") {
              selectedIcon = euroIcon;
            } else if (currencyIcon === "PoundIcon.png") {
              selectedIcon = poundIcon;
            } else {
              selectedIcon = dollarIcon;
            }
            return (
              <TouchableOpacity
                key={userId}
                style={styles.userBox}
                onPress={() => handleUserClick(userId)}
              >
                <Text style={styles.userName}>{userData[userId].name}</Text>
                <Text style={styles.cashAmountText}>Cash Amount: </Text>
                <Image source={selectedIcon} style={styles.image} />
                <Text style={styles.cashAmount}>{userData[userId].cashAmount}</Text>
              </TouchableOpacity>
            );
          })}
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
userBox: {
  width: '80%',
  padding: 20,
  marginVertical: 10,
  backgroundColor: '#00ADB5',
  borderRadius: 10,
  alignItems: 'center',
  flexDirection: "row",
  justifyContent: "space-between",
},
image: {
  width: 20,
  height: 20,
  marginTop: 2,
  tintColor: "white",
},
userName: {
  fontSize: 20,
  fontWeight:  "bold",
  textAlign: "left",
  color: '#ffb703',
  alignSelf: 'flex-start' 
},
cashAmountText: {
  fontSize: 15,
  textAlign: "right",
  color: "#ffffff",
  marginLeft: 43,
},
cashAmount: {
  fontSize: 15,
  textAlign: "right",
  color: "#ffffff"
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
  marginBottom: 20,
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