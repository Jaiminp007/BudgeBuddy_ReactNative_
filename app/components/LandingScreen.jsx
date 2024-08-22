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
import { useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";

import rupeeIcon from "../../assets/RupeeIcon.png"; // Adjust the path based on your folder structure
import dollarIcon from "../../assets/DollarIcon.png"; // Adjust the path based on your folder structure
import euroIcon from "../../assets/EuroIcon.png"; // Adjust the path based on your folder structure
import poundIcon from "../../assets/PoundIcon.png"; // Adjust the path based on your folder structure
import logo from "../../assets/Logo.png"; // Adjust the path based on your folder structure

const lightGreen = "#7ae582";
const darkGreen = "#40916c";
const black = "#040303";
const white = "#ffffff";
const blue = "#264653";
const yellow = "#ffb703";
const background ="#dddddd";

const LandingScreen = () => {
  const [name, setName] = useState('Jaimin');
  const [username, setUsername] = useState('Jaimin007');
  const [password, setPassword] = useState('Patel');
  const [userId, setUserId] = useState('609');
  const [loading, setLoading] = useState(true);
  const [value, setValue] = useState("");
  const [currencyIcon, setCurrencyIcon] = useState(rupeeIcon); // Default currency icon
  const router = useRouter();

  // Function to clear all data
  const clearAllData = async () => {
    try {
      await AsyncStorage.clear();
      console.log('All data cleared successfully');
      Alert.alert("All data cleared successfully!");
      setValue('');
    } catch (e) {
      console.log('Failed to clear data', e);
    }
  };
  
  const retrieveData = async () => {
    try {
      const values = await AsyncStorage.multiGet([
        'name',
        'username',
        'password',
        'userId',
        'cashAmount',
        'selectedCurrencyIcon'
      ]);
  
      const savedName = values[0][1];
      const savedUsername = values[1][1];
      const savedPassword = values[2][1];
      const savedUserId = values[3][1];
      const savedCashAmount = values[4][1];
      const savedCurrencyIcon = values[5][1];
  
      console.log('--- Retrieved Data ---');
      console.log('Name:', savedName);
      console.log('Username:', savedUsername);
      console.log('Password:', savedPassword);
      console.log('User ID:', savedUserId);
      console.log('Cash Amount:', savedCashAmount);
      console.log('Selected Currency Icon:', savedCurrencyIcon);
  
      // Update state only if values are not null or undefined
      if (savedName) setName(savedName);
      if (savedUsername) setUsername(savedUsername);
      if (savedPassword) setPassword(savedPassword);
      if (savedUserId) setUserId(savedUserId);
      if (savedCashAmount) setValue(savedCashAmount);
  
      // Ensure the currency icon is set to a valid image, default to rupeeIcon if not
      if (savedCurrencyIcon) {
        switch (savedCurrencyIcon) {
          case "../../assets/RupeeIcon.png":
            setCurrencyIcon(rupeeIcon);
            break;
          case "../../assets/DollarIcon.png":
            setCurrencyIcon(dollarIcon);
            break;
          case "../../assets/EuroIcon.png":
            setCurrencyIcon(euroIcon);
            break;
          case "../../assets/PoundIcon.png":
            setCurrencyIcon(poundIcon);
            break;
          default:
            setCurrencyIcon(rupeeIcon); // Default fallback to rupeeIcon
            break;
        }
      } else {
        setCurrencyIcon(rupeeIcon); // Default to rupeeIcon if no value is found
      }
  
    }  catch (e) {
      console.log('Failed to retrieve the data from the storage:', e);
    } finally {
      setLoading(false); // Set loading to false after retrieval
    }
  };
  
  useEffect(() => {
    retrieveData(); // Automatically retrieve data when the component mounts
  }, []);
  
  

  const handleNavigation = async () => {
    if (value) {  // Ensure value is not empty
      console.log("Navigating with cashAmount:", value);
      try {
        let iconPath;
        if (currencyIcon === rupeeIcon) {
          iconPath = "../../assets/RupeeIcon.png";
        } else if (currencyIcon === dollarIcon) {
          iconPath = "../../assets/DollarIcon.png";
        } else if (currencyIcon === euroIcon) {
          iconPath = "../../assets/EuroIcon.png";
        } else if (currencyIcon === poundIcon) {
          iconPath = "../../assets/PoundIcon.png";
        }

        await AsyncStorage.multiSet([
          ['name', name],
          ['username', username],
          ['password', password],
          ['userId', userId],
          ['cashAmount', value],
          ['selectedCurrencyIcon', iconPath]
        ]);
        console.log('Data successfully stored');
      } catch (e) {
        console.log('Failed to save the data to the storage');
      }
      router.push({
        pathname: "/LandingPage",  // Ensure this route is correct
        params: { cashAmount: value }  // Correct way to pass params
      }); // Pass cashAmount to MainPage.jsx
    } else {
      Alert.alert("Please enter a valid cash amount");
    }
  };

  const handleInputChange = (input) => {
    if (/^\d*$/.test(input)) {
      setValue(input);
    }
  };

  const dismissKeyboard = () => {
    Keyboard.dismiss();
  };

  const selectCurrency = () => {
    Alert.alert(
      "Select Currency",
      "Choose a currency",
      [
        {
          text: "₹ Rupees",
          onPress: () => setCurrencyIcon(rupeeIcon),
        },
        {
          text: "$ Dollar",
          onPress: () => setCurrencyIcon(dollarIcon),
        },
        {
          text: "€ Euro",
          onPress: () => setCurrencyIcon(euroIcon),
        },
        {
          text: "£ Pound",
          onPress: () => setCurrencyIcon(poundIcon),
        },
      ],
      { cancelable: true }
    );
  };

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
          <TouchableWithoutFeedback onPress={dismissKeyboard}>
            <View style={styles.innerContainer}>
              <Image style={styles.logo} source={logo} />
              <Text style={styles.textOne}>
                Ever wonder where all your cash goes? BudgeBuddy makes it easy
                to keep track of your physical cash so you can budget better and
                spend wisely.
              </Text>
              <Text style={styles.textTwo}>
                Enter Your Current Cash Amount to Get Started!
              </Text>
              <View style={styles.inputContainer}>
                <TouchableOpacity onPress={selectCurrency}>
                  <Image source={currencyIcon} style={styles.currencyIcon} />
                </TouchableOpacity>
                <TextInput
                  style={styles.input}
                  value={value}
                  onChangeText={handleInputChange}
                  keyboardType="numeric"
                  placeholder="Type a number"
                />
              </View>

              <View style={styles.currencyContainer}>
                <Text style={styles.currencyText}>
                  ↑ Press here to access multiple currencies
                </Text>
              </View>

              <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={styles.button}
                onPress={handleNavigation}>
                <Text style={styles.buttonText}>Begin your Journey</Text>
              </TouchableOpacity>
              </View>
              <TouchableOpacity
                style={styles.printButton}
                onPress={retrieveData}>  
                <Text style={styles.buttonText}>View Stored Data</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.delbutton}
                onPress={clearAllData}>  
                <Text style={styles.buttonText}>Delete Data</Text>
              </TouchableOpacity>

            </View>
          </TouchableWithoutFeedback>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};


