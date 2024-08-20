import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Alert } from 'react-native';

const lightGreen = '#7ae582';
const darkGreen = '#40916c';
const black = '#040303';
const white = '#ffffff';
const yellow = "#ffb703";
const blue = "#264653";

const ExpenseScreen = () => {
  const [expense, setExpense] = useState('');
  const [date, setDate] = useState('');
  const [note, setNote] = useState('');
  const [cashAmount, setCashAmount] = useState(0);

  const router = useRouter();

  useEffect(() => {
    const getCashAmount = async () => {
      try {
        const storedCashAmount = await AsyncStorage.getItem('cashAmount');
        if (storedCashAmount !== null) {
          setCashAmount(parseFloat(storedCashAmount));
        }
      } catch (error) {
        console.error('Failed to fetch cash amount from AsyncStorage:', error);
      }
    };

    getCashAmount();
  }, []);

  const handleAddExpense = async () => {
    if (!expense || parseFloat(expense) === 0) {
      Alert.alert("Invalid Input", "Please enter a valid expense amount greater than zero.");
      return;
    }

    try {
      // Retrieve the latest cash amount from AsyncStorage
      const storedCashAmount = await AsyncStorage.getItem('cashAmount');
      const currentCashAmount = storedCashAmount !== null ? parseFloat(storedCashAmount) : 0;
  
      // Subtract the expense from the current cash amount
      const newAmount = currentCashAmount - parseFloat(expense);
  
      // Update the new cash amount in AsyncStorage
      await AsyncStorage.setItem('cashAmount', newAmount.toString());
  
      console.log("Remaining Amount:", newAmount);  // Log the remaining amount

      const storedExpenses = await AsyncStorage.getItem('expenses');
      const expenses = storedExpenses ? JSON.parse(storedExpenses) : {};

    // Add the new expense, date, and note to the expenses dictionary
      expenses[expense] = [date, note];

    // Save the updated expenses back to AsyncStorage
      await AsyncStorage.setItem('expenses', JSON.stringify(expenses));

      console.log("Updated Expenses:", expenses);  // Log the updated expenses

      setExpense('');
      setDate('');
      setNote('');
  
      // Navigate back to MainPage and pass the new cashAmount
      router.push({
        pathname: '/MainPage',
        params: { cashAmount: newAmount.toString() },
      });
    } catch (error) {
      console.error('Failed to update cash amount in AsyncStorage:', error);
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
            value={expense}
            onChangeText={(text) => {
              if (/^\d*\.?\d*$/.test(text)) {  // Allow decimal numbers
                setExpense(text);
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
