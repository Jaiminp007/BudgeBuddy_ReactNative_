// // import React, { useEffect, useState } from "react";
// // import { View, Text, StyleSheet, ScrollView, Dimensions } from "react-native";
// // import { useLocalSearchParams } from "expo-router";
// // import { fetchGroupProblemDetails, authService } from "../services/apiHost";

// // const GroupProblemsScreen = () => {
// //   const [authToken, setAuthToken] = useState<string | null>(null);
// //   const [tableData, setTableData] = useState([]);
// //   const { groupId, groupName } = useLocalSearchParams();

// //   const fetchData = async (token) => {
// //     console.log("Detail Screen");
// //     const data = await fetchGroupProblemDetails(token, groupId);
// //     const transformedData = data.map((event) => [
// //       event.hosts[0]?.host || "Unknown Host",
// //       event.name,
// //       mapSeverity(event.severity),
// //       event.duration,
// //     ]);
// //     setTableData(transformedData);
// //     console.log(transformedData);
// //   };

// //   const mapSeverity = (severity) => {
// //     switch (severity) {
// //       case "5":
// //         return "Disaster";
// //       case "4":
// //         return "High";
// //       case "3":
// //         return "Average";
// //       case "2":
// //         return "Warning";
// //       case "1":
// //         return "Info";
// //       default:
// //         return "N/A";
// //     }
// //   };

// //   useEffect(() => {
// //     const initialize = async () => {
// //       const token = await authService.login();
// //       setAuthToken(token);
// //       await fetchData(token);
// //     };

// //     initialize();
// //   }, []);

// //   const tableHead = ["Host Name", "Problems", "Time"];

// //   const severityColors = {
// //     Disaster: "#FF8C50", // Lighter Red
// //     High: "#FF7F7F", // Lighter Dark Orange
// //     Average: "#FFB84D", // Lighter Orange
// //     Warning: "#FFD966", // Lighter Gold
// //     Info: "#ADD8E6", // Lighter Light Blue
// //     "N/A": "#D3D3D3", // Light Grey (unchanged)
// //   };

// //   return (
// //     <ScrollView style={styles.container}>
// //       <Text style={styles.header}>Problems for Group {groupName}</Text>
// //       <View style={styles.content}>
// //         <View style={styles.tableContainer}>
// //           <View style={styles.tableRow}>
// //             {tableHead.map((header, index) => (
// //               <Text
// //                 key={index}
// //                 style={[
// //                   styles.tableHeader,
// //                   index === 0 && styles.tableHeaderHost,
// //                 ]}>
// //                 {header}
// //               </Text>
// //             ))}
// //           </View>
// //           {tableData.map((rowData, rowIndex) => (
// //             <View key={rowIndex} style={styles.tableRow}>
// //               {rowData
// //                 .filter((_, index) => index !== 2) // Filtering out the "Severity" column
// //                 .map((cellData, cellIndex) => (
// //                   <Text
// //                     key={cellIndex}
// //                     style={[
// //                       styles.tableCell,
// //                       cellIndex === 0 && styles.tableCellHost,
// //                       cellIndex === 1 && {
// //                         backgroundColor: severityColors[rowData[2]],
// //                       }, // Color the "With problems" column
// //                     ]}>
// //                     {cellData}
// //                   </Text>
// //                 ))}
// //             </View>
// //           ))}
// //         </View>
// //       </View>
// //     </ScrollView>
// //   );
// // };

// // const { width } = Dimensions.get("window");
// // const boxFontSize = width / 35;
// // const numberFontSize = width / 25;

// // const styles = StyleSheet.create({
// //   container: {
// //     flex: 1,
// //     backgroundColor: "#f0f4f7",
// //   },
// //   header: {
// //     flexDirection: "row",
// //     alignItems: "center",
// //     padding: 10,
// //     backgroundColor: "#ddd",
// //     borderBottomWidth: 1,
// //     borderBottomColor: "#bbb",
// //   },
// //   headerText: {
// //     fontSize: 14,
// //     color: "#333",
// //     marginLeft: 10,
// //   },
// //   refreshButton: {
// //     marginLeft: "auto",
// //   },
// //   content: {
// //     flex: 1,
// //     padding: 16,
// //   },
// //   hugeRectangle: {
// //     flexDirection: "row",
// //     justifyContent: "space-between",
// //     alignItems: "center",
// //     marginBottom: 20,
// //   },
// //   box: {
// //     flex: 1,
// //     height: 80,
// //     justifyContent: "center",
// //     alignItems: "center",
// //     borderRadius: 8,
// //     marginHorizontal: 1, // Ensure small gap between boxes
// //     padding: 2,
// //   },
// //   boxText: {
// //     fontSize: boxFontSize,
// //     fontWeight: "bold",
// //     color: "#000", // Black font color
// //     textAlign: "center",
// //   },
// //   boxNumber: {
// //     fontSize: numberFontSize,
// //     fontWeight: "bold",
// //     color: "#000", // Black font color
// //     textAlign: "center",
// //   },
// //   tableContainer: {
// //     marginTop: 20,
// //   },
// //   tableRow: {
// //     flexDirection: "row",
// //     justifyContent: "space-between",
// //     paddingVertical: 5,
// //     borderBottomWidth: 1,
// //     borderColor: "#C1C0B9",
// //   },
// //   tableHeaderRow: {
// //     backgroundColor: "#f1f8ff",
// //   },
// //   tableHeader: {
// //     flex: 1,
// //     fontWeight: "bold",
// //     textAlign: "center",
// //     padding: 5,
// //     fontSize: 15,
// //   },
// //   tableHeaderHost: {
// //     flex: 2, // Host group column size
// //     textAlign: "left",
// //   },
// //   tableCell: {
// //     flex: 1,
// //     textAlign: "center",
// //     padding: 5,
// //     fontSize: 15,
// //     width:5,
// //   },
// //   tableCellHost: {
// //     flex: 2, // Host group column size
// //     textAlign: "left",
// //   },
// // });

// // export default GroupProblemsScreen;

// // import React, { useEffect, useState } from "react";
// // import {
// //   View,
// //   Text,
// //   StyleSheet,
// //   ScrollView,
// //   Dimensions,
// //   SafeAreaView,
// //   KeyboardAvoidingView,
// //   Platform,
// //   ActivityIndicator,
// // } from "react-native";
// // import { useLocalSearchParams } from "expo-router";
// // import { fetchGroupProblemDetails, authService } from "../services/apiHost";

// // const GroupProblemsScreen = () => {
// //   const [authToken, setAuthToken] = useState<string | null>(null);
// //   const [tableData, setTableData] = useState([]);
// //   const [severityCount, setSeverityCount] = useState({
// //     Disaster: 0,
// //     High: 0,
// //     Average: 0,
// //     Warning: 0,
// //     Info: 0,
// //     "N/A": 0,
// //   });
// //   const { groupId, groupName } = useLocalSearchParams();

