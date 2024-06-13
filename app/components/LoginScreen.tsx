// import React, { useState } from "react";
// import {
//   View,
//   TextInput,
//   StyleSheet,
//   Text,
//   TouchableOpacity,
//   Animated,
//   Easing,
// } from "react-native";
// import { useRouter } from "expo-router";
// import { CheckBox } from "react-native-elements";
// import { useNavigation } from "@react-navigation/native";
// // import { login } from "../services/apiHost";
// // const navigation = useNavigation();

// const LoginScreen = () => {
//   const [serverName, setServerName] = useState("");
//   const [serverHost, setServerHost] = useState("");
//   const [username, setUsername] = useState("");
//   const [password, setPassword] = useState("");
//   const [rememberMe, setRememberMe] = useState(false);
//   const [useHttpAuth, setUseHttpAuth] = useState(false);
//   const [httpUser, setHttpUser] = useState("");
//   const [httpPassword, setHttpPassword] = useState("");
//   const [httpFieldsHeight] = useState(new Animated.Value(0));
//   // const authToken = login();
//   const router = useRouter();

//   const handleLogin = () => {
//     // const authToken = login();
//     // Implement your login logic here
//     // Navigate to the Dashboard screen
//     router.push({
//       pathname: "/dashboard",
//       params: {
//         serverName,
//         serverHost,
//         username,
//         password,
//         httpUser,
//         httpPassword,
//         // authToken,
//         rememberMe: rememberMe.toString(),
//         useHttpAuth: useHttpAuth.toString(),
//       },
//     });
//   };

//   function toggleHttpAuth() {
//     setUseHttpAuth(!useHttpAuth);
//     Animated.timing(httpFieldsHeight, {
//       toValue: useHttpAuth ? 0 : 100, // Adjust based on the actual height needed
//       duration: 300,
//       easing: Easing.ease,
//       useNativeDriver: false,
//     }).start();
//   }

//   return (
//     <View style={styles.container}>
//       <Text style={styles.branding}>ZApp</Text>
//       <View style={styles.inputContainer}>
//         <TextInput
//           style={styles.input}
//           placeholder="Server Name"
//           value={serverName}
//           onChangeText={setServerName}
//           placeholderTextColor="#888"
//         />
//         <TextInput
//           style={styles.input}
//           placeholder="Zabbix Url"
//           value={serverHost}
//           onChangeText={setServerHost}
//           placeholderTextColor="#888"
//         />
//         <TextInput
//           style={styles.input}
//           placeholder="Zabbix User"
//           value={username}
//           onChangeText={setUsername}
//           placeholderTextColor="#888"
//         />
//         <TextInput
//           style={styles.input}
//           placeholder="Zabbix Password"
//           value={password}
//           onChangeText={setPassword}
//           secureTextEntry
//           placeholderTextColor="#888"
//         />
//         <CheckBox
//           title="Use HTTP Authentication"
//           checked={useHttpAuth}
//           onPress={toggleHttpAuth}
//           containerStyle={styles.checkboxContainer}
//           textStyle={styles.checkboxLabel}
//         />
//         <Animated.View
//           style={[styles.httpAuthContainer, { height: httpFieldsHeight }]}>
//           {useHttpAuth && (
//             <>
//               <TextInput
//                 style={styles.input}
//                 placeholder="HTTP Username"
//                 value={httpUser}
//                 onChangeText={setHttpUser}
//                 placeholderTextColor="#888"
//               />
//               <TextInput
//                 style={styles.input}
//                 placeholder="HTTP Password"
//                 value={httpPassword}
//                 onChangeText={setHttpPassword}
//                 secureTextEntry
//                 placeholderTextColor="#888"
//               />
//             </>
//           )}
//         </Animated.View>
//         <CheckBox
//           title="Remember Me"
//           checked={rememberMe}
//           onPress={() => setRememberMe(!rememberMe)}
//           containerStyle={styles.checkboxContainer}
//           textStyle={styles.checkboxLabel}
//         />
//         <TouchableOpacity style={styles.button} onPress={handleLogin}>
//           <Text style={styles.buttonText}>Login</Text>
//         </TouchableOpacity>
//       </View>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//     paddingHorizontal: 16,
//     backgroundColor: "#f0f4f7",
//   },
//   branding: {
//     fontSize: 32,
//     fontWeight: "bold",
//     textAlign: "center",
//     marginBottom: 40,
//     color: "#333",
//   },
//   inputContainer: {
//     width: "100%",
//     maxWidth: 400,
//     alignItems: "center",
//   },
//   input: {
//     height: 50,
//     borderColor: "#ddd",
//     borderWidth: 1,
//     borderRadius: 8,
//     marginBottom: 16,
//     paddingHorizontal: 10,
//     backgroundColor: "#fff",
//     fontSize: 16,
//     width: "100%",
//   },
//   checkboxContainer: {
//     backgroundColor: "transparent",
//     borderWidth: 0,
//     marginLeft: 0,
//     marginRight: 0,
//     padding: 0,
//   },
//   checkboxLabel: {
//     color: "#333",
//   },
//   httpAuthContainer: {
//     overflow: "hidden",
//     width: "100%",
//   },
//   button: {
//     backgroundColor: "#007bff",
//     paddingVertical: 15,
//     borderRadius: 8,
//     alignItems: "center",
//     justifyContent: "center",
//     width: "100%",
//     marginTop: 20,
//   },
//   buttonText: {
//     color: "#fff",
//     fontSize: 18,
//     fontWeight: "bold",
//   },
// });

