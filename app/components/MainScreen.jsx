import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  Dimensions,
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import menuIcon from "../../assets/MenuIcon.png";
import addIcon from "../../assets/AddIcon.png";
import { DrawerActions } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { LineChart } from "react-native-chart-kit";
import GlobalData from "../GlobalData";

const lightGreen = "#7ae582";
const darkGreen = "#40916c";
const black = "#040303";
const white = "#ffffff";
const blue = "#264653";
const yellow = "#ffb703";

import rupeeIcon from "../../assets/RupeeIcon.png"; // Adjust the path based on your folder structure
import dollarIcon from "../../assets/DollarIcon.png"; // Adjust the path based on your folder structure
import euroIcon from "../../assets/EuroIcon.png"; // Adjust the path based on your folder structure
import poundIcon from "../../assets/PoundIcon.png"; // Adjust the path based on your folder structure

const MainScreen = ({ }) => {
  /*
  const router = useRouter();
  const navigation = useNavigation();

  const [currentCashAmount, setCurrentCashAmount] = useState(cashAmount);
  const [currencyIcon, setCurrencyIcon] = useState(null);
  const [name, setName] = useState("");
  const [userId, setUserId] = useState("");
  const [loading, setLoading] = useState(true);
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [topExpenses, setTopExpenses] = useState([]);
  */

  const navigation = useNavigation();
  const route = useRoute();
    const {userId} = route.params;
 // Retrieve userId from navigation params

  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [cashAmount, setCashAmount] = useState(0);
  const [topExpenses, setTopExpenses] = useState([]);
  const [cashHistory, setCashHistory] = useState([]);
  const [currencyIcon, setCurrencyIcon] = useState("");
  
  const screenWidth = Dimensions.get("window").width;
  const screenHeight = Dimensions.get("window").height;

  const expenseLabels = cashHistory.map((_, index) => (index + 1).toString());

  const chartConfig = {
    backgroundGradientFrom: "#50C878",
    backgroundGradientFromOpacity: 0,
    backgroundGradientTo: "#008080",
    backgroundGradientToOpacity: 0.9,
    color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
    strokeWidth: 2,
    barPercentage: 0.5,
    useShadowColorFromDataset: false,
    paddingLeft: 80, // Add padding to the left to create more space
  paddingRight: 20,
    propsForDots: {
      r: "6", // Radius of the point
      strokeWidth: "2", // Width of the point border
      stroke: "#ffffff",
     // Color of the point border
    },
    propsForLabels: {
      // Properties for labels
      fontFamily: "Helvetica",
      fontSize: "12",
      fontWeight: "bold",
      fill: "#ffffff",
      padding: 40, // Ensures labels are white
    },
  };

  // Calculate the chart dimensions
  const chartWidth = screenWidth - 60; // 20px padding on each side
  const chartHeight = screenHeight -550; // Fixed height, adjust as necessary

  // handleMenuPress function defined here
  const handleMenuPress = () => {
    GlobalData.userid = userId;
    navigation.dispatch(DrawerActions.openDrawer());
  };

  const handleNavigation = async () => {
    navigation.navigate("ExpensePage", {userId: userId});
  }
  const fetchData = async () => {
  
      const jsonString = await AsyncStorage.getItem("userDetails"); // Check what is being retrieved from AsyncStorage
      
      if (jsonString) {
        const allData = JSON.parse(jsonString);
  
        if (allData && allData["userDetails"] && allData["userDetails"][userId]) {
          const userData = allData["userDetails"][userId];
          setUserData(userData); // Set the userData state
          if (userData["Topexpenses"]){
          const expenseList = userData["Topexpenses"];
          setTopExpenses(expenseList);
          }
          if (userData["cashHistory"]){
            const cashHistory = userData["cashHistory"]
            setCashHistory(cashHistory)
          }
          const currencyIcon = userData["selectedCurrencyIcon"];
          if (currencyIcon == "RupeeIcon.png") {
            setCurrencyIcon(rupeeIcon);
          }else if(currencyIcon == "EuroIcon.png") {
            setCurrencyIcon(euroIcon);
          }else if (currencyIcon == "PoundIcon.png"){
            setCurrencyIcon(poundIcon);
          }else{
            setCurrencyIcon(dollarIcon);
          }
          const cashAmount = userData["cashAmount"]; // Retrieve cashAmount directly from userData
          setCashAmount(cashAmount); // Set the cashAmount state
        }
      }
    
  };
  
  useEffect(() => {
    const loadWithDelay = async () => {
      setLoading(true);
      await fetchData();
      setTimeout(() => {
        setLoading(false);
      },200); // 1.5-second delay
    };

    loadWithDelay();

    const focusListener = navigation.addListener("focus", () => {
      loadWithDelay();
    });

    return () => {
      // Clean up the listener when the component unmounts
      focusListener();
    };
  }, [navigation, userId]);


    
  
  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#40916c" />
      </View>
    );
  }

  if (!userData) {
    return (
      <View style={styles.container}>
        <Text>No user data found.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerTextContainer}>
          <Text style={styles.headerText}>Hello {userData.name}</Text>
          <Text style={styles.idText}>ID: {userId}</Text>
        </View>
        <TouchableOpacity onPress={handleMenuPress} style={styles.menuButton}>
          <Image source={menuIcon} style={styles.menuIcon} />
        </TouchableOpacity>
      </View>
  
      <View style={styles.row}>
        <View style={styles.box}>
          <Text style={styles.boxTextHeading}>Cash Amount</Text>
          <View style={styles.currencyBox}>
          <Image source={currencyIcon} style={[
            styles.currencyIconCash,
            cashAmount > 100000
            ? {width: 24, height: 24}
            : {width: 30, height: 30}
            ]} />
          <View style={styles.cashAmountContainer}>
            {/* {currencyIcon ? ( 
              <Image source={currencyIcon} style={styles.currencyIconCash} />
            ) : (
              <Text style={styles.fallbackText}>No Icon</Text> 
            )}*/}
            <Text style={[
              styles.boxTextParaCash,
              cashAmount > 100000 ? { fontSize: 24 } : { fontSize: 30 }
              ]}>
              {cashAmount}
            </Text>
            </View>
          </View>
        </View>
  
        <View style={styles.box}>
          <Text style={styles.boxTextHeading}>Top Expenses</Text>
          {topExpenses.length > 0 ? (
      <>
        <View style={styles.expenseItem}>
          <Image source={currencyIcon} style={styles.currencyIcon} />
          <Text style={styles.boxTextPara}>{topExpenses[0]}</Text>
        </View>
        {topExpenses.length > 1 && (
          <View style={styles.expenseItem}>
            <Image source={currencyIcon} style={styles.currencyIcon} />
            <Text style={styles.boxTextPara}>{topExpenses[1]}</Text>
          </View>
        )}
        {topExpenses.length > 2 && (
          <View style={styles.expenseItem}>
            <Image source={currencyIcon} style={styles.currencyIcon} />
            <Text style={styles.boxTextPara}>{topExpenses[2]}</Text>
          </View>
        )}
      </>
    ) : (
      <Text style={styles.boxTextPara}>No Expenses</Text>
    )}
  </View>
</View>
  
      <View style={styles.bigBox}>
        <Text style={styles.bigBoxText}>Graph</Text>
        {cashHistory.length > 0 ? (
          <LineChart
            data={{
              labels: expenseLabels, // Labels for the x-axis (1, 2, 3, 4, ...)
              datasets: [
                {
                  data: cashHistory, // Your cashHistory array containing the cash amounts
                },
              ],
            }}
            width={chartWidth} // from Dimensions
            height={chartHeight} // Specify the height of the chart
            yAxisLabel="₹" // Label for y-axis, assuming currency is INR
            chartConfig={chartConfig} // Your chart configuration
            bezier // Optional: Adds a bezier curve to the line chart
            style={{
              marginVertical: -10,
              marginHorizontal: 80,
              borderRadius: 16,
              alignSelf: "center",
            }}
          />
        ) : (
          <Text style={styles.noDataText}>No data available to display</Text>
        )}
      </View>
  
      <View style={styles.wideBox}>
        <TouchableOpacity onPress={handleNavigation}>
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
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
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
    fontFamily: "System",
    fontWeight: "bold",
    marginTop: 30,
    textAlign: "left",
    color: black,
  },
  idText: {
    fontSize: 14,
    color: black,
    marginTop: 5,
    fontFamily: "System",
    textAlign: "left",
  },
  fallbackText: {
    color: "red", // Adjust the fallback text style as needed
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
    flexDirection: "row", // Align icon and cash amount horizontally
    alignItems: "center", // Center align the items vertically
  },
  expenseBoxContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 4,
  },
  expenseItem: {
    alignItems: 'center',
  flexDirection: "row",
  justifyContent: "flex-start",
  },
  currencyBox: {
    alignItems: 'center',
  flexDirection: "row",
  justifyContent: "flex-start",
  },
  currencyIconCash: {
    width: 30, // Adjust the size of the currency icon
    height: 30,
    marginRight: 5,
    tintColor: white,
    marginTop: 2,
  },
  currencyIcon: {
    width: 20, // Adjust the size of the currency icon
    height: 20,
    marginRight: 2,
    tintColor: white,
    marginTop: 3,
  },
  boxTextHeading: {
    fontSize: 17,
    textAlign: "left",
    color: yellow,
    fontWeight: "bold",
    marginBottom: 8,
    fontFamily: "System",
  },
  expenseText: {
    fontSize: 20,
    color: white,
    textAlign: "left",
    fontFamily: "System",
  },
  expenseNumber: {
    color: white,
    fontSize: 20,
    fontFamily: "Helvetica",
  },
  boxTextPara: {
    fontSize: 20,
    color: white,
    textAlign: "left",
    fontFamily: "System",
  },
  boxTextParaCash: {
    fontSize: 30,
    color: white,
    textAlign: "left",
    fontFamily: "System",
  },
  bigBoxText: {
    fontSize: 25,
    fontWeight: "bold",
    marginBottom: 20,
    color: yellow,
    textAlign: "left",
    fontFamily: "System",
  },
});

export default MainScreen;