// //   const fetchData = async (token) => {
// //     console.log("Detail Screen");
// //     const data = await fetchGroupProblemDetails(token, groupId);
// //     const transformedData = data.map((event) => [
// //       event.hosts[0]?.host || "Unknown Host",
// //       event.name,
// //       mapSeverity(event.severity),
// //       event.duration,
// //     ]);
// //     setTableData(transformedData);
// //     console.log(transformedData);

// //     const counts = {
// //       Disaster: 0,
// //       High: 0,
// //       Average: 0,
// //       Warning: 0,
// //       Info: 0,
// //       "N/A": 0,
// //     };

// //     data.forEach((event) => {
// //       counts[mapSeverity(event.severity)]++;
// //     });

// //     setSeverityCount(counts);
// //   };

// //   const mapSeverity = (severity) => {
// //     switch (severity) {
// //       case "5":
// //         return "Disaster";
// //       case "4":
// //         return "High";
// //       case "3":
// //         return "Average";
// //       case "2":
// //         return "Warning";
// //       case "1":
// //         return "Info";
// //       default:
// //         return "N/A";
// //     }
// //   };

// //   useEffect(() => {
// //     const initialize = async () => {
// //       const token = await authService.login();
// //       setAuthToken(token);
// //       await fetchData(token);
// //     };

// //     initialize();
// //   }, []);

// //   const tableHead = ["Host Name", "Problems", "Time"];

// //   const severityColors = {
// //     Disaster: "#E57373",
// //     High: "#FF8A65",
// //     Average: "#FFB74D",
// //     Warning: "#FFF176",
// //     Info: "#90CAF9",
// //     "N/A": "#D3D3D3",
// //   };

// //   return (
// //     <SafeAreaView style={{ flex: 1, backgroundColor: "#f8f9fa" }}>
// //       <KeyboardAvoidingView
// //         style={{ flex: 1 }}
// //         behavior={Platform.OS === "ios" ? "padding" : "height"}>
// //         <ScrollView contentContainerStyle={styles.container}>
// //           <View style={styles.header}>
// //             <Text style={styles.headerText}>
// //               Problems for Group: {groupName}
// //             </Text>
// //           </View>
// //           <View style={styles.content}>
// //             <View style={styles.hugeRectangle}>
// //               {Object.entries(severityCount).map(([severity, count]) => (
// //                 <View
// //                   key={severity}
// //                   style={[
// //                     styles.box,
// //                     { backgroundColor: severityColors[severity] },
// //                   ]}>
// //                   <Text style={styles.boxNumber}>{count}</Text>
// //                   <Text style={styles.boxText}>{severity}</Text>
// //                 </View>
// //               ))}
// //             </View>
// //             {tableData.length === 0 ? (
// //               <ActivityIndicator size="large" color="#007BFF" />
// //             ) : (
// //               <View style={styles.tableContainer}>
// //                 <View style={styles.tableRow}>
// //                   {tableHead.map((header, index) => (
// //                     <Text key={index} style={styles.tableHeader}>
// //                       {header}
// //                     </Text>
// //                   ))}
// //                 </View>
// //                 {tableData.map((rowData, rowIndex) => (
// //                   <View key={rowIndex} style={styles.tableRow}>
// //                     {rowData
// //                       .filter((_, index) => index !== 2) // Filtering out the "Severity" column
// //                       .map((cellData, cellIndex) => (
// //                         <Text
// //                           key={cellIndex}
// //                           style={[
// //                             styles.tableCell,
// //                             cellIndex === 1 && {
// //                               backgroundColor: severityColors[rowData[2]],
// //                             }, // Color the "With problems" column
// //                           ]}>
// //                           {cellData}
// //                         </Text>
// //                       ))}
// //                   </View>
// //                 ))}
// //               </View>
// //             )}
// //           </View>
// //         </ScrollView>
// //       </KeyboardAvoidingView>
// //     </SafeAreaView>
// //   );
// // };

// // const { width } = Dimensions.get("window");
// // const boxFontSize = width / 35;
// // const numberFontSize = width / 25;

// // const styles = StyleSheet.create({
// //   container: {
// //     flexGrow: 1,
// //     paddingVertical: 16,
// //     paddingHorizontal: 8,
// //   },
// //   header: {
// //     flexDirection: "row",
// //     alignItems: "center",
// //     padding: 10,
// //     backgroundColor: "#fff",
// //     borderBottomWidth: 1,
// //     borderBottomColor: "#ddd",
// //     elevation: 2,
// //     shadowColor: "#000",
// //     shadowOffset: { width: 0, height: 2 },
// //     shadowOpacity: 0.1,
// //     shadowRadius: 2,
// //   },
// //   headerText: {
// //     fontSize: 14,
// //     color: "#333",
// //     marginLeft: 10,
// //   },
// //   content: {
// //     flex: 1,
// //     marginTop: 10,
// //   },
// //   hugeRectangle: {
// //     marginTop: 15,
// //     flexDirection: "row",
// //     justifyContent: "space-between",
// //     alignItems: "center",
// //     marginBottom: 15,
// //   },
// //   box: {
// //     flex: 1,
// //     height: 80,
// //     justifyContent: "center",
// //     alignItems: "center",
// //     borderRadius: 8,
// //     marginHorizontal: 3,
// //     padding: 2,
// //   },
// //   boxText: {
// //     fontSize: boxFontSize,
// //     fontWeight: "bold",
// //     color: "#000",
// //     textAlign: "center",
// //   },
// //   boxNumber: {
// //     fontSize: numberFontSize,
// //     fontWeight: "bold",
// //     color: "#000",
// //     textAlign: "center",
// //   },
// //   tableContainer: {
// //     marginTop: 0,
// //     backgroundColor: "#fff",
// //     borderRadius: 8,
// //     padding: 10,
// //     shadowColor: "#000",
// //     shadowOffset: { width: 0, height: 2 },
// //     shadowOpacity: 0.1,
// //     shadowRadius: 2,
// //     elevation: 3,
// //   },
// //   tableRow: {
// //     flexDirection: "row",
// //     justifyContent: "space-between",
// //     alignItems: "center",
// //     paddingVertical: 10,
// //     borderBottomWidth: 1,
// //     borderColor: "#ddd",
// //   },
// //   tableHeader: {
// //     flex: 1,
// //     fontWeight: "bold",
// //     textAlign: "center",
// //     padding: 5,
// //     fontSize: 16,
// //     color: "#333",
// //     flexWrap: "wrap",
// //   },
// //   tableCell: {
// //     flex: 1,
// //     textAlign: "center",
// //     paddingVertical: 5,
// //     paddingHorizontal: 2,
// //     fontSize: 15,
// //     color: "#333",
// //     flexWrap: "wrap",
// //   },
// // });

// // export default GroupProblemsScreen;

