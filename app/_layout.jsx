import React from "react";
import { Drawer } from "expo-router/drawer";
import { Ionicons } from "@expo/vector-icons";
import { TouchableOpacity, View, Text, StyleSheet } from "react-native";
import { useNavigation, DrawerActions } from "@react-navigation/native";
import { Avatar, useTheme } from "react-native-paper";
import { DrawerContentScrollView, DrawerItem } from "@react-navigation/drawer";
import { Slot, useSegments } from "expo-router";

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

const CustomDrawerContent = (props) => {
  const { colors } = useTheme();
  return (
    <View style={{ flex: 1 }}>
      <View style={styles.userInfoSection}>
        <Avatar.Image
          source={{
            uri: "https://placekitten.com/200/200",
          }}
          size={50}
        />
        <Text style={styles.title}>John Doe</Text>
        <Text style={styles.caption}>@johndoe</Text>
      </View>
      <DrawerContentScrollView {...props}>
        <DrawerItem
          icon={({ color, size }) => (
            <Ionicons name="home-outline" color={color} size={size} />
          )}
          label="Dashboard"
          onPress={() => props.navigation.navigate("dashboard")}
        />
        <DrawerItem
          icon={({ color, size }) => (
            <Ionicons name="bug-outline" color={color} size={size} />
          )}
          label="Problem Screen"
          onPress={() => props.navigation.navigate("problem")}
        />
        <DrawerItem
          icon={({ color, size }) => (
            <Ionicons name="server-outline" color={color} size={size} />
          )}
          label="Host Screen"
          onPress={() => props.navigation.navigate("hostDetailScreen")}
        />
        <DrawerItem
          icon={({ color, size }) => (
            <Ionicons name="log-out-outline" color={color} size={size} />
          )}
          label="Logout"
          onPress={() => {
            /* Add your logout logic here */
          }}
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
        headerShown: !isLoginRoute, // Hide header on login route
      })}
      drawerContent={(props) => <CustomDrawerContent {...props} />}>
      <Drawer.Screen
        name="login"
        options={{
          title: "Login",
          headerLeft: () => <CustomHeaderLeft />,
        }}
      />
      <Drawer.Screen
        name="dashboard"
        options={{
          title: "Dashboard",
          headerLeft: () => <CustomHeaderLeft />,
        }}
      />
      <Drawer.Screen
        name="problem"
        options={{
          title: "Problem Screen",
          headerLeft: () => <CustomHeaderLeft />,
        }}
      />
      <Drawer.Screen
        name="hostDetailScreen"
        options={{
          title: "Host Screen",
          headerLeft: () => <CustomHeaderLeft />,
        }}
      />
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
