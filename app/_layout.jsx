import React, { useEffect, useState } from "react";
import { Drawer } from "expo-router/drawer";
import { Ionicons } from "@expo/vector-icons";
import { TouchableOpacity, View, StyleSheet, Alert } from "react-native";
import { useNavigation, DrawerActions } from "@react-navigation/native";
import { useTheme } from "react-native-paper";
import { DrawerContentScrollView, DrawerItem } from "@react-navigation/drawer";
import { useSegments } from "expo-router";
import GlobalData from "./GlobalData";
import AsyncStorage from "@react-native-async-storage/async-storage";

const CustomHeaderLeft = () => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      onPress={() => navigation.dispatch(DrawerActions.openDrawer())}
      style={{ paddingLeft: 10 }} // Adjust padding as needed
    >
      <Ionicons name="menu" size={24} color="black" />
    </TouchableOpacity>
  );
};

const CustomDrawerContent = ({props}) => {
  const [userData, setUserData] = useState(null);
  const navigation = useNavigation();
  const { colors } = useTheme();

  const handleDeleteAcc = async() => {
    const userId = GlobalData.userid;
    const jsonString = await AsyncStorage.getItem("userDetails");
    if (jsonString) {
      const parsedData = JSON.parse(jsonString);
      setUserData(parsedData.userDetails || {});
      if (parsedData["userDetails"] && parsedData["userDetails"][userId]) {
        const userName = parsedData["userDetails"][userId].name;
        delete parsedData["userDetails"][userId];
        await AsyncStorage.setItem("userDetails", JSON.stringify(parsedData));
        Alert.alert("Success", `${userName} has been deleted.`);
        GlobalData.userid = null;
        navigation.navigate("index");
      }
    }
  };

  const handleLogout = async () => {
    GlobalData.userid = null;
    navigation.navigate("index");
  };

  const handleDashboard = () => {
    const userid = GlobalData.userid;
    navigation.navigate("MainPage", { userId: userid });
  };

  useEffect(() => {}, []);

  return (
    <View style={{ flex: 1 }}>
      <DrawerContentScrollView {...props}>
        <DrawerItem
          icon={({ color, size }) => <Ionicons name="home-outline" color={color} size={size} />}
          label="Dashboard"
          onPress={handleDashboard}
        />
        <DrawerItem
          icon={({ color, size }) => <Ionicons name="chatbubble-ellipses-outline" color={color} size={size} />}
          label="Feedback"
          onPress={() => navigation.navigate("feedback")}
        />
        <DrawerItem
          icon={({ color, size }) => <Ionicons name="log-out-outline" color={color} size={size} />}
          label="Logout"
          onPress={handleLogout}
        />
        <DrawerItem
          icon={({ color, size }) => <Ionicons name="trash" color={color} size={size} />}
          label="Delete Account"
          onPress={handleDeleteAcc}
        />
      </DrawerContentScrollView>
    </View>
  );
};

export default function Layout() {
  const segments = useSegments();
  const isLoginRoute = segments.length === 0 || segments[0] === "login";

  return (
    <Drawer
      screenOptions={({ route }) => ({
        headerLeft: isLoginRoute ? null : () => <CustomHeaderLeft />,
        headerShown: !isLoginRoute,
      })}
      drawerPosition="right"
      drawerType="slide"
      drawerContent={(props) => <CustomDrawerContent {...props} />}
    >
      <Drawer.Screen name="MainPage" options={{ title: null, headerShown: false }} />
      <Drawer.Screen name="LandingPage" options={{ title: null, drawerLockMode: "locked-closed", headerShown: false }} />
      <Drawer.Screen name="ExpensePage" options={{ title: null, headerShown: false }} />
      <Drawer.Screen name="feedback" options={{ title: "Feedback", headerLeft: () => <CustomHeaderLeft /> }} />
      <Drawer.Screen name="LoginPage" options={{ title: null, headerShown: false }} />
    </Drawer>
  );
}

const styles = StyleSheet.create({
  userInfoSection: {
    paddingLeft: 20,
    paddingVertical: 30,
    alignItems: "center",
  },
  title: {
    fontSize: 20,
    marginTop: 10,
    fontWeight: "bold",
  },
  caption: {
    fontSize: 14,
    lineHeight: 14,
  },
});