// // import React, { useEffect, useState } from "react";
// // import {
// //   View,
// //   Text,
// //   StyleSheet,
// //   Dimensions,
// //   ScrollView,
// //   ActivityIndicator,
// //   SafeAreaView,
// //   KeyboardAvoidingView,
// //   Platform,
// //   TouchableOpacity,
// // } from "react-native";
// // import { useLocalSearchParams } from "expo-router";
// // import { fetchGroupProblemDetails, authService } from "../services/apiHost";
// // import { Ionicons } from "@expo/vector-icons";

// // const GroupProblemsScreen = () => {
// //   const [authToken, setAuthToken] = useState<string | null>(null);
// //   const [tableData, setTableData] = useState([]);
// //   const [severityCount, setSeverityCount] = useState({
// //     Disaster: 0,
// //     High: 0,
// //     Average: 0,
// //     Warning: 0,
// //     Info: 0,
// //     "N/A": 0,
// //   });
// //   const [filteredData, setFilteredData] = useState([]);
// //   const [selectedSeverity, setSelectedSeverity] = useState(null);
// //   const { groupId, groupName } = useLocalSearchParams();

// //   const fetchData = async (token) => {
// //     console.log("Detail Screen");
// //     const data = await fetchGroupProblemDetails(token, groupId);
// //     const transformedData = data.map((event) => [
// //       event.hosts[0]?.host || "Unknown Host",
// //       event.name,
// //       mapSeverity(event.severity),
// //       event.duration,
// //     ]);
// //     setTableData(transformedData);
// //     setFilteredData(transformedData);
// //     console.log(transformedData);

// //     const counts = {
// //       Disaster: 0,
// //       High: 0,
// //       Average: 0,
// //       Warning: 0,
// //       Info: 0,
// //       "N/A": 0,
// //     };

// //     data.forEach((event) => {
// //       counts[mapSeverity(event.severity)]++;
// //     });

// //     setSeverityCount(counts);
// //   };

// //   const mapSeverity = (severity) => {
// //     switch (severity) {
// //       case "5":
// //         return "Disaster";
// //       case "4":
// //         return "High";
// //       case "3":
// //         return "Average";
// //       case "2":
// //         return "Warning";
// //       case "1":
// //         return "Info";
// //       default:
// //         return "N/A";
// //     }
// //   };

// //   useEffect(() => {
// //     const initialize = async () => {
// //       const token = await authService.login();
// //       setAuthToken(token);
// //       await fetchData(token);
// //     };

// //     initialize();
// //   }, []);

// //   const handleSeveritySelection = (severity) => {
// //     const newSeverity = selectedSeverity === severity ? null : severity;
// //     setSelectedSeverity(newSeverity);

// //     if (newSeverity) {
// //       if (severityCount[newSeverity] > 0) {
// //         const filtered = tableData.filter((row) => row[2] === newSeverity);
// //         setFilteredData(filtered);
// //       } else {
// //         setFilteredData([]);
// //       }
// //     } else {
// //       setFilteredData(tableData);
// //     }
// //   };

// //   const tableHead = ["Host Name", "Problems", "Time"];

// //   const severityColors = {
// //     Disaster: "#E57373",
// //     High: "#FF8A65",
// //     Average: "#FFB74D",
// //     Warning: "#FFF176",
// //     Info: "#90CAF9",
// //     "N/A": "#D3D3D3",
// //   };

// //   const selectedSeverityColors = {
// //     Disaster: "#B71C1C",
// //     High: "#D84315",
// //     Average: "#F57C00",
// //     Warning: "#FBC02D",
// //     Info: "#1976D2",
// //     "N/A": "#757575",
// //   };

// //   return (
// //     <SafeAreaView style={{ flex: 1, backgroundColor: "#f8f9fa" }}>
// //       <KeyboardAvoidingView
// //         style={{ flex: 1 }}
// //         behavior={Platform.OS === "ios" ? "padding" : "height"}>
// //         <ScrollView contentContainerStyle={styles.container}>
// //           <View style={styles.header}>
// //             <Text style={styles.headerText}>
// //               Problems for Group: {groupName}
// //             </Text>
// //             <TouchableOpacity
// //               onPress={() => fetchData(authToken)}
// //               style={styles.refreshButton}>
// //               <Ionicons name="refresh" size={24} color="black" />
// //             </TouchableOpacity>
// //           </View>
// //           <View style={styles.content}>
// //             <View style={styles.hugeRectangle}>
// //               {Object.entries(severityCount).map(([severity, count]) => (
// //                 <TouchableOpacity
// //                   key={severity}
// //                   onPress={() => handleSeveritySelection(severity)}
// //                   style={[
// //                     styles.box,
// //                     {
// //                       backgroundColor:
// //                         selectedSeverity === severity
// //                           ? selectedSeverityColors[severity]
// //                           : severityColors[severity],
// //                     },
// //                   ]}>
// //                   <Text style={styles.boxNumber}>{count}</Text>
// //                   <Text style={styles.boxText}>{severity}</Text>
// //                 </TouchableOpacity>
// //               ))}
// //             </View>
// //             {filteredData.length === 0 ? (
// //               <ActivityIndicator size="large" color="#007BFF" />
// //             ) : (
// //               <View style={styles.tableContainer}>
// //                 <View style={styles.tableRow}>
// //                   {tableHead.map((header, index) => (
// //                     <Text
// //                       key={index}
// //                       style={[
// //                         styles.tableHeader,
// //                         index === 0 && styles.tableHeaderHost,
// //                       ]}>
// //                       {header}
// //                     </Text>
// //                   ))}
// //                 </View>
// //                 {filteredData.map((rowData, rowIndex) => (
// //                   <View key={rowIndex} style={styles.tableRow}>
// //                     {rowData.map((cellData, cellIndex) => (
// //                       <Text
// //                         key={cellIndex}
// //                         style={[
// //                           styles.tableCell,
// //                           cellIndex === 0 && styles.tableCellHost,
// //                           cellIndex === 1 && {
// //                             backgroundColor: severityColors[rowData[2]],
// //                           },
// //                         ]}>
// //                         {cellData}
// //                       </Text>
// //                     ))}
// //                   </View>
// //                 ))}
// //               </View>
// //             )}
// //           </View>
// //         </ScrollView>
// //       </KeyboardAvoidingView>
// //     </SafeAreaView>
// //   );
// // };

// // const { width } = Dimensions.get("window");
// // const boxFontSize = width / 35;
// // const numberFontSize = width / 25;

