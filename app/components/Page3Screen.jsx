import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, Button, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const lightGreen = '#7ae582';
const darkGreen = '#40916c';
const black = '#040303';
const white = '#ffffff';

const ExpenseScreen = () => {
  const [expense, setExpense] = useState('');  // Add useState for expense
  const [date, setDate] = useState('');  // Add useState for date
  const [note, setNote] = useState('');  // Add useState for note
  const navigation = useNavigation();  // Get navigation object

  const handleAddExpense = () => {
    // Handle adding the expense (you can modify this function as needed)
    console.log("Expense added:", { expense, date, note });
    // You can navigate back or to another screen after adding the expense
    navigation.goBack();
  };

  const dismissKeyboard = () => {
    Keyboard.dismiss();
  };

  return (
    <TouchableWithoutFeedback onPress={dismissKeyboard}>
      <View style={styles.container}>
        <Text style={styles.title}>Add a New Expense</Text>

        <TextInput
          style={styles.input}
          value={expense}
          onChangeText={(text) => {
            if (/^\d*$/.test(text)) {
              setExpense(text);
            }
          }}
          keyboardType="numeric"
          placeholder="Enter expense amount"
          placeholderTextColor="#aaa"
        />

        <TextInput
          style={styles.dateInput}
          value={date}
          onChangeText={setDate}
          placeholder="Enter date (e.g., 2024-08-15)"
          placeholderTextColor="#aaa"
        />

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

        <View style={styles.buttonContainer}>
          <Button title="Add Expense" onPress={handleAddExpense} color={white} />
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: black,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 35,
    marginBottom: 30,
    color: lightGreen,
  },
  input: {
    width: '85%',
    height: 50,
    borderColor: white,
    borderWidth: 1,
    borderRadius: 6,
    paddingHorizontal: 10,
    fontSize: 18,
    color: white,
    marginLeft: 45,
    marginBottom: 30,
    backgroundColor: '#444',
  },
  dateInput: {
    width: '85%',
    height: 50,
    borderColor: white,
    borderWidth: 1,
    borderRadius: 6,
    paddingHorizontal: 10,
    fontSize: 18,
    color: white,
    alignSelf: 'center',
    marginBottom: 30,
    backgroundColor: '#444',
  },
  formContainer: {
    backgroundColor: '#333',
    borderRadius: 10,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    marginBottom: 50,
  },
  noteInput: {
    width: '100%',
    height: 200,
    borderColor: white,
    borderWidth: 1,
    borderRadius: 6,
    paddingHorizontal: 10,
    fontSize: 18,
    color: white,
    backgroundColor: '#444',
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
});

export default ExpenseScreen;
