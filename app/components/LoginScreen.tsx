import React, { useState } from "react";
import {
  View,
  TextInput,
  StyleSheet,
  Text,
  TouchableOpacity,
  Animated,
  Easing,
} from "react-native";
import { useRouter } from "expo-router";
import { CheckBox } from "react-native-elements";
import { useNavigation } from "@react-navigation/native";
// import { login } from "../services/apiHost";
// const navigation = useNavigation();

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
  // const authToken = login();
  const router = useRouter();

  const handleLogin = () => {
    // const authToken = login();
    // Implement your login logic here
    // Navigate to the Dashboard screen
    router.push({
      pathname: "/dashboard",
      params: {
        serverName,
        serverHost,
        username,
        password,
        httpUser,
        httpPassword,
        // authToken,
        rememberMe: rememberMe.toString(),
        useHttpAuth: useHttpAuth.toString(),
      },
    });
  };

  
  function toggleHttpAuth() {
    setUseHttpAuth(!useHttpAuth);
    Animated.timing(httpFieldsHeight, {
      toValue: useHttpAuth ? 0 : 100, // Adjust based on the actual height needed
      duration: 300,
      easing: Easing.ease,
      useNativeDriver: false,
    }).start();
  }

  return (
    <View style={styles.container}>
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
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
});

export default LoginScreen;
