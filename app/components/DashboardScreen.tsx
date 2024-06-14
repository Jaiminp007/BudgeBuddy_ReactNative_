// import React, { useEffect, useState } from "react";
// import {
//   View,
//   Text,
//   StyleSheet,
//   Dimensions,
//   ScrollView,
//   TextInput,
//   TouchableOpacity,
//   ActivityIndicator,
//   SafeAreaView,
//   KeyboardAvoidingView,
//   Platform,
// } from "react-native";
// import { fetchHostGroupProblems, authService } from "../services/apiHost";
// import { Ionicons } from "@expo/vector-icons";
// import { useRouter, useLocalSearchParams } from "expo-router";
// import AsyncStorage from "@react-native-async-storage/async-storage";

// const DashboardScreen = () => {
//   const [loading, setLoading] = useState(true);
//   const [authToken, setAuthToken] = useState<string | null>(null);
//   const [credentials, setCredentials] = useState(null);
//   const { key } = useLocalSearchParams();
//   const router = useRouter();
//   const [tableData, setTableData] = useState([]);
//   const [filteredData, setFilteredData] = useState([]);
//   const [severityCount, setSeverityCount] = useState({
//     Disaster: 0,
//     High: 0,
//     Average: 0,
//     Warning: 0,
//     Info: 0,
//     "N/A": 0,
//   });
//   const [searchQuery, setSearchQuery] = useState("");

//   useEffect(() => {
//     const loadCredentials = async () => {
//       try {
//         const keyString = Array.isArray(key) ? key[0] : key;
//         if (key) {
//           const storedCredentials = await AsyncStorage.getItem(keyString);
//           if (storedCredentials) {
//             setCredentials(JSON.parse(storedCredentials));
//           }
//         }
//       } catch (error) {
//         console.error("Error loading stored credentials", error);
//       }
//     };

//     loadCredentials();
//   }, [key]);

//   const navigateToGroupProblems = (gid, gname) => {
//     router.push({
//       pathname: "/groupProblems",
//       params: {
//         groupId: gid,
//         groupName: gname,
//         authToken: authToken,
//       },
//     });
//   };

//   const mapSeverity = (severity) => {
//     switch (severity) {
//       case "5":
//         return "Disaster";
//       case "4":
//         return "High";
//       case "3":
//         return "Average";
//       case "2":
//         return "Warning";
//       case "1":
//         return "Info";
//       default:
//         return "N/A";
//     }
//   };

//   const fetchData = async (token) => {
//     const { allProblems, groupProblemCounts } = await fetchHostGroupProblems(
//       token
//     );
//     const transformedData = Object.entries(groupProblemCounts).map(
//       ([groupID, { groupName, problemCount, totalHosts }]) => ({
//         gid: groupID,
//         gname: groupName,
//         pcount: problemCount,
//         totalHosts: totalHosts,
//       })
//     );
//     setTableData(transformedData);
//     setFilteredData(transformedData);

//     const counts = {
//       Disaster: 0,
//       High: 0,
//       Average: 0,
//       Warning: 0,
//       Info: 0,
//       "N/A": 0,
//     };

//     Object.values(allProblems).forEach((problem) => {
//       counts[mapSeverity(problem.severity)]++;
//     });

//     setSeverityCount(counts);
//   };

//   useEffect(() => {
//     const initialize = async () => {
//       if (credentials) {
//         const { serverHost, username, password, httpAuth } = credentials;
//         const token = await authService.login(serverHost, username, password);
//         setAuthToken(token);
//         await fetchData(token);
//         setLoading(false);
//       }
//     };

//     initialize();

//     const intervalId = setInterval(() => {
//       if (authToken) {
//         fetchData(authToken);
//       }
//     }, 30000); // Fetch data every 30 seconds

//     return () => clearInterval(intervalId);
//   }, [authToken, credentials]);

//   const handleSearch = (text) => {
//     setSearchQuery(text);
//     const filteredData = tableData.filter((row) =>
//       row.gname.toLowerCase().includes(text.toLowerCase())
//     );
//     setFilteredData(filteredData);
//   };

