import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, TouchableWithoutFeedback,Alert, Keyboard, Image} from 'react-native';
import { useNavigation, useRoute } from "@react-navigation/native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { DrawerActions } from "@react-navigation/native";
const lightGreen = '#7ae582';
const darkGreen = '#40916c';
const black = '#040303';
const white = '#ffffff';
const yellow = "#ffb703";
const blue = "#264653";
import menuIcon from "../../assets/MenuIcon.png";
import { Menu } from 'react-native-paper';

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

  const inspectStorage = async () => {
      const jsonString = await AsyncStorage.getItem("userDetails");
      if (jsonString) {
        const allData = JSON.parse(jsonString);
      }
  };

  const retrieveData = async () => {
      const jsonString = await AsyncStorage.getItem("userDetails");
       // Check what is being retrieved from AsyncStorage
      if (jsonString) {
        const allData = JSON.parse(jsonString);
        // Log the parsed JSON to check structure
        const userDetails = allData.userDetails[userId]; // Adjusted to reflect the correct path to userDetails
        // Further log to confirm the structure
        if (userDetails) {
          setUserData(userDetails);
          setCashAmount(userDetails.cashAmount);
        } 
  }
}

  const handleMenuPress = () => {

    navigation.dispatch(DrawerActions.openDrawer());
  };

  const handleAddExpense = async () => {
    if (!amount || isNaN(parseFloat(amount) )) {
      Alert.alert("Invalid Input", "Please enter a valid amount.");
      return; // Exit the function early
    }else if (amount == 0){
      Alert.alert("Invalid Input", "Please enter a valid amount.");
      return;
    }
      // Retrieve the entire object from AsyncStorage
      const jsonString = await AsyncStorage.getItem('userDetails');
      const storageData = jsonString ? JSON.parse(jsonString) : {};

      // Access the `userDetails` object within the storageData
      const userDetails = storageData.userDetails || {};

      // Check if the user exists in the userDetails
      if (userDetails[userId]) {
        // Get the user's existing data
        const userData = userDetails[userId];
        
        // Convert the amount to a number
        const expenseAmount = parseFloat(amount);

        // Subtract the expense amount from the cash amount
        const updatedCashAmount = userData.cashAmount - expenseAmount;

        // Create a new expense object
        const newExpense = {
          expenseId: userData.expense ? userData.expense.length + 1 : 1, // Increment expense ID or start from 1 if no expenses
          expenseAmount: expenseAmount,
          date: date,
          note: note,
        };

        // Append the new expense to the expense list or create a new list if it doesn't exist
        const updatedExpenseList = userData.expense ? [...userData.expense, newExpense] : [newExpense];

        // Step 1: Extract expense amounts and sort them in decreasing order
        const TopExpenses = updatedExpenseList
          .map(expense => expense.expenseAmount)
          .sort((a, b) => b - a);

          const updatedCashHistory = userData.cashHistory ? [...userData.cashHistory, updatedCashAmount] : [userData.cashAmount, updatedCashAmount];

        // Update the user's data in the userDetails object
        userDetails[userId] = {
          ...userData,
          cashAmount: updatedCashAmount,
          expense: updatedExpenseList,
          Topexpenses: TopExpenses,
          cashHistory: updatedCashHistory, // Store the sorted TopExpenses list
        };

        // Save the updated userDetails back to AsyncStorage
        storageData.userDetails = userDetails;
        await AsyncStorage.setItem('userDetails', JSON.stringify(storageData));
        
        setAmount('');  
        setDate('');    
        setNote('');
        
        // Navigate back to the main page
        navigation.navigate('MainPage', { userId });
      } 
    

  };
  
  useEffect(() => {
    retrieveData();
    inspectStorage();
  }, []);

  const dismissKeyboard = () => {
    Keyboard.dismiss();
  };

  return (
    <TouchableWithoutFeedback onPress={dismissKeyboard}>
      <View style={styles.container}>
        <View style={styles.Menu}>
        <Text style={styles.title}>Add New Expense</Text>
      <TouchableOpacity onPress={handleMenuPress} style={styles.menuButton}>
          <Image source={menuIcon} style={styles.menuIcon} />
        </TouchableOpacity>
        </View>
        
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

        <TouchableOpacity
          style={styles.buttonContainer}
          onPress={() => handleAddExpense(userId, amount, date, note, navigation)}
        >
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
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 25,
    marginBottom: 30,
    color: blue,
    textAlign: "left", 
    marginLeft: 5,
  },
  menuButton: {
    padding: 10,
    marginBottom: 8,
    marginTop:7,
    marginLeft: 40,
  },
  Menu:{
    flexDirection: "row",
    justifyContent: "flex-start", // Aligns items to the start (left side)
    alignItems: "center", // Centers items vertically
    marginBottom: 0,
  },
  menuIcon: {
    width: 30,
    height: 30,
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
    marginBottom: 40,
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
    marginTop: 0,
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
    marginTop: -25,
    marginBottom: 40,
  }
});

export default ExpenseScreen;