// // const styles = StyleSheet.create({
// //   container: {
// //     flexGrow: 1,
// //     paddingVertical: 16,
// //     paddingHorizontal: 8,
// //   },
// //   refreshButton: {
// //     marginLeft: "auto",
// //   },
// //   header: {
// //     flexDirection: "row",
// //     alignItems: "center",
// //     padding: 10,
// //     backgroundColor: "#fff",
// //     borderBottomWidth: 1,
// //     borderBottomColor: "#ddd",
// //     elevation: 2,
// //     shadowColor: "#000",
// //     shadowOffset: { width: 0, height: 2 },
// //     shadowOpacity: 0.1,
// //     shadowRadius: 2,
// //   },
// //   headerText: {
// //     fontSize: 16,
// //     color: "#333",
// //     marginLeft: 10,
// //     fontWeight: "bold",
// //   },
// //   groupName: {
// //     fontSize: 18,
// //     fontWeight: "bold",
// //   },
// //   content: {
// //     flex: 1,
// //     marginTop: 10,
// //   },
// //   hugeRectangle: {
// //     marginTop: 15,
// //     flexDirection: "row",
// //     justifyContent: "space-between",
// //     alignItems: "center",
// //     marginBottom: 15,
// //   },
// //   box: {
// //     flex: 1,
// //     height: 80,
// //     justifyContent: "center",
// //     alignItems: "center",
// //     borderRadius: 8,
// //     marginHorizontal: 3,
// //     padding: 2,
// //   },
// //   boxText: {
// //     fontSize: boxFontSize,
// //     fontWeight: "bold",
// //     color: "#000",
// //     textAlign: "center",
// //   },
// //   boxNumber: {
// //     fontSize: numberFontSize,
// //     fontWeight: "bold",
// //     color: "#000",
// //     textAlign: "center",
// //   },
// //   tableContainer: {
// //     marginTop: 0,
// //     backgroundColor: "#fff",
// //     borderRadius: 8,
// //     padding: 10,
// //     shadowColor: "#000",
// //     shadowOffset: { width: 0, height: 2 },
// //     shadowOpacity: 0.1,
// //     shadowRadius: 2,
// //     elevation: 3,
// //   },
// //   tableRow: {
// //     flexDirection: "row",
// //     justifyContent: "space-between",
// //     alignItems: "center",
// //     paddingVertical: 10,
// //     borderBottomWidth: 1,
// //     borderColor: "#ddd",
// //   },
// //   tableHeader: {
// //     fontWeight: "bold",
// //     textAlign: "center",
// //     padding: 5,
// //     fontSize: 16,
// //     color: "#333",
// //   },
// //   tableHeaderHost: {
// //     flex: 2.5,
// //     textAlign: "left",
// //   },
// //   tableHeaderSmall: {
// //     flex: 1.5,
// //   },
// //   tableCell: {
// //     textAlign: "center",
// //     paddingVertical: 5,
// //     paddingHorizontal: 2,
// //     fontSize: 15,
// //     color: "#333",
// //     flexWrap: "wrap",
// //   },
// //   tableCellHost: {
// //     flex: 2.5,
// //     textAlign: "left",
// //   },
// //   tableCellSmall: {
// //     flex: 1.5,
// //   },
// // });

// // export default GroupProblemsScreen;

// // import React, { useEffect, useState } from "react";
// // import {
// //   View,
// //   Text,
// //   StyleSheet,
// //   Dimensions,
// //   ScrollView,
// //   ActivityIndicator,
// //   SafeAreaView,
// //   KeyboardAvoidingView,
// //   Platform,
// //   TouchableOpacity,
// // } from "react-native";
// // import { useLocalSearchParams } from "expo-router";
// // import { fetchGroupProblemDetails, authService } from "../services/apiHost";
// // import { Ionicons } from "@expo/vector-icons";

// // const GroupProblemsScreen = () => {
// //   const [authToken, setAuthToken] = useState<string | null>(null);
// //   const [tableData, setTableData] = useState([]);
// //   const [severityCount, setSeverityCount] = useState({
// //     Disaster: 0,
// //     High: 0,
// //     Average: 0,
// //     Warning: 0,
// //     Info: 0,
// //     "N/A": 0,
// //   });
// //   const [filteredData, setFilteredData] = useState([]);
// //   const [selectedSeverity, setSelectedSeverity] = useState(null);
// //   const { groupId, groupName } = useLocalSearchParams();

// //   const fetchData = async (token) => {
// //     console.log("Detail Screen");
// //     const data = await fetchGroupProblemDetails(token, groupId);
// //     const transformedData = data.map((event) => [
// //       event.hosts[0]?.host || "Unknown Host",
// //       event.name,
// //       mapSeverity(event.severity),
// //       event.duration,
// //     ]);
// //     setTableData(transformedData);
// //     setFilteredData(transformedData);
// //     console.log(transformedData);

// //     const counts = {
// //       Disaster: 0,
// //       High: 0,
// //       Average: 0,
// //       Warning: 0,
// //       Info: 0,
// //       "N/A": 0,
// //     };

// //     data.forEach((event) => {
// //       counts[mapSeverity(event.severity)]++;
// //     });

// //     setSeverityCount(counts);
// //   };

// //   const mapSeverity = (severity) => {
// //     switch (severity) {
// //       case "5":
// //         return "Disaster";
// //       case "4":
// //         return "High";
// //       case "3":
// //         return "Average";
// //       case "2":
// //         return "Warning";
// //       case "1":
// //         return "Info";
// //       default:
// //         return "N/A";
// //     }
// //   };

// //   useEffect(() => {
// //     const initialize = async () => {
// //       const token = await authService.login();
// //       setAuthToken(token);
// //       await fetchData(token);
// //     };

// //     initialize();
// //   }, []);

// //   const handleSeveritySelection = (severity) => {
// //     const newSeverity = selectedSeverity === severity ? null : severity;
// //     setSelectedSeverity(newSeverity);

// //     if (newSeverity) {
// //       if (severityCount[newSeverity] > 0) {
// //         const filtered = tableData.filter((row) => row[2] === newSeverity);
// //         setFilteredData(filtered);
// //       } else {
// //         setFilteredData([]);
// //       }
// //     } else {
// //       setFilteredData(tableData);
// //     }
// //   };

// //   const tableHead = ["Host Name", "Problems", "Time"];

// //   const severityColors = {
// //     Disaster: "#E57373",
// //     High: "#FF8A65",
// //     Average: "#FFB74D",
// //     Warning: "#FFF176",
// //     Info: "#90CAF9",
// //     "N/A": "#D3D3D3",
// //   };

// //   const selectedSeverityColors = {
// //     Disaster: "#B71C1C",
// //     High: "#D84315",
// //     Average: "#F57C00",
// //     Warning: "#FBC02D",
// //     Info: "#1976D2",
// //     "N/A": "#757575",
// //   };