//   const tableHead = ["Host Group", "Problems", "Total Hosts"];

//   const severityColors = {
//     Disaster: "#E57373",
//     High: "#FF8A65",
//     Average: "#FFB74D",
//     Warning: "#FFF176",
//     Info: "#90CAF9",
//     "N/A": "#D3D3D3",
//   };

//   const ProblemSc = () => {
//     router.push({
//       pathname: "/problem",
//     });
//   };

//   return (
//     <SafeAreaView style={{ flex: 1, backgroundColor: "#f8f9fa" }}>
//       <KeyboardAvoidingView
//         style={{ flex: 1 }}
//         behavior={Platform.OS === "ios" ? "padding" : "height"}>
//         <ScrollView contentContainerStyle={styles.container}>
//           <View style={styles.header}>
//             <Text style={styles.headerText}>
//               Server Name: {credentials?.serverName}
//             </Text>
//             {/* <Text style={styles.headerText}>
//               Server URL: {credentials?.serverHost}
//             </Text> */}
//             <TouchableOpacity
//               onPress={() => fetchData(authToken)}
//               style={styles.refreshButton}>
//               <Ionicons name="refresh" size={24} color="black" />
//             </TouchableOpacity>
//           </View>
//           <View style={styles.searchContainer}>
//             <TextInput
//               style={styles.searchInput}
//               placeholder="Search Host Name..."
//               value={searchQuery}
//               onChangeText={handleSearch}
//             />
//           </View>
//           <View style={styles.content}>
//             {loading ? (
//               <ActivityIndicator size="large" color="#007BFF" />
//             ) : (
//               <>
//                 <View style={styles.hugeRectangle}>
//                   {Object.entries(severityCount).map(([severity, count]) => (
//                     <View
//                       key={severity}
//                       style={[
//                         styles.box,
//                         { backgroundColor: severityColors[severity] },
//                       ]}>
//                       <Text style={styles.boxNumber}>{count}</Text>
//                       <Text style={styles.boxText}>{severity}</Text>
//                     </View>
//                   ))}
//                 </View>
//                 <View style={styles.tableContainer}>
//                   <View style={styles.tableRow}>
//                     <Text style={[styles.tableHeader, styles.tableHeaderLarge]}>
//                       Host Group
//                     </Text>
//                     <Text style={[styles.tableHeader, styles.tableHeaderSmall]}>
//                       Problems
//                     </Text>
//                     <Text style={[styles.tableHeader, styles.tableHeaderSmall]}>
//                       Total Hosts
//                     </Text>
//                   </View>
//                   {filteredData
//                     .filter((rowData) => rowData.totalHosts > 0) // Filter out rows where totalHosts is 0
//                     .map((rowData, rowIndex) => (
//                       <TouchableOpacity
//                         key={rowIndex}
//                         onPress={() =>
//                           navigateToGroupProblems(rowData.gid, rowData.gname)
//                         }>
//                         <View key={rowIndex} style={styles.tableRow}>
//                           <Text
//                             style={[styles.tableCell, styles.tableCellLarge]}>
//                             {rowData.gname}
//                           </Text>
//                           <Text
//                             style={[styles.tableCell, styles.tableCellSmall]}>
//                             {rowData.pcount}
//                           </Text>
//                           <Text
//                             style={[styles.tableCell, styles.tableCellSmall]}>
//                             {rowData.totalHosts}
//                           </Text>
//                         </View>
//                       </TouchableOpacity>
//                     ))}
//                 </View>
//               </>
//             )}
//           </View>
//         </ScrollView>
//       </KeyboardAvoidingView>
//     </SafeAreaView>
//   );
// };

// const { width } = Dimensions.get("window");
// const boxFontSize = width / 35;
// const numberFontSize = width / 25;

