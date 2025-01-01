import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Alert,
  Dimensions,
  Image,
  SafeAreaView,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  Platform,
  ActivityIndicator,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation, useRoute } from "@react-navigation/native";


import rupeeIcon from "../../assets/RupeeIcon.png"; // Adjust the path based on your folder structure
import dollarIcon from "../../assets/DollarIcon.png"; // Adjust the path based on your folder structure
import euroIcon from "../../assets/EuroIcon.png"; // Adjust the path based on your folder structure
import poundIcon from "../../assets/PoundIcon.png"; // Adjust the path based on your folder structure
import logo from "../../assets/Logo.png"; // Adjust the path based on your folder structure

const background = "#dddddd";

const LandingScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { userId, username } = route.params;
  const [selectedCurrency, setSelectedCurrency] = useState("RupeeIcon.png");
  const [userData, setUserData] = useState({
    name: "",
    cashAmount: "",
    selectedCurrencyIcon: rupeeIcon,
    });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    initializeData();
  }, []);

  const initializeData = async () => {
    const existingData = await AsyncStorage.getItem("userDetails");
  
    if (existingData) {
      ("Data Exist")
      const data = JSON.parse(existingData);
      
  
      // Save the updated data back to AsyncStorage
      await AsyncStorage.setItem("userDetails", JSON.stringify(data));
    
    }
    retrieveData();  // Retrieve data to update the UI
  };
  

  const retrieveData = async () => {
    const jsonString = await AsyncStorage.getItem("userDetails");
    if (jsonString) {
      const userDetails = JSON.parse(jsonString).userDetails[userId];
      if (userDetails) {
        setUserData({
          cashAmount: userDetails.cashAmount.toString(),
          selectedCurrencyIcon: userDetails.selectedCurrencyIcon || rupeeIcon,
        });
      }
    }
    setLoading(false);
  };

  const storeData = async () => {
    const jsonString = await AsyncStorage.getItem("userDetails");
    const allUserDetails = JSON.parse(jsonString);
    allUserDetails.userDetails[userId] = {
      ...userData,
      cashAmount: parseInt(userData.cashAmount),
      name: username,
    };
    await AsyncStorage.setItem("userDetails", JSON.stringify(allUserDetails));
  };

  const handleCashAmountChange = (text) => {
    setUserData({ ...userData, cashAmount: text });
  };

  const handleCurrencySelection = (icon) => {
    setUserData({ ...userData, selectedCurrencyIcon: icon });
  };

  const handleNavigation = async () => {
    if (userData.cashAmount) {
      // Ensure value is not empty

        const jsonString = await AsyncStorage.getItem("userDetails");
        let allUserDetails = jsonString ? JSON.parse(jsonString) : { userDetails: {} };

        let iconName;
        switch (userData.selectedCurrencyIcon) {
          case rupeeIcon:
            iconName = "RupeeIcon.png";
            break;
          case dollarIcon:
            iconName = "DollarIcon.png";
            break;
          case euroIcon:
            iconName = "EuroIcon.png";
            break;
          case poundIcon:
            iconName = "PoundIcon.png";
            break;
          default:
            iconName = "RupeeIcon.png"; // Default icon name or handle error
        }
        // Prepare and update the user data in AsyncStorage
        if (!allUserDetails.userDetails) {
          allUserDetails.userDetails = {}; // Initialize userDetails if it doesn't exist
        }
        const cashAmount = userData.cashAmount
        allUserDetails.userDetails[userId] = {
          ...userData,
          cashAmount: parseInt(cashAmount),
          name: username,
          selectedCurrencyIcon: iconName,
          expense: [],
          Topexpenses: [],
          cashHistory: [parseInt(cashAmount)],
        
        };
        await AsyncStorage.setItem(
          "userDetails",
          JSON.stringify(allUserDetails)
        );

        setUserData((prevData) => ({
          ...prevData,
          cashAmount: ""
        }));
        // Navigation
        navigation.navigate("MainPage", { userId: userId });
  }};

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#40916c" />
      </View>
    );
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#f8f9fa" }}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}>
        <ScrollView contentContainerStyle={styles.container}>
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={styles.innerContainer}>
              <Image style={styles.logo} source={logo} />
              <Text style={styles.textOne}>
                Welcome, {username}! Ready to manage your finances?
              </Text>
              <TextInput
                style={styles.input}
                value={userData.cashAmount}
                onChangeText={handleCashAmountChange}
                keyboardType="numeric"
                placeholder="Enter Cash Amount"
              />
              <View style={styles.currencyContainer}>
  <TouchableOpacity
    onPress={() => handleCurrencySelection(rupeeIcon)}
    style={[
      styles.currencyBox,
      userData.selectedCurrencyIcon === rupeeIcon && styles.selectedCurrencyBox
    ]}
  >
    <Image source={rupeeIcon} style={styles.currencyIcon} />
  </TouchableOpacity>
  <TouchableOpacity
    onPress={() => handleCurrencySelection(dollarIcon)}
    style={[
      styles.currencyBox,
      userData.selectedCurrencyIcon === dollarIcon && styles.selectedCurrencyBox
    ]}
  >
    <Image source={dollarIcon} style={styles.currencyIcon} />
  </TouchableOpacity>
  <TouchableOpacity
    onPress={() => handleCurrencySelection(euroIcon)}
    style={[
      styles.currencyBox,
      userData.selectedCurrencyIcon === euroIcon && styles.selectedCurrencyBox
    ]}
  >
    <Image source={euroIcon} style={styles.currencyIcon} />
  </TouchableOpacity>
  <TouchableOpacity
    onPress={() => handleCurrencySelection(poundIcon)}
    style={[
      styles.currencyBox,
      userData.selectedCurrencyIcon === poundIcon && styles.selectedCurrencyBox
    ]}
  >
    <Image source={poundIcon} style={styles.currencyIcon} />
  </TouchableOpacity>
