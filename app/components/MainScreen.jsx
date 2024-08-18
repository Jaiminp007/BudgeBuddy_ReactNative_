import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import menuIcon from "../../assets/MenuIcon.png"; 
import addIcon from "../../assets/AddIcon.png";
import { DrawerActions } from "@react-navigation/native";
import { useRouter } from 'expo-router';
const userId="1234"
const name="Jaimini"
const lightGreen = "#7ae582";
const darkGreen = "#40916c";
const black = "#040303";
const white = "#ffffff";
const blue = "#264653";
const yellow = "#ffb703";

const MainScreen = ({ cashAmount}) => {  // Accept cashAmount as a prop
  const router = useRouter();
  const navigation = useNavigation();

  const [currentCashAmount, setCurrentCashAmount] = useState(cashAmount);

  useEffect(() => {
    if (cashAmount !== undefined) {
      setCurrentCashAmount(cashAmount);  // Update state with the new cashAmount
    }
  }, [cashAmount]);

  const handleMenuPress = () => {
    navigation.dispatch(DrawerActions.openDrawer()); // Opens the drawer
  };


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
          <Text style={styles.boxTextPara}>{String(currentCashAmount)}</Text>
        </View>

        <View style={styles.box}>
          <Text style={styles.boxTextHeading}>Top Expenses</Text>
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
}

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
  boxTextHeading: {
    fontSize: 17,
    textAlign: "left",
    color: yellow,
    fontWeight: "bold",
    marginBottom: 10,
    fontFamily: "Helvetica",
  },
  boxTextPara: {
    fontSize: 23,
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