// export default LoginScreen;

// import React, { useState } from "react";
// import {
//   View,
//   TextInput,
//   StyleSheet,
//   Text,
//   TouchableOpacity,
//   Animated,
//   Easing,
// } from "react-native";
// import { useRouter } from "expo-router";
// import { CheckBox } from "react-native-elements";
// import * as Keychain from "react-native-keychain";
// import AsyncStorage from "@react-native-async-storage/async-storage";

// const LoginScreen = () => {
//   const [serverName, setServerName] = useState("");
//   const [serverHost, setServerHost] = useState("");
//   const [username, setUsername] = useState("");
//   const [password, setPassword] = useState("");
//   const [rememberMe, setRememberMe] = useState(false);
//   const [useHttpAuth, setUseHttpAuth] = useState(false);
//   const [httpUser, setHttpUser] = useState("");
//   const [httpPassword, setHttpPassword] = useState("");
//   const [httpFieldsHeight] = useState(new Animated.Value(0));
//   const router = useRouter();

//   const handleLogin = async () => {
//     const key = `${serverName}_${username}`;

//     try {
//       // Store credentials in AsyncStorage
//       await AsyncStorage.setItem(key, JSON.stringify({ username, password }));
//       await AsyncStorage.setItem(
//         `${key}_server`,
//         JSON.stringify({ serverHost, serverName })
//       );

//       if (useHttpAuth) {
//         await AsyncStorage.setItem(
//           `${key}_http`,
//           JSON.stringify({ httpUser, httpPassword })
//         );
//       }

//       // Navigate to the dashboard
//       router.push({
//         pathname: "/dashboard",
//         params: {
//           key,
//           rememberMe: rememberMe.toString(),
//           useHttpAuth: useHttpAuth.toString(),
//         },
//       });
//     } catch (error) {
//       console.error("Error saving credentials", error);
//     }
//   };

//   function toggleHttpAuth() {
//     setUseHttpAuth(!useHttpAuth);
//     Animated.timing(httpFieldsHeight, {
//       toValue: useHttpAuth ? 0 : 100,
//       duration: 300,
//       easing: Easing.ease,
//       useNativeDriver: false,
//     }).start();
//   }

