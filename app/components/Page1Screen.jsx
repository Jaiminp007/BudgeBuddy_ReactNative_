import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Alert,
  Image,
  SafeAreaView,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  Platform,
} from "react-native";
import { useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";

import rupeeIcon from "../../assets/RupeeIcon.png"; // Adjust the path based on your folder structure
import dollarIcon from "../../assets/DollarIcon.png"; // Adjust the path based on your folder structure
import euroIcon from "../../assets/EuroIcon.png"; // Adjust the path based on your folder structure
import poundIcon from "../../assets/PoundIcon.png"; // Adjust the path based on your folder structure
import logo from "../../assets/Logo.png"; // Adjust the path based on your folder structure

const Page1 = () => {
  const [loading, setLoading] = useState(true);
  const [value, setValue] = useState("");
  const [currencyIcon, setCurrencyIcon] = useState(rupeeIcon); // Default currency icon
  const router = useRouter();

  useEffect(() => {
    setLoading(false); // Stop the loading animation when the component is ready
  }, []);

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
              <View style={styles.buttonContainer}>
                <TouchableOpacity
                  style={styles.button}
                  onPress={() => router.push("/page2", { cashAmount: value })}>
                  <Text style={styles.buttonText}>Begin your Journey</Text>
                </TouchableOpacity>
              </View>
            </View>
          </TouchableWithoutFeedback>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const { width } = Dimensions.get("window");
const boxFontSize = width / 35;
const numberFontSize = width / 25;

const styles = StyleSheet.create({
  container: {
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
    fontFamily: "Helvetica",
    marginBottom: 50,
  },
  textTwo: {
    fontSize: 20,
    color: "#7ae582",
    fontWeight: "bold",
    textAlign: "center",
    paddingLeft: 20,
    paddingRight: 20,
    fontFamily: "Helvetica",
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
    color: "#ffffff",
    fontFamily: "Helvetica",
  },
  buttonContainer: {
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
});

export default Page1;