// const styles = StyleSheet.create({
//   container: {
//     flexGrow: 1,
//     paddingVertical: 16,
//     paddingHorizontal: 8, // Reduced left and right padding
//   },
//   header: {
//     flexDirection: "row",
//     alignItems: "center",
//     padding: 10,
//     backgroundColor: "#fff",
//     borderBottomWidth: 1,
//     borderBottomColor: "#ddd",
//     elevation: 2,
//     shadowColor: "#000",
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.1,
//     shadowRadius: 2,
//   },
//   headerText: {
//     fontSize: 16,
//     color: "#333",
//     marginLeft: 10,
//     fontWeight: "bold",
//   },
//   refreshButton: {
//     marginLeft: "auto",
//   },
//   searchContainer: {
//     paddingHorizontal: 8, // Reduced left and right padding
//     paddingVertical: 8,
//     marginTop: 10,
//     backgroundColor: "#fff",
//     borderRadius: 8,
//     shadowColor: "#000",
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.1,
//     shadowRadius: 2,
//     elevation: 3,
//   },
//   searchInput: {
//     height: 40,
//     borderColor: "#ddd",
//     borderWidth: 1,
//     borderRadius: 8,
//     paddingHorizontal: 10,
//     backgroundColor: "#fff",
//   },
//   content: {
//     flex: 1,
//     marginTop: 10,
//   },
//   hugeRectangle: {
//     marginTop: 15,
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "center",
//     marginBottom: 15,
//   },
//   box: {
//     flex: 1,
//     height: 80,
//     justifyContent: "center",
//     alignItems: "center",
//     borderRadius: 8,
//     marginHorizontal: 3,
//     padding: 2,
//   },
//   boxText: {
//     fontSize: boxFontSize,
//     fontWeight: "bold",
//     color: "#000",
//     textAlign: "center",
//   },
//   boxNumber: {
//     fontSize: numberFontSize,
//     fontWeight: "bold",
//     color: "#000",
//     textAlign: "center",
//   },
//   tableContainer: {
//     marginTop: 0,
//     backgroundColor: "#fff",
//     borderRadius: 8,
//     padding: 10,
//     shadowColor: "#000",
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.1,
//     shadowRadius: 2,
//     elevation: 3,
//   },
//   tableRow: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "center",
//     paddingVertical: 10,
//     borderBottomWidth: 1,
//     borderColor: "#ddd",
//   },
//   tableHeader: {
//     flex: 1,
//     fontWeight: "bold",
//     textAlign: "center",
//     padding: 5,
//     fontSize: 16,
//     color: "#333",
//   },
//   tableHeaderLarge: {
//     flex: 2.5, // More space for Host Group
//     textAlign: "left", // Left-align header text
//   },
//   tableHeaderSmall: {
//     flex: 1.5, // Less space for Problems and Total Hosts
//   },
//   tableCell: {
//     flex: 1,
//     textAlign: "center",
//     paddingVertical: 5,
//     paddingHorizontal: 2,
//     fontSize: 15,
//     color: "#333",
//     flexWrap: "wrap", // Ensure text wraps within the cell
//   },
//   tableCellLarge: {
//     flex: 2.5, // More space for Host Group
//     textAlign: "left",
//   },
//   tableCellSmall: {
//     flex: 1.5, // Less space for Problems and Total Hosts
//   },
// });

// export default DashboardScreen;

import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  ScrollView,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { fetchHostGroupProblems, authService } from "../services/apiHost";
import { Ionicons } from "@expo/vector-icons";
import { useRouter, useLocalSearchParams } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";

