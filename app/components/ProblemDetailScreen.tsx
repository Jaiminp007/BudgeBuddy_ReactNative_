// import React, { useState } from "react";
// import {
//   View,
//   Text,
//   StyleSheet,
//   ScrollView,
//   TouchableOpacity,
//   Dimensions,
//   Alert,
//   ActivityIndicator,
// } from "react-native";
// import { useNavigation } from "@react-navigation/native";
// import { ping, authService, traceroute } from "../services/apiHost";
// import { useRouter, useLocalSearchParams } from "expo-router";

// const ProblemDetailScreen = () => {
//   // const [authToken, setAuthToken] = useState<string | null>(null);
//   const [pingResponse, setPingResponse] = useState<{
//     response: string;
//     value: string;
//   } | null>(null);
//   const [tracerouteResponse, setTracerouteResponse] = useState<{
//     response: string;
//     value: string;
//   } | null>(null);
//   const [loadingPing, setLoadingPing] = useState(false);
//   const [loadingTraceroute, setLoadingTraceroute] = useState(false);
//   const { hostName, hostID, problemName, severity, duration } =
//     useLocalSearchParams();
//   const navigation = useNavigation();
//   console.log("Row Data", hostName, problemName, severity, duration);

//   const handlePing = async () => {
//     setLoadingPing(true);
//     try {
//       const response = await ping(hostID);
//       setPingResponse(response);
//       console.log("Ping action triggered", response);
//       if (response) {
//         Alert.alert("Ping Response", `${response.value}`);
//       }
//     } finally {
//       setLoadingPing(false);
//     }
//   };

//   const handleTraceroute = async () => {
//     setLoadingTraceroute(true);
//     try {
//       const response = await traceroute(hostID);
//       setTracerouteResponse(response);
//       console.log("Traceroute action triggered", response);
//       if (response) {
//         Alert.alert("Traceroute Response", `${response.value}`);
//       }
//     } finally {
//       setLoadingTraceroute(false);
//     }
//   };

//   const handleAcknowledge = () => {
//     // Add logic for acknowledge action
//     console.log("Acknowledge action triggered");
//   };

//   const severityColors: { [key: string]: string } = {
//     Disaster: "#E57373",
//     High: "#FF8A65",
//     Average: "#FFB74D",
//     Warning: "#FFF176",
//     Info: "#90CAF9",
//     "N/A": "#D3D3D3",
//   };

//   const severityKey = Array.isArray(severity) ? severity[0] : severity;

//   return (
//     <ScrollView style={styles.container}>
//       <View style={styles.content}>
//         <Text style={styles.label}>Host Name:</Text>
//         <Text style={styles.value}>{hostName}</Text>

//         <Text style={styles.label}>Problem Name:</Text>
//         <Text style={styles.value}>{problemName}</Text>

//         <Text style={styles.label}>Duration:</Text>
//         <Text style={styles.value}>{duration}</Text>

//         <Text style={styles.label}>Severity:</Text>
//         <View
//           style={[
//             styles.severityBox,
//             { backgroundColor: severityColors[severityKey] },
//           ]}>
//           <Text style={styles.severityText}>{severityKey}</Text>
//         </View>
//         <View style={styles.buttonContainer}>
//           <TouchableOpacity
//             onPress={handlePing}
//             style={styles.button}
//             disabled={loadingPing}>
//             {loadingPing ? (
//               <ActivityIndicator color="#fff" />
//             ) : (
//               <Text style={styles.buttonText}>Ping</Text>
//             )}
//           </TouchableOpacity>
//           <TouchableOpacity
//             onPress={handleTraceroute}
//             style={styles.button}
//             disabled={loadingTraceroute}>
//             {loadingTraceroute ? (
//               <ActivityIndicator color="#fff" />
//             ) : (
//               <Text style={styles.buttonText}>Traceroute</Text>
//             )}
//           </TouchableOpacity>
//           <TouchableOpacity onPress={handleAcknowledge} style={styles.button}>
//             <Text style={styles.buttonText}>Acknowledge</Text>
//           </TouchableOpacity>
//         </View>
//       </View>
//     </ScrollView>
//   );
// };

// const { width } = Dimensions.get("window");

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#f0f4f7",
//   },
//   header: {
//     padding: 16,
//     backgroundColor: "#ddd",
//     borderBottomWidth: 1,
//     borderBottomColor: "#bbb",
//     alignItems: "center",
//   },
//   headerText: {
//     fontSize: 24,
//     fontWeight: "bold",
//     color: "#333",
//   },
//   content: {
//     padding: 16,
//   },
//   label: {
//     fontSize: 18,
//     fontWeight: "bold",
//     color: "#555",
//     marginTop: 10,
//   },
//   value: {
//     fontSize: 16,
//     color: "#333",
//     marginBottom: 10,
//   },
//   severityBox: {
//     padding: 10,
//     borderRadius: 8,
//     marginTop: 5,
//   },
//   severityText: {
//     fontSize: 16,
//     color: "#000000",
//     textAlign: "center",
//   },
//   buttonContainer: {
//     flexDirection: "row",
//     justifyContent: "space-around",
//     marginTop: 20,
//   },
//   button: {
//     backgroundColor: "#007BFF",
//     padding: 10,
//     borderRadius: 8,
//     flexDirection: "row",
//     alignItems: "center",
//     justifyContent: "center",
//   },
//   buttonText: {
//     fontSize: 18,
//     color: "#fff",
//     textAlign: "center",
//   },
// });

