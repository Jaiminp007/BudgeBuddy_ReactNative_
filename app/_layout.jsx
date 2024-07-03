// import React from "react";
// import { Drawer } from "expo-router/drawer";
// import { Ionicons } from "@expo/vector-icons";
// import { TouchableOpacity, View, Text, StyleSheet } from "react-native";
// import { useNavigation, DrawerActions } from "@react-navigation/native";
// import { Avatar, useTheme } from "react-native-paper";
// import { DrawerContentScrollView, DrawerItem } from "@react-navigation/drawer";
// import { Slot, useSegments } from "expo-router";

// const CustomHeaderLeft = () => {
//   const navigation = useNavigation();

//   return (
//     <TouchableOpacity
//       onPress={() => navigation.dispatch(DrawerActions.openDrawer())}
//       style={{ paddingLeft: 10 }} // Adjust padding as needed
//     >
//       <Ionicons name="menu" size={24} color="black" />
//     </TouchableOpacity>
//   );
// };

// const CustomDrawerContent = (props) => {
//   const { colors } = useTheme();

//   const handleLogout = async () => {
//     // Navigate to the login screen
//     props.navigation.navigate("login");

//     // Reload the app
//     props.navigation.reset({
//       index: 0,
//       routes: [{ name: "login" }],
//     });
//   };

//   return (
//     <View style={{ flex: 1 }}>
//       {/* <View style={styles.userInfoSection}>
//         <Avatar.Image
//           source={{
//             uri: "https://placekitten.com/200/200",
//           }}
//           size={50}
//         />
//         <Text style={styles.title}>John Doe</Text>
//         <Text style={styles.caption}>@johndoe</Text>
//       </View> */}
//       <DrawerContentScrollView {...props}>
//         <DrawerItem
//           icon={({ color, size }) => (
//             <Ionicons name="home-outline" color={color} size={size} />
//           )}
//           label="Dashboard"
//           onPress={() => props.navigation.navigate("dashboard")}
//         />
//         <DrawerItem
//           icon={({ color, size }) => (
//             <Ionicons name="bug-outline" color={color} size={size} />
//           )}
//           label="Problem Screen"
//           onPress={() => props.navigation.navigate("problem")}
//         />
//         <DrawerItem
//           icon={({ color, size }) => (
//             <Ionicons name="server-outline" color={color} size={size} />
//           )}
//           label="Host Screen"
//           onPress={() => props.navigation.navigate("host")}
//         />
//         <DrawerItem
//           icon={({ color, size }) => (
//             <Ionicons name="log-out-outline" color={color} size={size} />
//           )}
//           label="Logout"
//           onPress={handleLogout}
//         />
//       </DrawerContentScrollView>
//     </View>
//   );
// };

// export default function Layout() {
//   const segments = useSegments();
//   const isLoginRoute = segments.length === 0 || segments[0] === "login";

//   return (
//     <Drawer
//       screenOptions={({ route }) => ({
//         headerLeft: isLoginRoute ? null : () => <CustomHeaderLeft />,
//         headerShown: !isLoginRoute, // Hide header on login route
//       })}
//       drawerContent={(props) => <CustomDrawerContent {...props} />}>
//       <Drawer.Screen
//         name="login"
//         options={{
//           title: "Login",
//           headerLeft: () => <CustomHeaderLeft />,
//         }}
//       />
//       <Drawer.Screen
//         name="dashboard"
//         options={{
//           title: "Dashboard",
//           headerLeft: () => <CustomHeaderLeft />,
//         }}
//       />
//       <Drawer.Screen
//         name="problem"
//         options={{
//           title: "Problem Screen",
//           headerLeft: () => <CustomHeaderLeft />,
//         }}
//       />
//       <Drawer.Screen
//         name="host"
//         options={{
//           title: "Host Screen",
//           headerLeft: () => <CustomHeaderLeft />,
//         }}
//       />
//       <Drawer.Screen
//         name="groupProblems"
//         options={{
//           title: "Group Problems",
//           headerLeft: () => <CustomHeaderLeft />,
//         }}
//       />

//       <Drawer.Screen
//         name="problemDetail"
//         options={{
//           title: "Problem Detail",
//           headerLeft: () => <CustomHeaderLeft />,
//         }}
//       />

//       <Drawer.Screen
//         name="hostDetail"
//         options={{
//           title: "Host Detail",
//           headerLeft: () => <CustomHeaderLeft />,
//         }}
//       />
//     </Drawer>
//   );
// }

// const styles = StyleSheet.create({
//   userInfoSection: {
//     paddingLeft: 20,
//     paddingVertical: 30,
//     alignItems: "center",
//   },
//   title: {
//     fontSize: 20,
//     marginTop: 10,
//     fontWeight: "bold",
//   },
//   caption: {
//     fontSize: 14,
//     lineHeight: 14,
//   },
// });

import React from "react";
import { Drawer } from "expo-router/drawer";
import { Ionicons } from "@expo/vector-icons";
import { TouchableOpacity, View, Text, StyleSheet } from "react-native";
import { useNavigation, DrawerActions } from "@react-navigation/native";
import { Avatar, useTheme } from "react-native-paper";
import { DrawerContentScrollView, DrawerItem } from "@react-navigation/drawer";
import { Slot, useSegments } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { authService } from "./services/apiHost";

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

  const handleLogout = async () => {
    // Clear the auth token and credentials from memory and AsyncStorage
    authService.logout();
    // await AsyncStorage.clear();

    // Navigate to the login screen
    props.navigation.navigate("login");

    // Reload the app
    props.navigation.reset({
      index: 0,
      routes: [{ name: "login" }],
    });
  };

  return (
    <View style={{ flex: 1 }}>
      {/* <View style={styles.userInfoSection}>
        <Avatar.Image
          source={{
            uri: "https://placekitten.com/200/200",
          }}
          size={50}
        />
        <Text style={styles.title}>John Doe</Text>
        <Text style={styles.caption}>@johndoe</Text>
      </View> */}
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
          onPress={() => props.navigation.navigate("host")}
        />
        <DrawerItem
          icon={({ color, size }) => (
            <Ionicons name="log-out-outline" color={color} size={size} />
          )}
          label="Logout"
          onPress={handleLogout}
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
        name="host"
        options={{
          title: "Host Screen",
          headerLeft: () => <CustomHeaderLeft />,
        }}
      />
      <Drawer.Screen
        name="groupProblems"
        options={{
          title: "Group Problems",
          headerLeft: () => <CustomHeaderLeft />,
        }}
      />

      <Drawer.Screen
        name="problemDetail"
        options={{
          title: "Problem Detail",
          headerLeft: () => <CustomHeaderLeft />,
        }}
      />

      <Drawer.Screen
        name="hostDetail"
        options={{
          title: "Host Detail",
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