const DashboardScreen = () => {
  const [loading, setLoading] = useState(true);
  const [credentials, setCredentials] = useState(null);
  const { key } = useLocalSearchParams();
  const router = useRouter();
  const [tableData, setTableData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [severityCount, setSeverityCount] = useState({
    Disaster: 0,
    High: 0,
    Average: 0,
    Warning: 0,
    Info: 0,
    "N/A": 0,
  });
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const loadCredentials = async () => {
      try {
        const keyString = Array.isArray(key) ? key[0] : key;
        if (key) {
          const storedCredentials = await AsyncStorage.getItem(keyString);
          if (storedCredentials) {
            setCredentials(JSON.parse(storedCredentials));
          }
        }
      } catch (error) {
        console.error("Error loading stored credentials", error);
      }
    };

    loadCredentials();
  }, [key]);

  const navigateToGroupProblems = (gid, gname) => {
    router.push({
      pathname: "/groupProblems",
      params: {
        groupId: gid,
        groupName: gname,
      },
    });
  };

  const mapSeverity = (severity) => {
    switch (severity) {
      case "5":
        return "Disaster";
      case "4":
        return "High";
      case "3":
        return "Average";
      case "2":
        return "Warning";
      case "1":
        return "Info";
      default:
        return "N/A";
    }
  };

  const fetchData = async () => {
    const { allProblems, groupProblemCounts } = await fetchHostGroupProblems();
    const transformedData = Object.entries(groupProblemCounts).map(
      ([groupID, { groupName, problemCount, totalHosts }]) => ({
        gid: groupID,
        gname: groupName,
        pcount: problemCount,
        totalHosts: totalHosts,
      })
    );
    setTableData(transformedData);
    setFilteredData(transformedData);

    const counts = {
      Disaster: 0,
      High: 0,
      Average: 0,
      Warning: 0,
      Info: 0,
      "N/A": 0,
    };

    Object.values(allProblems).forEach((problem) => {
      counts[mapSeverity(problem.severity)]++;
    });

    setSeverityCount(counts);
  };

  useEffect(() => {
    const initialize = async () => {
      if (credentials) {
        const { serverHost, username, password, httpAuth } = credentials;
        if (!authService.getToken()) {
          await authService.login(serverHost, username, password);
        }
        await fetchData();
        setLoading(false);
      }
    };

    initialize();

    const intervalId = setInterval(() => {
      fetchData();
    }, 30000); // Fetch data every 30 seconds

    return () => clearInterval(intervalId);
  }, [credentials]);

  const handleSearch = (text) => {
    setSearchQuery(text);
    const filteredData = tableData.filter((row) =>
      row.gname.toLowerCase().includes(text.toLowerCase())
    );
    setFilteredData(filteredData);
  };

  const tableHead = ["Host Group", "Problems", "Total Hosts"];

  const severityColors = {
    Disaster: "#E57373",
    High: "#FF8A65",
    Average: "#FFB74D",
    Warning: "#FFF176",
    Info: "#90CAF9",
    "N/A": "#D3D3D3",
  };

  const ProblemSc = () => {
    router.push({
      pathname: "/problem",
    });
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#f8f9fa" }}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}>
        <ScrollView contentContainerStyle={styles.container}>
          <View style={styles.header}>
            <Text style={styles.headerText}>
              Server Name: {credentials?.serverName}
            </Text>
            {/* <Text style={styles.headerText}>
              Server URL: {credentials?.serverHost}
            </Text> */}
            <TouchableOpacity onPress={fetchData} style={styles.refreshButton}>
              <Ionicons name="refresh" size={24} color="black" />
            </TouchableOpacity>
          </View>
          <View style={styles.searchContainer}>
            <TextInput
              style={styles.searchInput}
              placeholder="Search Host Name..."
              value={searchQuery}
              onChangeText={handleSearch}
            />
          </View>
          <View style={styles.content}>
            {loading ? (
              <ActivityIndicator size="large" color="#007BFF" />
            ) : (
              <>
                <View style={styles.hugeRectangle}>
                  {Object.entries(severityCount).map(([severity, count]) => (
                    <View
                      key={severity}
                      style={[
                        styles.box,
                        { backgroundColor: severityColors[severity] },
                      ]}>
                      <Text style={styles.boxNumber}>{count}</Text>
                      <Text style={styles.boxText}>{severity}</Text>
                    </View>
                  ))}
                </View>
                <View style={styles.tableContainer}>
                  <View style={styles.tableRow}>
                    <Text style={[styles.tableHeader, styles.tableHeaderLarge]}>
                      Host Group
                    </Text>
                    <Text style={[styles.tableHeader, styles.tableHeaderSmall]}>
                      Problems
                    </Text>
                    <Text style={[styles.tableHeader, styles.tableHeaderSmall]}>
                      Total Hosts
                    </Text>
                  </View>
                  {filteredData
                    .filter((rowData) => rowData.totalHosts > 0) // Filter out rows where totalHosts is 0
                    .map((rowData, rowIndex) => (
                      <TouchableOpacity
                        key={rowIndex}
                        onPress={() =>
                          navigateToGroupProblems(rowData.gid, rowData.gname)
                        }>
                        <View key={rowIndex} style={styles.tableRow}>
                          <Text
                            style={[styles.tableCell, styles.tableCellLarge]}>
                            {rowData.gname}
                          </Text>
                          <Text
                            style={[styles.tableCell, styles.tableCellSmall]}>
                            {rowData.pcount}
                          </Text>
                          <Text
                            style={[styles.tableCell, styles.tableCellSmall]}>
                            {rowData.totalHosts}
                          </Text>
                        </View>
                      </TouchableOpacity>
                    ))}
                </View>
              </>
            )}
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const { width } = Dimensions.get("window");
const boxFontSize = width / 35;
const numberFontSize = width / 25;

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    paddingVertical: 16,
    paddingHorizontal: 8, // Reduced left and right padding
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
  headerText: {
    fontSize: 16,
    color: "#333",
    marginLeft: 10,
    fontWeight: "bold",
  },
  refreshButton: {
    marginLeft: "auto",
  },
  searchContainer: {
    paddingHorizontal: 8, // Reduced left and right padding
    paddingVertical: 8,
    marginTop: 10,
    backgroundColor: "#fff",
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 3,
  },
  searchInput: {
    height: 40,
    borderColor: "#ddd",
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    backgroundColor: "#fff",
  },
  content: {
    flex: 1,
    marginTop: 10,
  },
  hugeRectangle: {
    marginTop: 15,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 15,
  },
  box: {
    flex: 1,
    height: 80,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
    marginHorizontal: 3,
    padding: 2,
  },
  boxText: {
    fontSize: boxFontSize,
    fontWeight: "bold",
    color: "#000",
    textAlign: "center",
  },
  boxNumber: {
    fontSize: numberFontSize,
    fontWeight: "bold",
    color: "#000",
    textAlign: "center",
  },
  tableContainer: {
    marginTop: 0,
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 3,
  },
  tableRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderColor: "#ddd",
  },
  tableHeader: {
    flex: 1,
    fontWeight: "bold",
    textAlign: "center",
    padding: 5,
    fontSize: 16,
    color: "#333",
  },
  tableHeaderLarge: {
    flex: 2.5, // More space for Host Group
    textAlign: "left", // Left-align header text
  },
  tableHeaderSmall: {
    flex: 1.5, // Less space for Problems and Total Hosts
  },
  tableCell: {
    flex: 1,
    textAlign: "center",
    paddingVertical: 5,
    paddingHorizontal: 2,
    fontSize: 15,
    color: "#333",
    flexWrap: "wrap", // Ensure text wraps within the cell
  },
  tableCellLarge: {
    flex: 2.5, // More space for Host Group
    textAlign: "left",
  },
  tableCellSmall: {
    flex: 1.5, // Less space for Problems and Total Hosts
  },
});