const styles = StyleSheet.create({
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
    color: darkGreen,
    textAlign: "center",
    paddingLeft: 20,
    paddingRight: 20,
    fontFamily: "System",
    marginBottom: 50,
  },
  textTwo: {
    fontSize: 20,
    color: blue,
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
    marginLeft: -20,
  },
  input: {
    flex: 1,
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    padding: 8,
    fontSize: 18,
    borderRadius: 4,
    color: black,
    fontFamily: "System",
  },
  currencyContainer: {
    alignItems: 'flex-start', // Align content to the left side
    marginTop: -30,
    marginRight: 140, // Add some margin at the top for spacing
    paddingLeft: 10, // Optional: Add padding if needed to move text slightly from the left edge
  },
  
  currencyText: {
    fontSize: 12, // Small text size
    color: '#000000',
    textAlign: 'left', // Ensure text alignment is to the left
    fontWeight: 'bold',
  },
  buttonContainer: {
    color: "black",
    marginTop: 50,
    width: "50%",
    height: 60,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 6,
    backgroundColor: "#40916c",
  },
  button: {
    width: "100%",
    height: "100%",
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
  delbutton:{
    marginTop: 20,
    width: "20%",
    height: "10%",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 6,
    backgroundColor: "red",
  },
  printButton: {
    marginTop: 10,
    width: "20%",
    height: "10%",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 6,
    backgroundColor: "blue",
  },
});

export default LandingScreen;
