import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  Alert,
  ActivityIndicator,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { ping, authService, traceroute } from "../services/apiHost";
import { useRouter, useLocalSearchParams } from "expo-router";

const ProblemDetailScreen = () => {
  const [authToken, setAuthToken] = useState<string | null>(null);
  const [pingResponse, setPingResponse] = useState<{
    response: string;
    value: string;
  } | null>(null);
  const [tracerouteResponse, setTracerouteResponse] = useState<{
    response: string;
    value: string;
  } | null>(null);
  const [loadingPing, setLoadingPing] = useState(false);
  const [loadingTraceroute, setLoadingTraceroute] = useState(false);
  const { hostName, hostID, problemName, severity, duration } =
    useLocalSearchParams();
  const navigation = useNavigation();
  console.log("Row Data", hostName, problemName, severity, duration);

  const handlePing = async () => {
    setLoadingPing(true);
    try {
      const token = await authService.login();
      setAuthToken(token);
      const response = await ping(hostID);
      setPingResponse(response);
      console.log("Ping action triggered", response);
      if (response) {
        Alert.alert("Ping Response", `${response.value}`);
      }
    } finally {
      setLoadingPing(false);
    }
  };

  const handleTraceroute = async () => {
    setLoadingTraceroute(true);
    try {
      const token = await authService.login();
      setAuthToken(token);
      const response = await traceroute(hostID);
      setTracerouteResponse(response);
      console.log("Traceroute action triggered", response);
      if (response) {
        Alert.alert("Traceroute Response", `${response.value}`);
      }
    } finally {
      setLoadingTraceroute(false);
    }
  };

  const handleAcknowledge = () => {
    // Add logic for acknowledge action
    console.log("Acknowledge action triggered");
  };

  const severityColors: { [key: string]: string } = {
    Disaster: "#E57373",
    High: "#FF8A65",
    Average: "#FFB74D",
    Warning: "#FFF176",
    Info: "#90CAF9",
    "N/A": "#D3D3D3",
  };

  const severityKey = Array.isArray(severity) ? severity[0] : severity;

  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.label}>Host Name:</Text>
        <Text style={styles.value}>{hostName}</Text>

        <Text style={styles.label}>Problem Name:</Text>
        <Text style={styles.value}>{problemName}</Text>

        <Text style={styles.label}>Duration:</Text>
        <Text style={styles.value}>{duration}</Text>

        <Text style={styles.label}>Severity:</Text>
        <View
          style={[
            styles.severityBox,
            { backgroundColor: severityColors[severityKey] },
          ]}>
          <Text style={styles.severityText}>{severityKey}</Text>
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            onPress={handlePing}
            style={styles.button}
            disabled={loadingPing}>
            {loadingPing ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text style={styles.buttonText}>Ping</Text>
            )}
          </TouchableOpacity>
          <TouchableOpacity
            onPress={handleTraceroute}
            style={styles.button}
            disabled={loadingTraceroute}>
            {loadingTraceroute ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text style={styles.buttonText}>Traceroute</Text>
            )}
          </TouchableOpacity>
          <TouchableOpacity onPress={handleAcknowledge} style={styles.button}>
            <Text style={styles.buttonText}>Acknowledge</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

const { width } = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f0f4f7",
  },
  header: {
    padding: 16,
    backgroundColor: "#ddd",
    borderBottomWidth: 1,
    borderBottomColor: "#bbb",
    alignItems: "center",
  },
  headerText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
  },
  content: {
    padding: 16,
  },
  label: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#555",
    marginTop: 10,
  },
  value: {
    fontSize: 16,
    color: "#333",
    marginBottom: 10,
  },
  severityBox: {
    padding: 10,
    borderRadius: 8,
    marginTop: 5,
  },
  severityText: {
    fontSize: 16,
    color: "#000000",
    textAlign: "center",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 20,
  },
  button: {
    backgroundColor: "#007BFF",
    padding: 10,
    borderRadius: 8,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    fontSize: 18,
    color: "#fff",
    textAlign: "center",
  },
});

export default ProblemDetailScreen;