export default DashboardScreen;

////////////////////////////////////////////////////////////////////////////////

// import React, { useEffect, useState } from "react";
// import {
//   View,
//   Text,
//   StyleSheet,
//   Dimensions,
//   ScrollView,
//   TextInput,
//   TouchableOpacity,
//   ActivityIndicator,
//   SafeAreaView,
//   KeyboardAvoidingView,
//   Platform,
// } from "react-native";
// import { fetchHostGroupProblems, authService } from "../services/apiHost";
// import { Ionicons } from "@expo/vector-icons";
// import { useRouter, useLocalSearchParams } from "expo-router";
// import AsyncStorage from "@react-native-async-storage/async-storage";

// const DashboardScreen = () => {
//   const [loading, setLoading] = useState(true);
//   const [authToken, setAuthToken] = useState<string | null>(null);
//   const [credentials, setCredentials] = useState(null);
//   const { key } = useLocalSearchParams();
//   const router = useRouter();
//   const [tableData, setTableData] = useState([]);
//   const [filteredData, setFilteredData] = useState([]);
//   const [severityCount, setSeverityCount] = useState({
//     Disaster: 0,
//     High: 0,
//     Average: 0,
//     Warning: 0,
//     Info: 0,
//     "N/A": 0,
//   });
//   const [searchQuery, setSearchQuery] = useState("");
//   const [selectedSeverity, setSelectedSeverity] = useState(null);