// //   return (
// //     <SafeAreaView style={{ flex: 1, backgroundColor: "#f8f9fa" }}>
// //       <KeyboardAvoidingView
// //         style={{ flex: 1 }}
// //         behavior={Platform.OS === "ios" ? "padding" : "height"}>
// //         <ScrollView contentContainerStyle={styles.container}>
// //           <View style={styles.header}>
// //             <Text style={styles.headerText}>
// //               Problems for Group:{" "}
// //               <Text style={styles.groupName}>{groupName}</Text>
// //             </Text>
// //             <TouchableOpacity
// //               onPress={() => fetchData(authToken)}
// //               style={styles.refreshButton}>
// //               <Ionicons name="refresh" size={24} color="black" />
// //             </TouchableOpacity>
// //           </View>
// //           <View style={styles.content}>
// //             <View style={styles.hugeRectangle}>
// //               {Object.entries(severityCount).map(([severity, count]) => (
// //                 <TouchableOpacity
// //                   key={severity}
// //                   onPress={() => handleSeveritySelection(severity)}
// //                   style={[
// //                     styles.box,
// //                     {
// //                       backgroundColor:
// //                         selectedSeverity === severity
// //                           ? selectedSeverityColors[severity]
// //                           : severityColors[severity],
// //                     },
// //                   ]}>
// //                   <Text style={styles.boxNumber}>{count}</Text>
// //                   <Text style={styles.boxText}>{severity}</Text>
// //                 </TouchableOpacity>
// //               ))}
// //             </View>
// //             {filteredData.length === 0 ? (
// //               <ActivityIndicator size="large" color="#007BFF" />
// //             ) : (
// //               <View style={styles.tableContainer}>
// //                 <View style={styles.tableRow}>
// //                   {tableHead.map((header, index) => (
// //                     <Text
// //                       key={index}
// //                       style={[
// //                         styles.tableHeader,
// //                         index === 0 && styles.tableHeaderHost,
// //                         index !== 0 && styles.tableHeaderSmall,
// //                       ]}>
// //                       {header}
// //                     </Text>
// //                   ))}
// //                 </View>
// //                 {filteredData.map((rowData, rowIndex) => (
// //                   <View key={rowIndex} style={styles.tableRow}>
// //                     {rowData
// //                       .filter((_, index) => index !== 2) // Removing the severity column
// //                       .map((cellData, cellIndex) => (
// //                         <Text
// //                           key={cellIndex}
// //                           style={[
// //                             styles.tableCell,
// //                             cellIndex === 0 && styles.tableCellHost,
// //                             cellIndex === 1 && {
// //                               backgroundColor: severityColors[rowData[2]],
// //                             },
// //                           ]}>
// //                           {cellData}
// //                         </Text>
// //                       ))}
// //                   </View>
// //                 ))}
// //               </View>
// //             )}
// //           </View>
// //         </ScrollView>
// //       </KeyboardAvoidingView>
// //     </SafeAreaView>
// //   );
// // };

// // const { width } = Dimensions.get("window");
// // const boxFontSize = width / 35;
// // const numberFontSize = width / 25;

// // const styles = StyleSheet.create({
// //   container: {
// //     flexGrow: 1,
// //     paddingVertical: 16,
// //     paddingHorizontal: 8,
// //   },
// //   refreshButton: {
// //     marginLeft: "auto",
// //   },
// //   header: {
// //     flexDirection: "row",
// //     alignItems: "center",
// //     padding: 10,
// //     backgroundColor: "#fff",
// //     borderBottomWidth: 1,
// //     borderBottomColor: "#ddd",
// //     elevation: 2,
// //     shadowColor: "#000",
// //     shadowOffset: { width: 0, height: 2 },
// //     shadowOpacity: 0.1,
// //     shadowRadius: 2,
// //   },
// //   headerText: {
// //     fontSize: 16,
// //     color: "#333",
// //     marginLeft: 10,
// //     fontWeight: "bold",
// //   },
// //   groupName: {
// //     fontSize: 18,
// //     fontWeight: "bold",
// //   },
// //   content: {
// //     flex: 1,
// //     marginTop: 10,
// //   },
// //   hugeRectangle: {
// //     marginTop: 15,
// //     flexDirection: "row",
// //     justifyContent: "space-between",
// //     alignItems: "center",
// //     marginBottom: 15,
// //   },
// //   box: {
// //     flex: 1,
// //     height: 80,
// //     justifyContent: "center",
// //     alignItems: "center",
// //     borderRadius: 8,
// //     marginHorizontal: 3,
// //     padding: 2,
// //   },
// //   boxText: {
// //     fontSize: boxFontSize,
// //     fontWeight: "bold",
// //     color: "#000",
// //     textAlign: "center",
// //   },
// //   boxNumber: {
// //     fontSize: numberFontSize,
// //     fontWeight: "bold",
// //     color: "#000",
// //     textAlign: "center",
// //   },
// //   tableContainer: {
// //     marginTop: 0,
// //     backgroundColor: "#fff",
// //     borderRadius: 8,
// //     padding: 10,
// //     shadowColor: "#000",
// //     shadowOffset: { width: 0, height: 2 },
// //     shadowOpacity: 0.1,
// //     shadowRadius: 2,
// //     elevation: 3,
// //   },
// //   tableRow: {
// //     flexDirection: "row",
// //     justifyContent: "space-between",
// //     alignItems: "center",
// //     paddingVertical: 10,
// //     borderBottomWidth: 1,
// //     borderColor: "#ddd",
// //   },
// //   tableHeader: {
// //     fontWeight: "bold",
// //     textAlign: "center",
// //     padding: 5,
// //     fontSize: 16,
// //     color: "#333",
// //   },
// //   tableHeaderHost: {
// //     flex: 2.5,
// //     textAlign: "left",
// //   },
// //   tableHeaderSmall: {
// //     flex: 1.5,
// //   },
// //   tableCell: {
// //     textAlign: "center",
// //     paddingVertical: 5,
// //     paddingHorizontal: 2,
// //     fontSize: 15,
// //     color: "#333",
// //     flexWrap: "wrap",
// //   },
// //   tableCellHost: {
// //     flex: 2.5,
// //     textAlign: "left",
// //     flexWrap: "wrap",
// //   },
// //   tableCellSmall: {
// //     flex: 1.5,
// //   },
// // });

// // export default GroupProblemsScreen;

// import React, { useEffect, useState } from "react";
// import {
//   View,
//   Text,
//   StyleSheet,
//   Dimensions,
//   ScrollView,
//   ActivityIndicator,
//   SafeAreaView,
//   KeyboardAvoidingView,
//   Platform,
//   TouchableOpacity,
// } from "react-native";
// import { useLocalSearchParams } from "expo-router";
// import { fetchGroupProblemDetails, authService } from "../services/apiHost";
// import { Ionicons } from "@expo/vector-icons";

// const GroupProblemsScreen = () => {
//   const [authToken, setAuthToken] = useState<string | null>(null);
//   const [tableData, setTableData] = useState([]);
//   const [severityCount, setSeverityCount] = useState({
//     Disaster: 0,
//     High: 0,
//     Average: 0,
//     Warning: 0,
//     Info: 0,
//     "N/A": 0,
//   });
//   const [filteredData, setFilteredData] = useState([]);
//   const [selectedSeverity, setSelectedSeverity] = useState(null);
//   const { groupId, groupName } = useLocalSearchParams();