//   return (
//     <View style={styles.container}>
//       <Text style={styles.branding}>ZApp</Text>
//       <View style={styles.inputContainer}>
//         <TextInput
//           style={styles.input}
//           placeholder="Server Name"
//           value={serverName}
//           onChangeText={setServerName}
//           placeholderTextColor="#888"
//         />
//         <TextInput
//           style={styles.input}
//           placeholder="Zabbix Url"
//           value={serverHost}
//           onChangeText={setServerHost}
//           placeholderTextColor="#888"
//         />
//         <TextInput
//           style={styles.input}
//           placeholder="Zabbix User"
//           value={username}
//           onChangeText={setUsername}
//           placeholderTextColor="#888"
//         />
//         <TextInput
//           style={styles.input}
//           placeholder="Zabbix Password"
//           value={password}
//           onChangeText={setPassword}
//           secureTextEntry
//           placeholderTextColor="#888"
//         />
//         <CheckBox
//           title="Use HTTP Authentication"
//           checked={useHttpAuth}
//           onPress={toggleHttpAuth}
//           containerStyle={styles.checkboxContainer}
//           textStyle={styles.checkboxLabel}
//         />
//         <Animated.View
//           style={[styles.httpAuthContainer, { height: httpFieldsHeight }]}>
//           {useHttpAuth && (
//             <>
//               <TextInput
//                 style={styles.input}
//                 placeholder="HTTP Username"
//                 value={httpUser}
//                 onChangeText={setHttpUser}
//                 placeholderTextColor="#888"
//               />
//               <TextInput
//                 style={styles.input}
//                 placeholder="HTTP Password"
//                 value={httpPassword}
//                 onChangeText={setHttpPassword}
//                 secureTextEntry
//                 placeholderTextColor="#888"
//               />
//             </>
//           )}
//         </Animated.View>
//         <CheckBox
//           title="Remember Me"
//           checked={rememberMe}
//           onPress={() => setRememberMe(!rememberMe)}
//           containerStyle={styles.checkboxContainer}
//           textStyle={styles.checkboxLabel}
//         />
//         <TouchableOpacity style={styles.button} onPress={handleLogin}>
//           <Text style={styles.buttonText}>Login</Text>
//         </TouchableOpacity>
//       </View>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//     paddingHorizontal: 16,
//     backgroundColor: "#f0f4f7",
//   },
//   branding: {
//     fontSize: 32,
//     fontWeight: "bold",
//     textAlign: "center",
//     marginBottom: 40,
//     color: "#333",
//   },
//   inputContainer: {
//     width: "100%",
//     maxWidth: 400,
//     alignItems: "center",
//   },
//   input: {
//     height: 50,
//     borderColor: "#ddd",
//     borderWidth: 1,
//     borderRadius: 8,
//     marginBottom: 16,
//     paddingHorizontal: 10,
//     backgroundColor: "#fff",
//     fontSize: 16,
//     width: "100%",
//   },
//   checkboxContainer: {
//     backgroundColor: "transparent",
//     borderWidth: 0,
//     marginLeft: 0,
//     marginRight: 0,
//     padding: 0,
//   },
//   checkboxLabel: {
//     color: "#333",
//   },
//   httpAuthContainer: {
//     overflow: "hidden",
//     width: "100%",
//   },
//   button: {
//     backgroundColor: "#007bff",
//     paddingVertical: 15,
//     borderRadius: 8,
//     alignItems: "center",
//     justifyContent: "center",
//     width: "100%",
//     marginTop: 20,
//   },
//   buttonText: {
//     color: "#fff",
//     fontSize: 18,
//     fontWeight: "bold",
//   },
// });

// export default LoginScreen;

import React, { useEffect, useState } from "react";
import {
  View,
  TextInput,
  StyleSheet,
  Text,
  TouchableOpacity,
  Animated,
  Easing,
  ScrollView,
} from "react-native";
import { useRouter } from "expo-router";
import { CheckBox } from "react-native-elements";
import AsyncStorage from "@react-native-async-storage/async-storage";