//   useEffect(() => {
//     const loadCredentials = async () => {
//       try {
//         const keyString = Array.isArray(key) ? key[0] : key;
//         if (key) {
//           const storedCredentials = await AsyncStorage.getItem(keyString);
//           if (storedCredentials) {
//             setCredentials(JSON.parse(storedCredentials));
//           }
//         }
//       } catch (error) {
//         console.error("Error loading stored credentials", error);
//       }
//     };

//     loadCredentials();
//   }, [key]);

//   const navigateToGroupProblems = (gid, gname) => {
//     router.push({
//       pathname: "/groupProblems",
//       params: {
//         groupId: gid,
//         groupName: gname,
//       },
//     });
//   };

//   const mapSeverity = (severity) => {
//     switch (severity) {
//       case "5":
//         return "Disaster";
//       case "4":
//         return "High";
//       case "3":
//         return "Average";
//       case "2":
//         return "Warning";
//       case "1":
//         return "Info";
//       default:
//         return "N/A";
//     }
//   };

//   const fetchData = async (token) => {
//     const { allProblems, groupProblemCounts } = await fetchHostGroupProblems(
//       token
//     );
//     const transformedData = Object.entries(groupProblemCounts).map(
//       ([groupID, { groupName, problemCount, totalHosts }]) => ({
//         gid: groupID,
//         gname: groupName,
//         pcount: problemCount,
//         totalHosts: totalHosts,
//       })
//     );
//     setTableData(transformedData);
//     setFilteredData(transformedData);

//     const counts = {
//       Disaster: 0,
//       High: 0,
//       Average: 0,
//       Warning: 0,
//       Info: 0,
//       "N/A": 0,
//     };

//     Object.values(allProblems).forEach((problem) => {
//       counts[mapSeverity(problem.severity)]++;
//     });

//     setSeverityCount(counts);
//   };

//   useEffect(() => {
//     const initialize = async () => {
//       if (credentials) {
//         const { serverHost, username, password, httpAuth } = credentials;
//         const token = await authService.login(serverHost, username, password);
//         setAuthToken(token);
//         await fetchData(token);
//         setLoading(false);
//       }
//     };

//     initialize();

//     const intervalId = setInterval(() => {
//       if (authToken) {
//         fetchData(authToken);
//       }
//     }, 30000); // Fetch data every 30 seconds

//     return () => clearInterval(intervalId);
//   }, [authToken, credentials]);

//   const handleSearch = (text) => {
//     setSearchQuery(text);
//     filterAndSortData(text, selectedSeverity);
//   };

//   const filterAndSortData = (query, severity) => {
//     let data = tableData;

//     if (query) {
//       data = data.filter((row) =>
//         row.gname.toLowerCase().includes(query.toLowerCase())
//       );
//     }

//     if (severity) {
//       data = data.sort((a, b) => {
//         if (severity === "Disaster") return b.pcount - a.pcount;
//         if (severity === "High") return b.pcount - a.pcount;
//         if (severity === "Average") return b.pcount - a.pcount;
//         if (severity === "Warning") return b.pcount - a.pcount;
//         if (severity === "Info") return b.pcount - a.pcount;
//         return 0;
//       });
//     }

//     setFilteredData(data);
//   };

//   const handleSeveritySelection = (severity) => {
//     const newSeverity = selectedSeverity === severity ? null : severity;
//     setSelectedSeverity(newSeverity);