//   const fetchData = async (token) => {
//     console.log("Detail Screen");
//     const data = await fetchGroupProblemDetails(token, groupId);
//     const transformedData = data.map((event) => [
//       event.hosts[0]?.host || "Unknown Host",
//       event.name,
//       mapSeverity(event.severity),
//       event.duration,
//     ]);
//     setTableData(transformedData);
//     setFilteredData(transformedData);
//     console.log(transformedData);

//     const counts = {
//       Disaster: 0,
//       High: 0,
//       Average: 0,
//       Warning: 0,
//       Info: 0,
//       "N/A": 0,
//     };

//     data.forEach((event) => {
//       counts[mapSeverity(event.severity)]++;
//     });

//     setSeverityCount(counts);
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

//   useEffect(() => {
//     const initialize = async () => {
//       const token = await authService.login();
//       setAuthToken(token);
//       await fetchData(token);
//     };

//     initialize();
//   }, []);

//   const handleSeveritySelection = (severity) => {
//     const newSeverity = selectedSeverity === severity ? null : severity;
//     setSelectedSeverity(newSeverity);

//     if (newSeverity) {
//       if (severityCount[newSeverity] > 0) {
//         const filtered = tableData.filter((row) => row[2] === newSeverity);
//         setFilteredData(filtered);
//       } else {
//         setFilteredData([]);
//       }
//     } else {
//       setFilteredData(tableData);
//     }
//   };

//   const tableHead = ["Host Name", "Problems", "Time"];

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
//               Problems for Group:{" "}
//               <Text style={styles.groupName}>{groupName}</Text>
//             </Text>
//             <TouchableOpacity
//               onPress={() => fetchData(authToken)}
//               style={styles.refreshButton}>
//               <Ionicons name="refresh" size={24} color="black" />
//             </TouchableOpacity>
//           </View>
//           <View style={styles.content}>
//             <View style={styles.hugeRectangle}>
//               {Object.entries(severityCount).map(([severity, count]) => (
//                 <TouchableOpacity
//                   key={severity}
//                   onPress={() => handleSeveritySelection(severity)}
//                   style={[
//                     styles.box,
//                     {
//                       backgroundColor:
//                         selectedSeverity === severity
//                           ? selectedSeverityColors[severity]
//                           : severityColors[severity],
//                     },
//                   ]}>
//                   <Text style={styles.boxNumber}>{count}</Text>
//                   <Text style={styles.boxText}>{severity}</Text>
//                 </TouchableOpacity>
//               ))}
//             </View>
//             {filteredData.length === 0 ? (
//               <ActivityIndicator size="large" color="#007BFF" />
//             ) : (
//               <View style={styles.tableContainer}>
//                 <View style={styles.tableRow}>
//                   {tableHead.map((header, index) => (
//                     <Text
//                       key={index}
//                       style={[
//                         styles.tableHeader,
//                         index === 0 && styles.tableHeaderHost,
//                         index !== 0 && styles.tableHeaderSmall,
//                       ]}>
//                       {header}
//                     </Text>
//                   ))}
//                 </View>
//                 {filteredData.map((rowData, rowIndex) => (
//                   <View key={rowIndex} style={styles.tableRow}>
//                     {rowData
//                       .filter((_, index) => index !== 2) // Removing the severity column
//                       .map((cellData, cellIndex) => (
//                         <Text
//                           key={cellIndex}
//                           style={[
//                             styles.tableCell,
//                             cellIndex === 0 && styles.tableCellHost,
//                             cellIndex !== 0 && styles.tableCellSmall,
//                             cellIndex === 1 && {
//                               backgroundColor: severityColors[rowData[2]],
//                             },
//                           ]}
//                           numberOfLines={0} // Allow unlimited lines
//                         >
//                           {cellData}
//                         </Text>
//                       ))}
//                   </View>
//                 ))}
//               </View>
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
//     paddingHorizontal: 8,
//   },
//   refreshButton: {
//     marginLeft: "auto",
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
//   groupName: {
//     fontSize: 18,
//     fontWeight: "bold",
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
//     alignItems: "flex-start", // Ensure alignment to the top
//     borderBottomWidth: 1,
//     borderColor: "#ddd",
//   },
//   tableHeader: {
//     fontWeight: "bold",
//     textAlign: "center",
//     padding: 5,
//     fontSize: 16,
//     color: "#333",
//   },
//   tableHeaderHost: {
//     flex: 2.5,
//     textAlign: "left",
//   },
//   tableHeaderSmall: {
//     flex: 1.5,
//   },
//   tableCell: {
//     textAlign: "center",
//     paddingVertical: 5,
//     paddingHorizontal: 2,
//     fontSize: 15,
//     color: "#333",
//     flexWrap: "wrap",
//     maxWidth: "100%",
//     textBreakStrategy: "highQuality", // Android specific, helps in better text wrapping
//     hyphenationFrequency: "full", // iOS specific, enables hyphenation
//   },
//   tableCellHost: {
//     flex: 2.5,
//     textAlign: "left",
//     flexWrap: "wrap",
//     maxWidth: "100%",
//     textBreakStrategy: "highQuality", // Android specific, helps in better text wrapping
//     hyphenationFrequency: "full", // iOS specific, enables hyphenation
//   },
//   tableCellSmall: {
//     flex: 1.5,
//     maxWidth: "100%",
//     textBreakStrategy: "highQuality", // Android specific, helps in better text wrapping
//     hyphenationFrequency: "full", // iOS specific, enables hyphenation
//   },
// });

// export default GroupProblemsScreen;

/////

// import React, { useEffect, useState } from "react";
// import {
//   View,
//   Text,
//   StyleSheet,
//   Dimensions,
//   ScrollView,
//   ActivityIndicator,
//   SafeAreaView,
//   KeyboardAvoidingView,
//   Platform,
//   TouchableOpacity,
// } from "react-native";
// import { useLocalSearchParams } from "expo-router";
// import { fetchGroupProblemDetails } from "../services/apiHost";
// import { Ionicons } from "@expo/vector-icons";
// import { useRouter } from "expo-router";

// const GroupProblemsScreen = () => {
//   const router = useRouter();
//   const [tableData, setTableData] = useState([]);
//   const [severityCount, setSeverityCount] = useState({
//     Disaster: 0,
//     High: 0,
//     Average: 0,
//     Warning: 0,
//     Info: 0,
//     "N/A": 0,
//   });
//   const [filteredData, setFilteredData] = useState([]);
//   const [selectedSeverity, setSelectedSeverity] = useState(null);
//   const { groupId, groupName } = useLocalSearchParams();