</View>
              <TouchableOpacity
                style={styles.button}
                onPress={handleNavigation}>
                <Text style={styles.buttonText}>Begin your Journey</Text>
              </TouchableOpacity>
            </View>
          </TouchableWithoutFeedback>
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
  },
  container: {
    backgroundColor: background,
    flexGrow: 1,
    paddingVertical: 16,
    paddingHorizontal: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  innerContainer: {
    alignItems: "center",
  },
  logo: {
    width: 360,
    height: 115,
    marginBottom: 50,
  },
  textOne: {
    fontSize: 18,
    color: "#40916c",
    textAlign: "center",
    paddingLeft: 20,
    paddingRight: 20,
    fontFamily: "System",
    marginBottom: 50,
  },
  textTwo: {
    fontSize: 20,
    color: "#264653",
    fontWeight: "bold",
    textAlign: "center",
    paddingLeft: 20,
    paddingRight: 20,
    fontFamily: "System",
    marginBottom: 20,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    width: "80%",
    marginBottom: 50,
  },
  currencyIcon: {
    width: 30,
    height: 30,
    marginRight: 10,
  },
  input: {
    flex: 1,
    height: 30,
    minHeight: 40,  // Prevent shrinking
  maxHeight: 60, 
    borderColor: "gray",
    borderWidth: 1,
    padding: 8,
    fontSize: 18,
    borderRadius: 4,
    color: "#040303",
    fontFamily: "Helvetica",
  },
  currencyContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: 'center',
    justifyContent: 'space-evenly',
    width: "100%",
    marginTop: 20,
    marginBottom: 10,
  },
  currencyBox: {
    padding: 5,
    borderRadius: 5,
    alignItems: 'center',  // Center the icon horizontally
    justifyContent: 'center',
  },
  selectedCurrencyBox: {
    borderColor: '#000', // Black border for selected currency
    borderWidth: 3,
    paddingLeft: 10,     // Add paddingLeft to adjust alignment
    paddingRight: 0, 
  },
  button: {
    marginTop: 20,
    width: "50%",
    height: 60,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 6,
    backgroundColor: "#40916c",
  },
  buttonText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default LandingScreen;