// export default ProblemDetailScreen;

// import React, { useEffect, useState } from "react";
// import {
//   View,
//   Text,
//   StyleSheet,
//   ScrollView,
//   TouchableOpacity,
//   Dimensions,
//   Alert,
//   ActivityIndicator,
// } from "react-native";
// import { ping, authService, traceroute } from "../services/apiHost";
// import { useRouter, useLocalSearchParams } from "expo-router";
// import { Ionicons } from "@expo/vector-icons";
// import AsyncStorage from "@react-native-async-storage/async-storage";

// const ProblemDetailScreen = () => {
//   const [pingResponse, setPingResponse] = useState(null);
//   const [tracerouteResponse, setTracerouteResponse] = useState(null);
//   const [loadingPing, setLoadingPing] = useState(false);
//   const [loadingTraceroute, setLoadingTraceroute] = useState(false);
//   const {
//     hostName,
//     hostID,
//     problemName,
//     severity,
//     duration,
//     groupID,
//     groupName,
//   } = useLocalSearchParams();
//   const router = useRouter();

//   useEffect(() => {
//     const initialize = async () => {
//       const authToken = await authService.getToken();
//       if (!authToken) {
//         // Perform login if not authenticated
//         const credentials = await AsyncStorage.getItem("current_key");
//         if (credentials) {
//           const { serverHost, username, password } = JSON.parse(credentials);
//           await authService.login(serverHost, username, password);
//         }
//       }
//     };

//     initialize();
//   }, []);

//   const handlePing = async () => {
//     setLoadingPing(true);
//     try {
//       const response = await ping(hostID);
//       setPingResponse(response);
//       console.log("Ping action triggered", response);
//       if (response) {
//         Alert.alert("Ping Response", `${response.value}`);
//       }
//     } finally {
//       setLoadingPing(false);
//     }
//   };

//   const handleTraceroute = async () => {
//     setLoadingTraceroute(true);
//     try {
//       const response = await traceroute(hostID);
//       setTracerouteResponse(response);
//       console.log("Traceroute action triggered", response);
//       if (response) {
//         Alert.alert("Traceroute Response", `${response.value}`);
//       }
//     } finally {
//       setLoadingTraceroute(false);
//     }
//   };

//   const handleAcknowledge = () => {
//     // Add logic for acknowledge action
//     console.log("Acknowledge action triggered");
//   };

//   const severityColors = {
//     Disaster: "#E57373",
//     High: "#FF8A65",
//     Average: "#FFB74D",
//     Warning: "#FFF176",
//     Info: "#90CAF9",
//     "N/A": "#D3D3D3",
//   };

//   const severityKey = Array.isArray(severity) ? severity[0] : severity;

//   const navigateToGroupProblems = (groupID, groupName) => {
//     router.push({
//       pathname: "/groupProblems",
//       params: {
//         groupID,
//         groupName,
//       },
//     });
//   };

//   return (
//     <ScrollView style={styles.container}>
//       <View>
//         <TouchableOpacity
//           onPress={() => navigateToGroupProblems(groupID, groupName)}
//           style={{ padding: 10 }}>
//           <Ionicons name="arrow-back" size={24} color="black" />
//         </TouchableOpacity>
//       </View>
//       <View style={styles.content}>
//         <Text style={styles.label}>Host Name:</Text>
//         <Text style={styles.value}>{hostName}</Text>

//         <Text style={styles.label}>Problem Name:</Text>
//         <Text style={styles.value}>{problemName}</Text>

//         <Text style={styles.label}>Duration:</Text>
//         <Text style={styles.value}>{duration}</Text>

//         <Text style={styles.label}>Severity:</Text>
//         <View
//           style={[
//             styles.severityBox,
//             { backgroundColor: severityColors[severityKey] },
//           ]}>
//           <Text style={styles.severityText}>{severityKey}</Text>
//         </View>
//         <View style={styles.buttonContainer}>
//           <TouchableOpacity
//             onPress={handlePing}
//             style={styles.button}
//             disabled={loadingPing}>
//             {loadingPing ? (
//               <ActivityIndicator color="#fff" />
//             ) : (
//               <Text style={styles.buttonText}>Ping</Text>
//             )}
//           </TouchableOpacity>
//           <TouchableOpacity
//             onPress={handleTraceroute}
//             style={styles.button}
//             disabled={loadingTraceroute}>
//             {loadingTraceroute ? (
//               <ActivityIndicator color="#fff" />
//             ) : (
//               <Text style={styles.buttonText}>Traceroute</Text>
//             )}
//           </TouchableOpacity>
//           <TouchableOpacity onPress={handleAcknowledge} style={styles.button}>
//             <Text style={styles.buttonText}>Acknowledge</Text>
//           </TouchableOpacity>
//         </View>
//       </View>
//     </ScrollView>
//   );
// };