//   const navigateToHostDetails = (
//     hostName,
//     problemName,
//     severity,
//     duration,
//     hostID
//   ) => {
//     router.push({
//       pathname: "/problemDetail",
//       params: {
//         hostName,
//         problemName,
//         severity,
//         duration,
//         hostID,
//       },
//     });
//   };

//   const fetchData = async () => {
//     console.log("Detail Screen");
//     const data = await fetchGroupProblemDetails(groupId);
//     const transformedData = data.map((event) => [
//       event.hosts[0]?.host || "Unknown Host",
//       event.name,
//       mapSeverity(event.severity),
//       event.duration,
//     ]);
//     setTableData(transformedData);
//     setFilteredData(transformedData);
//     console.log(transformedData);

//     const counts = {
//       Disaster: 0,
//       High: 0,
//       Average: 0,
//       Warning: 0,
//       Info: 0,
//       "N/A": 0,
//     };

//     data.forEach((event) => {
//       counts[mapSeverity(event.severity)]++;
//     });

//     setSeverityCount(counts);
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

//   useEffect(() => {
//     const initialize = async () => {
//       await fetchData();
//     };

//     initialize();
//   }, [groupId]);

//   const handleSeveritySelection = (severity) => {
//     const newSeverity = selectedSeverity === severity ? null : severity;
//     setSelectedSeverity(newSeverity);

//     if (newSeverity) {
//       if (severityCount[newSeverity] > 0) {
//         const filtered = tableData.filter((row) => row[2] === newSeverity);
//         setFilteredData(filtered);
//       } else {
//         setFilteredData([]);
//       }
//     } else {
//       setFilteredData(tableData);
//     }
//   };

//   const tableHead = ["Host Name", "Problems", "Time"];

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
//             <TouchableOpacity
//               onPress={() => router.back()}
//               style={styles.iconButton}>
//               <Ionicons name="arrow-back" size={24} color="black" />
//             </TouchableOpacity>
//             <View style={styles.headerTextContainer}>
//               <Text style={styles.headerText}>
//                 Problems for Group:
//                 <Text style={styles.groupName}> {groupName}</Text>
//               </Text>
//             </View>
//             <TouchableOpacity onPress={fetchData} style={styles.iconButton}>
//               <Ionicons name="refresh" size={24} color="black" />
//             </TouchableOpacity>
//           </View>
//           <View style={styles.content}>
//             <View style={styles.hugeRectangle}>
//               {Object.entries(severityCount).map(([severity, count]) => (
//                 <TouchableOpacity
//                   key={severity}
//                   onPress={() => handleSeveritySelection(severity)}
//                   style={[
//                     styles.box,
//                     {
//                       backgroundColor:
//                         selectedSeverity === severity
//                           ? selectedSeverityColors[severity]
//                           : severityColors[severity],
//                     },
//                   ]}>
//                   <Text style={styles.boxNumber}>{count}</Text>
//                   <Text style={styles.boxText}>{severity}</Text>
//                 </TouchableOpacity>
//               ))}
//             </View>
//             {filteredData.length === 0 ? (
//               <ActivityIndicator size="large" color="#007BFF" />
//             ) : (
//               <View style={styles.tableContainer}>
//                 <View style={styles.tableRow}>
//                   {tableHead.map((header, index) => (
//                     <Text
//                       key={index}
//                       style={[
//                         styles.tableHeader,
//                         index === 0 && styles.tableHeaderHost,
//                         index !== 0 && styles.tableHeaderSmall,
//                       ]}>
//                       {header}
//                     </Text>
//                   ))}
//                 </View>
//                 {filteredData.map((rowData, rowIndex) => (
//                   <TouchableOpacity
//                     key={rowIndex}
//                     style={styles.tableRow}
//                     onPress={() =>
//                       navigateToHostDetails(
//                         rowData[0],
//                         rowData[1],
//                         rowData[2],
//                         rowData[3],
//                         groupId
//                       )
//                     }>
//                     {rowData
//                       .filter((_, index) => index !== 2) // Removing the severity column
//                       .map((cellData, cellIndex) => (
//                         <Text
//                           key={cellIndex}
//                           style={[
//                             styles.tableCell,
//                             cellIndex === 0 && styles.tableCellHost,
//                             cellIndex !== 0 && styles.tableCellSmall,
//                             cellIndex === 1 && {
//                               backgroundColor: severityColors[rowData[2]],
//                             },
//                           ]}
//                           numberOfLines={0} // Allow unlimited lines
//                         >
//                           {cellData}
//                         </Text>
//                       ))}
//                   </TouchableOpacity>
//                 ))}
//               </View>
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
//     paddingHorizontal: 8,
//   },
//   iconButton: {
//     padding: 10,
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
//     justifyContent: "space-between",
//   },
//   headerTextContainer: {
//     flex: 1,
//     alignItems: "center",
//   },
//   headerText: {
//     fontSize: 16,
//     color: "#333",
//     fontWeight: "bold",
//     textAlign: "center",
//   },
//   groupName: {
//     fontWeight: "normal",
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
//     alignItems: "center", // Ensure alignment to the top
//     borderBottomWidth: 1,
//     borderColor: "#ddd",
//   },
//   tableHeader: {
//     fontWeight: "bold",
//     textAlign: "center",
//     padding: 5,
//     fontSize: 16,
//     color: "#333",
//   },
//   tableHeaderHost: {
//     flex: 2.5,
//     textAlign: "left",
//   },
//   tableHeaderSmall: {
//     flex: 1.5,
//   },
//   tableCell: {
//     textAlign: "center",
//     paddingVertical: 5,
//     paddingHorizontal: 2,
//     fontSize: 15,
//     color: "#333",
//     flexWrap: "wrap",
//     maxWidth: "100%",
//     justifyContent: "center", // Center vertically
//     alignItems: "center", // Center vertically
//     width: 5,
//   },
//   tableCellHost: {
//     flex: 2.5,
//     textAlign: "left",
//     flexWrap: "wrap",
//     maxWidth: "100%",
//     justifyContent: "center", // Center vertically
//     alignItems: "center", // Center vertically
//   },
//   tableCellSmall: {
//     flex: 1.5,
//     maxWidth: "100%",
//     justifyContent: "center", // Center vertically
//     alignItems: "center", // Center vertically
//   },
// });

// export default GroupProblemsScreen;

import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  ScrollView,
  ActivityIndicator,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
} from "react-native";
import { useLocalSearchParams } from "expo-router";
import { fetchGroupProblemDetails, authService } from "../services/apiHost";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";