//     if (newSeverity) {
//       if (severityCount[newSeverity] > 0) {
//         // Filter and sort data based on the selected severity
//         const filtered = tableData
//           .filter((row) =>
//             row.gname.toLowerCase().includes(searchQuery.toLowerCase())
//           )
//           .sort((a, b) => {
//             if (newSeverity === "Disaster") return b.pcount - a.pcount;
//             if (newSeverity === "High") return b.pcount - a.pcount;
//             if (newSeverity === "Average") return b.pcount - a.pcount;
//             if (newSeverity === "Warning") return b.pcount - a.pcount;
//             if (newSeverity === "Info") return b.pcount - a.pcount;
//             return 0;
//           });
//         setFilteredData(filtered);
//       } else {
//         setFilteredData([]); // If selected severity has a count of 0, show an empty list
//       }
//     } else {
//       // Revert to the original list immediately
//       setFilteredData(
//         tableData.filter((row) =>
//           row.gname.toLowerCase().includes(searchQuery.toLowerCase())
//         )
//       );
//     }
//   };

//   const tableHead = ["Host Group", "Problems", "Total Hosts"];

//   const severityColors = {
//     Disaster: "#E57373",
//     High: "#FF8A65",
//     Average: "#FFB74D",
//     Warning: "#FFF176",
//     Info: "#90CAF9",
//     "N/A": "#D3D3D3",
//   };

//   const selectedSeverityColors = {
//     Disaster: "#B71C1C",
//     High: "#D84315",
//     Average: "#F57C00",
//     Warning: "#FBC02D",
//     Info: "#1976D2",
//     "N/A": "#757575",
//   };

//   return (
//     <SafeAreaView style={{ flex: 1, backgroundColor: "#f8f9fa" }}>
//       <KeyboardAvoidingView
//         style={{ flex: 1 }}
//         behavior={Platform.OS === "ios" ? "padding" : "height"}>
//         <ScrollView contentContainerStyle={styles.container}>
//           <View style={styles.header}>
//             <Text style={styles.headerText}>
//               Server Name: {credentials?.serverName}
//             </Text>
//             <TouchableOpacity
//               onPress={() => fetchData(authToken)}
//               style={styles.refreshButton}>
//               <Ionicons name="refresh" size={24} color="black" />
//             </TouchableOpacity>
//           </View>
//           <View style={styles.searchContainer}>
//             <TextInput
//               style={styles.searchInput}
//               placeholder="Search Host Name..."
//               value={searchQuery}
//               onChangeText={handleSearch}
//             />
//           </View>
//           <View style={styles.content}>
//             {loading ? (
//               <ActivityIndicator size="large" color="#007BFF" />
//             ) : (
//               <>
//                 <View style={styles.hugeRectangle}>
//                   {Object.entries(severityCount).map(([severity, count]) => (
//                     <TouchableOpacity
//                       key={severity}
//                       onPress={() => handleSeveritySelection(severity)}
//                       style={[
//                         styles.box,
//                         {
//                           backgroundColor:
//                             selectedSeverity === severity
//                               ? selectedSeverityColors[severity]
//                               : severityColors[severity],
//                         },
//                       ]}>
//                       <Text style={styles.boxNumber}>{count}</Text>
//                       <Text style={styles.boxText}>{severity}</Text>
//                     </TouchableOpacity>
//                   ))}
//                 </View>
//                 <View style={styles.tableContainer}>
//                   <View style={styles.tableRow}>
//                     <Text style={[styles.tableHeader, styles.tableHeaderLarge]}>
//                       Host Group
//                     </Text>
//                     <Text style={[styles.tableHeader, styles.tableHeaderSmall]}>
//                       Problems
//                     </Text>
//                     <Text style={[styles.tableHeader, styles.tableHeaderSmall]}>
//                       Total Hosts
//                     </Text>
//                   </View>
//                   {filteredData
//                     .filter((rowData) => rowData.totalHosts > 0) // Filter out rows where totalHosts is 0
//                     .map((rowData, rowIndex) => (
//                       <TouchableOpacity
//                         key={rowIndex}
//                         onPress={() =>
//                           navigateToGroupProblems(rowData.gid, rowData.gname)
//                         }>
//                         <View key={rowIndex} style={styles.tableRow}>
//                           <Text
//                             style={[styles.tableCell, styles.tableCellLarge]}>
//                             {rowData.gname}
//                           </Text>
//                           <Text
//                             style={[styles.tableCell, styles.tableCellSmall]}>
//                             {rowData.pcount}
//                           </Text>
//                           <Text
//                             style={[styles.tableCell, styles.tableCellSmall]}>
//                             {rowData.totalHosts}
//                           </Text>
//                         </View>
//                       </TouchableOpacity>
//                     ))}
//                 </View>
//               </>
//             )}
//           </View>
//         </ScrollView>
//       </KeyboardAvoidingView>
//     </SafeAreaView>
//   );
// };

