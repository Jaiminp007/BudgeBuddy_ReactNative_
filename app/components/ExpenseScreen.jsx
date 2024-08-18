import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { useRouter } from 'expo-router';
import { Alert } from 'react-native';

const lightGreen = '#7ae582';
const darkGreen = '#40916c';
const black = '#040303';
const white = '#ffffff';
const yellow = "#ffb703";
const blue = "#264653";

const ExpenseScreen = ({ cashAmount }) => {
  const [expense, setExpense] = useState('');
  const [date, setDate] = useState('');
  const [note, setNote] = useState('');
  
  const router = useRouter();

  const handleAddExpense = () => {
    const newAmount = cashAmount - parseFloat(expense);  // Subtract expense from cashAmount
    console.log("Remaining Amount:", newAmount);  // Log the remaining amount

    if (!expense || parseFloat(expense) === 0) {
      Alert.alert("Invalid Input", "Please enter a valid expense amount greater than zero.");
      return;
    }
    setExpense('');
    setDate('');
    setNote('');
    // Navigate back to MainPage and pass the new cashAmount
    router.push({
      pathname: '/MainPage',
      params: { cashAmount: newAmount.toString() },
    });
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
}

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
