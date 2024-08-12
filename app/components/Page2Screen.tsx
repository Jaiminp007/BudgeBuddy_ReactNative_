import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  ScrollView,
  TouchableOpacity,
  Image,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { useRouter } from "expo-router";
import menuIcon from "../../assets/MenuIcon.png"; // Adjust the path based on your folder structure

const Page2 = ({ route }) => {
  //const { cashAmount } = route.params || {}; // Ensure cashAmount is available
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    setLoading(false); // Stop the loading animation when the component is ready
  }, []);

  const handleMenuPress = () => {
    console.log("Menu button pressed");
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#f8f9fa" }}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}>
        <ScrollView contentContainerStyle={styles.container}>
          <View style={styles.header}>
            <View style={styles.headerTextContainer}>
              <Text style={styles.headerText}>Hello User</Text>
              <Text style={styles.idText}>ID: 12345</Text>
            </View>
            {/* <TouchableOpacity
              onPress={handleMenuPress}
              style={styles.menuButton}>
              <Image source={menuIcon} style={styles.menuIcon} />
            </TouchableOpacity> */}
          </View>

          <View style={styles.row}>
            <View style={styles.box}>
              {/* <Text style={styles.boxText}>Cash Amount: 
            //  {cashAmount}
              </Text> */}
            </View>

            <View style={styles.box}>
              <Text style={styles.boxText}>Box 2 Content</Text>
            </View>
          </View>

          <View style={styles.bigBox}>
            <Text style={styles.boxText}>Big Box Content</Text>
          </View>

          <View style={styles.wideBox}>
            <Text style={styles.boxText}>Wide Box Content</Text>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const { width } = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    paddingVertical: 16,
    paddingHorizontal: 8,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end", // Aligns the menu button with the text vertically
    marginBottom: 20, // Space between header and the row of boxes
  },
  headerTextContainer: {
    flexDirection: "column",
  },
  headerText: {
    fontSize: 28,
    fontWeight: "bold",
    marginTop: 30,
    textAlign: "left",
  },
  idText: {
    fontSize: 14,
    color: "#666",
    marginTop: 5, // Space between "Hello User" and ID
    textAlign: "left",
  },
  menuButton: {
    padding: 10, // Adds some padding to increase the touchable area
    marginBottom: 8, // Adjust this value to align with the text
  },
  menuIcon: {
    width: 30,
    height: 30,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20, // Space between the row and the big box
  },
  box: {
    width: "48%",
    aspectRatio: 1, // Ensures the box is square
    backgroundColor: "#ffffff",
    padding: 20,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5, // Adds shadow for Android
    justifyContent: "center",
    alignItems: "center",
  },
  bigBox: {
    width: "100%",
    aspectRatio: 1, // Ensures the box is square
    backgroundColor: "#ffffff",
    padding: 20,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5, // Adds shadow for Android
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20, // Space between the big box and wide box
  },
  wideBox: {
    width: "100%",
    height: Dimensions.get("window").height * 0.1, // 10% of the screen height
    backgroundColor: "#ffffff",
    padding: 20,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5, // Adds shadow for Android
    justifyContent: "center",
    alignItems: "center",
  },
  boxText: {
    fontSize: 18,
    color: "#333",
    textAlign: "center",
  },
});

export default Page2;