const GroupProblemsScreen = () => {
  const router = useRouter();
  const [tableData, setTableData] = useState([]);
  const [severityCount, setSeverityCount] = useState({
    Disaster: 0,
    High: 0,
    Average: 0,
    Warning: 0,
    Info: 0,
    "N/A": 0,
  });
  const [filteredData, setFilteredData] = useState([]);
  const [selectedSeverity, setSelectedSeverity] = useState(null);
  const { groupId, groupName } = useLocalSearchParams();
  const [loading, setLoading] = useState(true);

  const backPage = "groupProblems";

  const navigateToHostDetails = (
    hostName,
    problemName,
    severity,
    duration,
    groupId,
    groupName
  ) => {
    router.push({
      pathname: "/problemDetail",
      params: {
        hostName,
        problemName,
        severity,
        duration,
        groupId,
        groupName,
        backPage,
      },
    });
  };

  const fetchData = async () => {
    setLoading(true); // Set loading state to true
    setTableData([]); // Clear the table data
    setFilteredData([]); // Clear the filtered data
    setSeverityCount({
      // Reset severity count
      Disaster: 0,
      High: 0,
      Average: 0,
      Warning: 0,
      Info: 0,
      "N/A": 0,
    });

    console.log("Detail Screen");
    const data = await fetchGroupProblemDetails(groupId);
    const transformedData = data.map((event) => [
      event.hosts[0]?.host || "Unknown Host",
      event.name,
      mapSeverity(event.severity),
      event.duration,
    ]);
    setTableData(transformedData);
    setFilteredData(transformedData);
    console.log(transformedData);

    const counts = {
      Disaster: 0,
      High: 0,
      Average: 0,
      Warning: 0,
      Info: 0,
      "N/A": 0,
    };

    data.forEach((event) => {
      counts[mapSeverity(event.severity)]++;
    });

    setSeverityCount(counts);
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

  useEffect(() => {
    const initialize = async () => {
      const key = await AsyncStorage.getItem("current_key");
      const storedCredentials = await AsyncStorage.getItem(key);

      if (storedCredentials) {
        const credentials = JSON.parse(storedCredentials);
        const { serverHost, username, password, httpAuth } = credentials;

        if (!authService.getToken()) {
          await authService.login(serverHost, username, password, httpAuth);
        }
        await fetchData();
      }
    };

    initialize();
  }, [groupId]);

  const handleSeveritySelection = (severity) => {
    const newSeverity = selectedSeverity === severity ? null : severity;
    setSelectedSeverity(newSeverity);

    if (newSeverity) {
      if (severityCount[newSeverity] > 0) {
        const filtered = tableData.filter((row) => row[2] === newSeverity);
        setFilteredData(filtered);
      } else {
        setFilteredData([]);
      }
    } else {
      setFilteredData(tableData);
    }

    console.log(filteredData);
  };

  const tableHead = ["Host Name", "Problems", "Time"];

  const severityColors = {
    Disaster: "#E57373",
    High: "#FF8A65",
    Average: "#FFB74D",
    Warning: "#FFF176",
    Info: "#90CAF9",
    "N/A": "#D3D3D3",
  };

  const selectedSeverityColors = {
    Disaster: "#B71C1C",
    High: "#D84315",
    Average: "#F57C00",
    Warning: "#FBC02D",
    Info: "#1976D2",
    "N/A": "#757575",
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#f8f9fa" }}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}>
        <ScrollView contentContainerStyle={styles.container}>
          <View style={styles.header}>
            <TouchableOpacity
              onPress={() => router.push("/dashboard")}
              style={styles.iconButton}>
              <Ionicons name="arrow-back" size={24} color="black" />
            </TouchableOpacity>
            <View style={styles.headerTextContainer}>
              <Text style={styles.headerText}>
                Problems for Group:
                <Text style={styles.groupName}> {groupName}</Text>
              </Text>
            </View>
            <TouchableOpacity onPress={fetchData} style={styles.iconButton}>
              <Ionicons name="refresh" size={24} color="black" />
            </TouchableOpacity>
          </View>
          <View style={styles.content}>
            <View style={styles.hugeRectangle}>
              {Object.entries(severityCount).map(([severity, count]) => (
                <TouchableOpacity
                  key={severity}
                  onPress={() => handleSeveritySelection(severity)}
                  style={[
                    styles.box,
                    {
                      backgroundColor:
                        selectedSeverity === severity
                          ? selectedSeverityColors[severity]
                          : severityColors[severity],
                    },
                  ]}>
                  <Text style={styles.boxNumber}>{count}</Text>
                  <Text style={styles.boxText}>{severity}</Text>
                </TouchableOpacity>
              ))}
            </View>
            {filteredData.length === 0 ? (
              <ActivityIndicator size="large" color="#007BFF" />
            ) : (
              <View style={styles.tableContainer}>
                <View style={styles.tableRow}>
                  {tableHead.map((header, index) => (
                    <Text
                      key={index}
                      style={[
                        styles.tableHeader,
                        index === 0 && styles.tableHeaderHost,
                        index !== 0 && styles.tableHeaderSmall,
                      ]}>
                      {header}
                    </Text>
                  ))}
                </View>
                {filteredData.map((rowData, rowIndex) => (
                  <TouchableOpacity
                    key={rowIndex}
                    style={styles.tableRow}
                    onPress={() =>
                      navigateToHostDetails(
                        rowData[0],
                        rowData[1],
                        rowData[2],
                        rowData[3],
                        groupId,
                        groupName
                      )
                    }>
                    {rowData
                      .filter((_, index) => index !== 2) // Removing the severity column
                      .map((cellData, cellIndex) => (
                        <Text
                          key={cellIndex}
                          style={[
                            styles.tableCell,
                            cellIndex === 0 && styles.tableCellHost,
                            cellIndex !== 0 && styles.tableCellSmall,
                            cellIndex === 1 && {
                              backgroundColor: severityColors[rowData[2]],
                            },
                          ]}
                          numberOfLines={0} // Allow unlimited lines
                        >
                          {cellData}
                        </Text>
                      ))}
                  </TouchableOpacity>
                ))}
              </View>
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
    paddingHorizontal: 8,
  },
  iconButton: {
    padding: 10,
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
    justifyContent: "space-between",
  },
  headerTextContainer: {
    flex: 1,
    alignItems: "center",
  },
  headerText: {
    fontSize: 16,
    color: "#333",
    fontWeight: "bold",
    textAlign: "center",
  },
  groupName: {
    fontWeight: "normal",
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
    borderBottomWidth: 1,
    borderColor: "#ddd",
  },
  tableHeader: {
    fontWeight: "bold",
    textAlign: "center",
    padding: 5,
    fontSize: 16,
    color: "#333",
  },
  tableHeaderHost: {
    flex: 2.5,
    textAlign: "left",
  },
  tableHeaderSmall: {
    flex: 1.5,
  },
  tableCell: {
    textAlign: "center",
    paddingVertical: 5,
    paddingHorizontal: 2,
    fontSize: 15,
    color: "#333",
    flexWrap: "wrap",
  },
  tableCellHost: {
    flex: 2.5,
    textAlign: "left",
  },
  tableCellSmall: {
    flex: 1.5,
  },
});

export default GroupProblemsScreen;
