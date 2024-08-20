import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import menuIcon from "../../assets/MenuIcon.png"; 
import addIcon from "../../assets/AddIcon.png";
import { DrawerActions } from "@react-navigation/native";
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';

const lightGreen = "#7ae582";
const darkGreen = "#40916c";
const black = "#040303";
const white = "#ffffff";
const blue = "#264653";
const yellow = "#ffb703";

// Import images
import rupeeIcon from "../../assets/RupeeIcon.png";
import dollarIcon from "../../assets/DollarIcon.png";
import euroIcon from "../../assets/EuroIcon.png";
import poundIcon from "../../assets/PoundIcon.png";

const MainScreen = ({ cashAmount }) => {
  const router = useRouter();
  const navigation = useNavigation();

  const [currentCashAmount, setCurrentCashAmount] = useState(cashAmount);
  const [currencyIcon, setCurrencyIcon] = useState(null);
  const [name, setName] = useState('');
  const [userId, setUserId] = useState('');
  const [loading, setLoading] = useState(true);
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [topExpenses, setTopExpenses] = useState([]);


  const retrieveData = async () => {
    try {
      const values = await AsyncStorage.multiGet([
        'name',
        'username',
        'password',
        'userId',
        'cashAmount',
        'selectedCurrencyIcon',
        'expenses',
      ]);

      const savedName = values[0][1];
      const savedUsername = values[1][1];
      const savedPassword = values[2][1];
      const savedUserId = values[3][1];
      const savedCashAmount = values[4][1];
      const savedCurrencyIcon = values[5][1];
      const storedExpenses = values[6][1]; 

      console.log('--- Retrieved Data ---');
      console.log('Name:', savedName);
      console.log('Username:', savedUsername);
      console.log('Password:', savedPassword);
      console.log('User ID:', savedUserId);
      console.log('Cash Amount:', savedCashAmount);
      console.log('Retrieved Currency Icon:', savedCurrencyIcon);
        // Log retrieved value

      let expenses = {};
      if (storedExpenses) {
        expenses = JSON.parse(storedExpenses);
      }
      console.log('Expenses Dictionary:', expenses);  // Log the expenses

      const sortedExpenses = Object.entries(expenses)
      .sort((a, b) => parseFloat(b[0]) - parseFloat(a[0]))  // Sort by expense amount in descending order
      .slice(0, 3);  // Get the top 3 expenses
      setTopExpenses(sortedExpenses);  // Set the top expenses in state

      // Update state only if values are not null or undefined
      if (savedName) setName(savedName);
      if (savedUsername) setUsername(savedUsername);
      if (savedPassword) setPassword(savedPassword);
      if (savedUserId) setUserId(savedUserId);
      if (savedCashAmount) setCurrentCashAmount(savedCashAmount);

      // Map the path string to the corresponding imported image
      if (savedCurrencyIcon === '../../assets/RupeeIcon.png') {
        setCurrencyIcon(rupeeIcon);
      } else if (savedCurrencyIcon === '../../assets/DollarIcon.png') {
        setCurrencyIcon(dollarIcon);
      } else if (savedCurrencyIcon === '../../assets/EuroIcon.png') {
        setCurrencyIcon(euroIcon);
      } else if (savedCurrencyIcon === '../../assets/PoundIcon.png') {
        setCurrencyIcon(poundIcon);
      } else {
        setCurrencyIcon(null); // Handle the case where no icon is found
        console.log('No matching icon found');
      }
    } catch (e) {
      console.log('Failed to retrieve the data from the storage:', e);
    } finally {
      setLoading(false); // Set loading to false after retrieval
    }
  };

  useEffect(() => {
    if (cashAmount !== undefined) {
      setCurrentCashAmount(cashAmount); 
      retrieveData();
    }
  }, [cashAmount]);

  const handleMenuPress = () => {
    navigation.dispatch(DrawerActions.openDrawer()); // Opens the drawer
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#40916c" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerTextContainer}>
          <Text style={styles.headerText}>Hello {String(name)}</Text>
          <Text style={styles.idText}>ID: {String(userId)}</Text>
        </View>
        <TouchableOpacity onPress={handleMenuPress} style={styles.menuButton}>
          <Image source={menuIcon} style={styles.menuIcon} />
        </TouchableOpacity>
      </View>

      <View style={styles.row}>
        <View style={styles.box}>
          <Text style={styles.boxTextHeading}>Cash Amount</Text>
          <View style={styles.cashAmountContainer}>
            {currencyIcon ? (
              <Image source={currencyIcon} style={styles.currencyIconCash} />
            ) : (
              <Text style={styles.fallbackText}>No Icon</Text> // Fallback if no icon is found
            )}
            <Text style={styles.boxTextParaCash}>{String(currentCashAmount)}</Text>
          </View>
        </View>

        <View style={styles.box}>
          <Text style={styles.boxTextHeading}>Top Expenses</Text>
          {topExpenses.length > 0 ? (
            topExpenses.map(([expense], index) => (
            <View style={styles.expenseBoxContainer}>
              <Text style={styles.expenseNumber}>{`${index + 1}) `}</Text>
              {currencyIcon ? (
                <Image source={currencyIcon} style={styles.currencyIcon} />
              ) : (
                <Text style={styles.fallbackText}>No Icon</Text>
              )}
              <Text style={styles.expenseText}>{expense}</Text>
            </View>
            ))
          ) : (
            <Text style={styles.expenseText}>No expenses yet</Text>
          )}
        </View>
      </View>

      <View style={styles.bigBox}>
        <Text style={styles.bigBoxText}>Graph</Text>
      </View>

      <View style={styles.wideBox}>
        <TouchableOpacity
          onPress={() => router.push({
            pathname: '/ExpensePage',
            params: { cashAmount: currentCashAmount },  // Pass cashAmount to ExpensePage
          })}>
          <View style={styles.circle}>
            <Image source={addIcon} style={styles.addIcon} />
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: white,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
    marginBottom: 20,
  },
  headerTextContainer: {
    flexDirection: "column",
  },
  headerText: {
    fontSize: 28,
    fontFamily: "Helvetica",
    fontWeight: "bold",
    marginTop: 30,
    textAlign: "left",
    color: black,
  },
  idText: {
    fontSize: 14,
    color: black,
    marginTop: 5,
    fontFamily: "Helvetica",
    textAlign: "left",
  },
  fallbackText: {
    color: 'red', // Adjust the fallback text style as needed
  },  
  menuButton: {
    padding: 10,
    marginBottom: 8,
  },
  menuIcon: {
    width: 30,
    height: 30,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  box: {
    width: "48%",
    aspectRatio: 1,
    backgroundColor: blue,
    padding: 20,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
  },
  bigBox: {
    width: "100%",
    aspectRatio: 1,
    backgroundColor: blue,
    padding: 20,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
    marginBottom: 20,
  },
  wideBox: {
    width: "100%",
    height: "10%",
    backgroundColor: lightGreen,
    padding: 20,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
    justifyContent: "center",
    alignItems: "center",
  },
  circle: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: yellow,
    justifyContent: "center",
    alignItems: "center",
  },
  addIcon: {
    width: 25,
    height: 25,
  },
  cashAmountContainer: {
    flexDirection: 'row', // Align icon and cash amount horizontally
    alignItems: 'center', // Center align the items vertically
  },
  expenseBoxContainer: {
    flexDirection: 'row',
    alignItems: "center",
    marginTop: 4,
  },
  currencyIconCash: {
    width: 23, // Adjust the size of the currency icon
    height: 23,
    marginRight: 5,
    tintColor: white,
    marginTop: 2,
  },
  currencyIcon: {
    width: 20, // Adjust the size of the currency icon
    height: 20,
    marginRight: 5,
    tintColor: white,
    marginTop: 2,
  },
  boxTextHeading: {
    fontSize: 17,
    textAlign: "left",
    color: yellow,
    fontWeight: "bold",
    marginBottom: 8,
    fontFamily: "Helvetica",
  },
  expenseText: {
    fontSize: 20,
    color: white,
    textAlign: "left",
    fontFamily: "Helvetica",
  },
  expenseNumber: {
    color: white,
    fontSize: 20,
    fontFamily: "Helvetica"
  },
  boxTextPara: {
    fontSize: 20,
    color: white,
    textAlign: "left",
    fontFamily: "Helvetica",
  },
  boxTextParaCash: {
    fontSize: 25,
    color: white,
    textAlign: "left",
    fontFamily: "Helvetica",
  },
  bigBoxText: {
    fontSize: 25,
    fontWeight: "bold",
    marginBottom: 20,
    color: yellow,
    textAlign: "left",
    fontFamily: "Helvetica",
  },
});

export default MainScreen;
