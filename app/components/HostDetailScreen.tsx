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
// import { ping, traceroute, fetchHostStatus } from "../services/apiHost";
// import { useRouter, useLocalSearchParams } from "expo-router";

// const HostDetailScreen = () => {
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
//   const {         hostID,hostName,hostIP,hostDNS, } =
//     useLocalSearchParams();
//   const navigation = useNavigation();
//   // console.log("Row Data", hostName, problemName, severity, duration);

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

//   const routeProblem = () => {};

//   const severityColors: { [key: string]: string } = {
//     Disaster: "#E57373",
//     High: "#FF8A65",
//     Average: "#FFB74D",
//     Warning: "#FFF176",
//     Info: "#90CAF9",
//     "N/A": "#D3D3D3",
//   };

//   // const severityKey = Array.isArray(severity) ? severity[0] : severity;

//   return (
//     <ScrollView style={styles.container}>
//       <View style={styles.content}>
//         <Text style={styles.label}>Host Name:</Text>
//         <Text style={styles.value}>{hostName}</Text>

//         <Text style={styles.label}>Host IP:</Text>
//         <Text style={styles.value}>{hostIP}</Text>

//         <Text style={styles.label}>Host DNS:</Text>
//         <Text style={styles.value}>{hostDNS}</Text>

//         <Text style={styles.label}>Status:</Text>
//         <Text style={styles.value}>{hostIP}</Text>

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
//           <TouchableOpacity onPress={routeProblem} style={styles.button}>
//             <Text style={styles.buttonText}>Problem</Text>
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

// export default HostDetailScreen;

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
} from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { ping, traceroute, authService } from "../services/apiHost";

const HostDetailScreen = () => {
  const [pingResponse, setPingResponse] = useState(null);
  const [tracerouteResponse, setTracerouteResponse] = useState(null);
  const [loadingPing, setLoadingPing] = useState(false);
  const [loadingTraceroute, setLoadingTraceroute] = useState(false);
  const { hostID, hostName, hostIP, hostDNS } = useLocalSearchParams();
  const router = useRouter();

  useEffect(() => {
    const initialize = async () => {
      const authToken = await authService.getToken();
      // if (!authToken) {
      //   // Perform login if not authenticated
      //   // const credentials = await authService.getCredentials();
      //   if (credentials) {
      //     const { serverHost, username, password } = credentials;
      //     await authService.login(serverHost, username, password);
      //   }
      // }
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

  const routeProblem = () => {
    // Implement navigation to the problem screen if needed
    console.log("Navigate to problem screen");
  };

  const navigateToHost = () => {
    router.push({
      pathname: "/host",
    });
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={navigateToHost} style={styles.backButton}>
          <Ionicons name="return-down-back-outline" size={32} color="black" />
        </TouchableOpacity>
      </View>
      <View style={styles.content}>
        <Text style={styles.label}>Host Name:</Text>
        <Text style={styles.value}>{hostName}</Text>

        <Text style={styles.label}>Host IP:</Text>
        <Text style={styles.value}>{hostIP}</Text>

        <Text style={styles.label}>Host DNS:</Text>
        <Text style={styles.value}>{hostDNS}</Text>

        <Text style={styles.label}>Status:</Text>
        <Text style={styles.value}>{hostIP}</Text>

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
          <TouchableOpacity onPress={routeProblem} style={styles.button}>
            <Text style={styles.buttonText}>Problem</Text>
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
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    // // backgroundColor: "#fff",
    // // borderBottomWidth: 1,
    // // // borderBottomColor: "#ddd",
    // elevation: 2,
    // // shadowColor: "#000",
    // shadowOffset: { width: 0, height: 2 },
    // shadowOpacity: 0.1,
    // shadowRadius: 2,
  },
  backButton: {
    padding: 10,
  },
  headerText: {
    fontSize: 18,
    fontWeight: "bold",
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
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 20,
  },
  button: {
    backgroundColor: "#007BFF",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
    marginHorizontal: 5,
  },
  buttonText: {
    fontSize: 16,
    color: "#fff",
    fontWeight: "bold",
  },
});

export default HostDetailScreen;
