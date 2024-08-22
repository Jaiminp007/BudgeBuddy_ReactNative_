import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { useNavigation, useRoute } from "@react-navigation/native";
import AsyncStorage from '@react-native-async-storage/async-storage';

const lightGreen = '#7ae582';
const darkGreen = '#40916c';
const black = '#040303';
const white = '#ffffff';
const yellow = "#ffb703";
const blue = "#264653";

const ExpenseScreen = () => {
  const [date, setDate] = useState('');
  const [note, setNote] = useState('');
  const [amount, setAmount] = useState('');
  const [cashAmount, setCashAmount] = useState(0);

  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  const route = useRoute();
  const navigation = useNavigation();
  const { userId } = route.params;
  console.log("User ID",userId)
  const inspectStorage = async () => {
    try {
      const jsonString = await AsyncStorage.getItem("userDetails");
      if (jsonString) {
        const allData = JSON.parse(jsonString);
        console.log("Complete userDetails stored in AsyncStorage:", allData);
      } else {
        console.log("No data found in AsyncStorage.");
      }
    } catch (error) {
      console.error("Error inspecting AsyncStorage:", error);
    }
  };

  const retrieveData = async () => {
    setLoading(true);
    try {
      const jsonString = await AsyncStorage.getItem("userDetails");
      console.log("Retrieved jsonString:", jsonString); // Check what is being retrieved from AsyncStorage
      if (jsonString) {
        const allData = JSON.parse(jsonString);
        console.log("Parsed allData:", allData); // Log the parsed JSON to check structure
        const userDetails = allData.userDetails[userId]; // Adjusted to reflect the correct path to userDetails
        console.log("userDetails object:", userDetails);
         // Further log to confirm the structure
        if (userDetails) {
          setUserData(userDetails);
          console.log(userData)
          setCashAmount(userDetails.cashAmount || 0); // Set cashAmount with a default of 0 if undefined
        } else {
          console.log("User data not found for ID:", userId);
        }
      } else {
        console.log("No user data found in AsyncStorage.");
      }
      }
   catch (e) {
      console.error("Failed to fetch data from storage:", e);
    }
    setLoading(false);
  };

  useEffect(() => {
    inspectStorage();
    if (userId) {
      retrieveData();
    } else {
      console.log("No userId found in route parameters");
      setLoading(false);
    }
  }, [userId]);

  const handleAddExpense = async () => {
    console.log("Button clicked");
    if (!amount || parseFloat(amount) === 0) {
      console.log("Invalid Input", "Please enter a valid expense amount greater than zero.");
      return;
    }
    if (!userData) {
      console.log("Data Error", "User data not loaded correctly.");
      return;
    }

    try {
      const currentCashAmount = cashAmount || 0;

      const newAmount = currentCashAmount - parseFloat(amount);
      setCashAmount(newAmount);

      const newExpense = {
        expenseId: 1,
        expenseAmount: parseFloat(amount),
        date,
        note,
      };

      const updatedUserData = {
        ...userData,
        cashAmount: newAmount,
        expense: [newExpense],
      };

      const allUserDetails = JSON.parse(await AsyncStorage.getItem("userDetails")) || {};
      allUserDetails[userId] = updatedUserData;

      await AsyncStorage.setItem("userDetails", JSON.stringify(allUserDetails));

      console.log("Expense successfully added for user:", userId);

      navigation.navigate("MainPage", { userId: userId });
    } catch (error) {
      console.error('Failed in subtraction:', error);
    }
  };

  const dismissKeyboard = () => {
    Keyboard.dismiss();
  };

  return (
    <TouchableWithoutFeedback onPress={dismissKeyboard}>
      <View style={styles.container}>
        <Text style={styles.title}>Add a New Expense</Text>
        <View style={styles.formContainer}>
          <TextInput
            style={styles.input}
            value={amount}
            onChangeText={(text) => {
              if (/^\d*\.?\d*$/.test(text)) {
                setAmount(text);
              }
            }}
            keyboardType="numeric"
            placeholder="Enter expense amount"
            placeholderTextColor="#aaa"
          />
        </View>

        <View style={styles.formContainer}>
          <TextInput
            style={styles.dateInput}
            value={date}
            onChangeText={setDate}
            placeholder="Enter date"
            placeholderTextColor="#aaa"
          />
        </View>

        <Text style={styles.dateText}>Ensure to input the correct date format (YYYY-MM-DD)</Text>

        <View style={styles.formContainer}>
          <TextInput
            style={styles.noteInput}
            value={note}
            onChangeText={setNote}
            placeholder="Enter personal note"
            placeholderTextColor="#aaa"
            multiline={true}
            numberOfLines={3}
          />
        </View>

        <TouchableOpacity style={styles.buttonContainer} onPress={handleAddExpense}>
          <Text style={styles.buttonText}>Add Expense</Text>
        </TouchableOpacity>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: white, 
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 25,
    marginBottom: 30,
    color: blue, 
  },
  input: {
    width: '90%',
    height: 50,
    borderColor: black,  
    borderWidth: 1,
    borderRadius: 6,
    paddingHorizontal: 10,
    fontSize: 18,
    color: black,  
    marginBottom: 0,
    backgroundColor: '#f5f5f5',
    alignSelf: 'center',  
  },
  dateInput: {
    width: '90%',
    height: 50,
    borderColor: black,  
    borderWidth: 1,
    borderRadius: 6,
    paddingHorizontal: 10,
    fontSize: 18,
    color: black,  
    alignSelf: 'center',
    backgroundColor: '#f5f5f5',
  },
  formContainer: {
    backgroundColor: '#e5e5e5',
    borderRadius: 10,
    padding: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    marginBottom: 20,
  },
  noteInput: {
    width: '100%',
    height: 250,
    borderColor: black,  
    borderWidth: 1,
    borderRadius: 6,
    paddingTop: 10,
    paddingHorizontal: 10,
    fontSize: 18,
    color: black,  
    backgroundColor: '#f5f5f5',
  },
  buttonContainer: {
    marginTop: 20,
    backgroundColor: darkGreen,  
    borderRadius: 6,
    width: 170,
    height: 70,
    justifyContent: 'center',
    alignSelf: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  buttonText: {
    color: white,  
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  dateText: {
    color: yellow,
    fontSize: 12,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: -18,
    marginBottom: 30,
  }
});

export default ExpenseScreen;