// const { width } = Dimensions.get("window");
// const boxFontSize = width / 35;
// const numberFontSize = width / 25;

// const styles = StyleSheet.create({
//   container: {
//     flexGrow: 1,
//     paddingVertical: 16,
//     paddingHorizontal: 8, // Reduced left and right padding
//   },
//   header: {
//     flexDirection: "row",
//     alignItems: "center",
//     padding: 10,
//     backgroundColor: "#fff",
//     borderBottomWidth: 1,
//     borderBottomColor: "#ddd",
//     elevation: 2,
//     shadowColor: "#000",
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.1,
//     shadowRadius: 2,
//   },
//   headerText: {
//     fontSize: 14,
//     color: "#333",
//     marginLeft: 10,
//   },
//   refreshButton: {
//     marginLeft: "auto",
//   },
//   searchContainer: {
//     paddingHorizontal: 8, // Reduced left and right padding
//     paddingVertical: 8,
//     marginTop: 10,
//     backgroundColor: "#fff",
//     borderRadius: 8,
//     shadowColor: "#000",
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.1,
//     shadowRadius: 2,
//     elevation: 3,
//   },
//   searchInput: {
//     height: 40,
//     borderColor: "#ddd",
//     borderWidth: 1,
//     borderRadius: 8,
//     paddingHorizontal: 10,
//     backgroundColor: "#fff",
//   },
//   content: {
//     flex: 1,
//     marginTop: 10,
//   },
//   hugeRectangle: {
//     marginTop: 15,
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "center",
//     marginBottom: 15,
//   },
//   box: {
//     flex: 1,
//     height: 80,
//     justifyContent: "center",
//     alignItems: "center",
//     borderRadius: 8,
//     marginHorizontal: 3,
//     padding: 2,
//   },
//   selectedBox: {
//     borderWidth: 2,
//     borderColor: "#007BFF",
//   },
//   boxText: {
//     fontSize: boxFontSize,
//     fontWeight: "bold",
//     color: "#000",
//     textAlign: "center",
//   },
//   boxNumber: {
//     fontSize: numberFontSize,
//     fontWeight: "bold",
//     color: "#000",
//     textAlign: "center",
//   },
//   tableContainer: {
//     marginTop: 0,
//     backgroundColor: "#fff",
//     borderRadius: 8,
//     padding: 10,
//     shadowColor: "#000",
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.1,
//     shadowRadius: 2,
//     elevation: 3,
//   },
//   tableRow: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "center",
//     paddingVertical: 10,
//     borderBottomWidth: 1,
//     borderColor: "#ddd",
//   },
//   tableHeader: {
//     flex: 1,
//     fontWeight: "bold",
//     textAlign: "center",
//     padding: 5,
//     fontSize: 16,
//     color: "#333",
//   },
//   tableHeaderLarge: {
//     flex: 2.5, // More space for Host Group
//     textAlign: "left", // Left-align header text
//   },
//   tableHeaderSmall: {
//     flex: 1.5, // Less space for Problems and Total Hosts
//   },
//   tableCell: {
//     flex: 1,
//     textAlign: "center",
//     paddingVertical: 5,
//     paddingHorizontal: 2,
//     fontSize: 15,
//     color: "#333",
//     flexWrap: "wrap", // Ensure text wraps within the cell
//   },
//   tableCellLarge: {
//     flex: 2.5, // More space for Host Group
//     textAlign: "left",
//   },
//   tableCellSmall: {
//     flex: 1.5, // Less space for Problems and Total Hosts
//   },
// });

// export default DashboardScreen;