const LoginScreen = () => {
  const [serverName, setServerName] = useState("");
  const [serverHost, setServerHost] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [useHttpAuth, setUseHttpAuth] = useState(false);
  const [httpUser, setHttpUser] = useState("");
  const [httpPassword, setHttpPassword] = useState("");
  const [httpFieldsHeight] = useState(new Animated.Value(0));
  const router = useRouter();

  useEffect(() => {
    const loadStoredData = async () => {
      try {
        const key = await AsyncStorage.getItem("current_key");
        if (key) {
          const storedCredentials = await AsyncStorage.getItem(key);
          if (storedCredentials) {
            const { serverName, serverHost, username, password, httpAuth } =
              JSON.parse(storedCredentials);
            setServerName(serverName);
            setServerHost(serverHost);
            setUsername(username);
            setPassword(password);
            if (httpAuth) {
              setHttpUser(httpAuth.httpUser);
              setHttpPassword(httpAuth.httpPassword);
              setUseHttpAuth(true);
              Animated.timing(httpFieldsHeight, {
                toValue: 100,
                duration: 300,
                easing: Easing.ease,
                useNativeDriver: false,
              }).start();
            }
          }
        }
      } catch (error) {
        console.error("Error loading stored data", error);
      }
    };

    loadStoredData();
  }, []);

  const handleLogin = async () => {
    const credentials = {
      serverName,
      serverHost,
      username,
      password,
      httpAuth: useHttpAuth ? { httpUser, httpPassword } : null,
    };

    try {
      // Store credentials in AsyncStorage only if "Remember Me" is checked

      const key = `${serverName}_${username}`;
      await AsyncStorage.setItem(key, JSON.stringify(credentials));
      await AsyncStorage.setItem("current_key", key);

      // Navigate to the dashboard
      router.push({
        pathname: "/dashboard",
        params: {
          key: `${serverName}_${username}`,
        },
      });
    } catch (error) {
      console.error("Error saving credentials", error);
    }
  };

  const clearAsyncStorage = async () => {
    try {
      await AsyncStorage.clear();
      console.log("AsyncStorage cleared");
    } catch (error) {
      console.error("Error clearing AsyncStorage", error);
    }
  };

  function toggleHttpAuth() {
    setUseHttpAuth(!useHttpAuth);
    Animated.timing(httpFieldsHeight, {
      toValue: useHttpAuth ? 0 : 100,
      duration: 300,
      easing: Easing.ease,
      useNativeDriver: false,
    }).start();
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.branding}>ZApp</Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Server Name"
          value={serverName}
          onChangeText={setServerName}
          placeholderTextColor="#888"
        />
        <TextInput
          style={styles.input}
          placeholder="Zabbix Url"
          value={serverHost}
          onChangeText={setServerHost}
          placeholderTextColor="#888"
        />
        <TextInput
          style={styles.input}
          placeholder="Zabbix User"
          value={username}
          onChangeText={setUsername}
          placeholderTextColor="#888"
        />
        <TextInput
          style={styles.input}
          placeholder="Zabbix Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          placeholderTextColor="#888"
        />
        <CheckBox
          title="Use HTTP Authentication"
          checked={useHttpAuth}
          onPress={toggleHttpAuth}
          containerStyle={styles.checkboxContainer}
          textStyle={styles.checkboxLabel}
        />
        <Animated.View
          style={[styles.httpAuthContainer, { height: httpFieldsHeight }]}>
          {useHttpAuth && (
            <>
              <TextInput
                style={styles.input}
                placeholder="HTTP Username"
                value={httpUser}
                onChangeText={setHttpUser}
                placeholderTextColor="#888"
              />
              <TextInput
                style={styles.input}
                placeholder="HTTP Password"
                value={httpPassword}
                onChangeText={setHttpPassword}
                secureTextEntry
                placeholderTextColor="#888"
              />
            </>
          )}
        </Animated.View>
        <CheckBox
          title="Remember Me"
          checked={rememberMe}
          onPress={() => setRememberMe(!rememberMe)}
          containerStyle={styles.checkboxContainer}
          textStyle={styles.checkboxLabel}
        />
        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.clearButton}
          onPress={clearAsyncStorage}>
          <Text style={styles.buttonText}>Clear Storage</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 16,
    backgroundColor: "#f0f4f7",
  },
  branding: {
    fontSize: 32,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 40,
    color: "#333",
  },
  inputContainer: {
    width: "100%",
    maxWidth: 400,
    alignItems: "center",
  },
  input: {
    height: 50,
    borderColor: "#ddd",
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 16,
    paddingHorizontal: 10,
    backgroundColor: "#fff",
    fontSize: 16,
    width: "100%",
  },
  checkboxContainer: {
    backgroundColor: "transparent",
    borderWidth: 0,
    marginLeft: 0,
    marginRight: 0,
    padding: 0,
  },
  checkboxLabel: {
    color: "#333",
  },
  httpAuthContainer: {
    overflow: "hidden",
    width: "100%",
  },
  button: {
    backgroundColor: "#007bff",
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    marginTop: 20,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  clearButton: {
    backgroundColor: "#dc3545",
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    marginTop: 20,
  },
});

export default LoginScreen;