// const { width } = Dimensions.get("window");

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#f0f4f7",
//   },
//   header: {
//     flexDirection: "row",
//     alignItems: "center",
//     padding: 16,
//     backgroundColor: "#ddd",
//     borderBottomWidth: 1,
//     borderBottomColor: "#bbb",
//   },
//   backButton: {
//     marginRight: 10,
//   },
//   headerText: {
//     fontSize: 24,
//     fontWeight: "bold",
//     color: "#333",
//   },
//   content: {
//     padding: 16,
//   },
//   label: {
//     fontSize: 18,
//     fontWeight: "bold",
//     color: "#555",
//     marginTop: 10,
//   },
//   value: {
//     fontSize: 16,
//     color: "#333",
//     marginBottom: 10,
//   },
//   severityBox: {
//     padding: 10,
//     borderRadius: 8,
//     marginTop: 5,
//   },
//   severityText: {
//     fontSize: 16,
//     color: "#000",
//     textAlign: "center",
//   },
//   buttonContainer: {
//     flexDirection: "row",
//     justifyContent: "space-around",
//     marginTop: 20,
//   },
//   button: {
//     backgroundColor: "#007BFF",
//     padding: 10,
//     borderRadius: 8,
//     flexDirection: "row",
//     alignItems: "center",
//     justifyContent: "center",
//   },
//   buttonText: {
//     fontSize: 18,
//     color: "#fff",
//     textAlign: "center",
//   },
// });

// export default ProblemDetailScreen;

import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  Alert,
  ActivityIndicator,
  SafeAreaView,
} from "react-native";
import { ping, authService, traceroute } from "../services/apiHost";
import { useRouter, useLocalSearchParams } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";

const ProblemDetailScreen = () => {
  const [pingResponse, setPingResponse] = useState(null);
  const [tracerouteResponse, setTracerouteResponse] = useState(null);
  const [loadingPing, setLoadingPing] = useState(false);
  const [loadingTraceroute, setLoadingTraceroute] = useState(false);
  const {
    hostName,
    hostID,
    problemName,
    severity,
    duration,
    groupID,
    groupName,
    backPage,
  } = useLocalSearchParams();
  const router = useRouter();

  useEffect(() => {
    const initialize = async () => {
      const authToken = await authService.getToken();
      if (!authToken) {
        const credentials = await AsyncStorage.getItem("current_key");
        if (credentials) {
          const { serverHost, username, password } = JSON.parse(credentials);
          await authService.login(serverHost, username, password);
        }
      }
    };

    initialize();
  }, []);

  const handlePing = async () => {
    setLoadingPing(true);
    try {
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
    console.log("Acknowledge action triggered");
  };

  const navigateToGroupProblems = (groupID, groupName, backPage) => {
    if (backPage == "groupProblems") {
      router.push({
        pathname: "/groupProblems",
        params: {
          groupID,
          groupName,
        },
      });
    }
    if (backPage == "problem") {
      router.push({
        pathname: "/problem",
      });
    }
  };

  const severityColors = {
    Disaster: "#E57373",
    High: "#FF8A65",
    Average: "#FFB74D",
    Warning: "#FFF176",
    Info: "#90CAF9",
    "N/A": "#D3D3D3",
  };

  const severityKey = Array.isArray(severity) ? severity[0] : severity;

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity
            onPress={() =>
              navigateToGroupProblems(groupID, groupName, backPage)
            }
            style={styles.backButton}>
            <Ionicons name="arrow-back" size={24} color="black" />
          </TouchableOpacity>
          <Text style={styles.headerText}>Back</Text>
        </View>
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
    </SafeAreaView>
  );
};

const { width } = Dimensions.get("window");

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#f0f4f7",
  },
  container: {
    flex: 1,
    backgroundColor: "#f0f4f7",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  backButton: {
    padding: 10,
  },
  headerText: {
    fontSize: 18,
    fontWeight: "bold",
    fontStyle: "italic",
    color: "#333",
    marginLeft: 10,
  },
  content: {
    padding: 16,
  },
  label: {
    fontSize: 16,
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
    color: "#000",
    textAlign: "center",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 20,
  },
  button: {
    backgroundColor: "#007BFF",
    //   padding: 15,
    paddingHorizontal: 5,
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
    marginHorizontal: 5,
  },
  buttonText: {
    fontSize: 14,
    color: "#fff",
    fontWeight: "bold",
  },
});

export default ProblemDetailScreen;
