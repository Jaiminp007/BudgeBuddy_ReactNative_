// // import React, { useEffect, useState } from "react";
// // import { View, Text, StyleSheet, Dimensions, ScrollView } from "react-native";
// // import { useLocalSearchParams } from "expo-router";
// // import { fetchData } from "../services/apiHost";

// // const DashboardScreen = () => {
// //   const {
// //     serverName,
// //     serverHost,
// //     username,
// //     password,
// //     httpUser,
// //     httpPassword,
// //     rememberMe,
// //     useHttpAuth,
// //   } = useLocalSearchParams();

// //   const [tableData, setTableData] = useState([]);

// //   const [severityCount, setSeverityCount] = useState({
// //     Disaster: 0,
// //     High: 0,
// //     Average: 0,
// //     Warning: 0,
// //     Info: 0,
// //     "N/A": 0,
// //   });

// //   useEffect(() => {
// //     console.log("Server Name:", serverName);
// //     console.log("Server Host:", serverHost);
// //     console.log("Username:", username);
// //     console.log("Password:", password);
// //     console.log("HTTP Username:", httpUser);
// //     console.log("HTTP Password:", httpPassword);
// //     console.log("Remember Me:", rememberMe);
// //     console.log("Use HTTP Authentication:", useHttpAuth);

// //     // Fetch data from the API
// //     fetchData()
// //       .then((data) => {
// //         setTableData(data);
// //         const counts = {
// //           Disaster: 0,
// //           High: 0,
// //           Average: 0,
// //           Warning: 0,
// //           Info: 0,
// //           "N/A": 0,
// //         };
// //         data.forEach((row) => {
// //           const severity = row[2];
// //           if (counts.hasOwnProperty(severity)) {
// //             counts[severity]++;
// //           }
// //         });
// //         setSeverityCount(counts);
// //       })
// //       .catch((error) => {
// //         console.error("Error fetching data:", error);
// //       });
// //   }, [
// //     serverName,
// //     serverHost,
// //     username,
// //     password,
// //     httpUser,
// //     httpPassword,
// //     rememberMe,
// //     useHttpAuth,
// //   ]);

// //   const tableHead = ["Host group", "With problems", "Severity", "Total"];

// //   // Define which columns to display (index-based)
// //   const displayColumns = [0, 1, 3]; // Display "Host group", "With problems", and "Total"

// //   const severityColors = {
// //     Disaster: "#FF8C50", // Lighter Red
// //     High: "#FF7F7F", // Lighter Dark Orange
// //     Average: "#FFB84D", // Lighter Orange
// //     Warning: "#FFD966", // Lighter Gold
// //     Info: "#ADD8E6", // Lighter Light Blue
// //     "N/A": "#D3D3D3", // Light Grey (unchanged)
// //   };

// //   // Iterate through the tableData to count each severity
// //   tableData.forEach((row) => {
// //     const severity = row[2];
// //     if (severityCount.hasOwnProperty(severity)) {
// //       severityCount[severity]++;
// //     }
// //   });

// //   return (
// //     <ScrollView style={styles.container}>
// //       <View style={styles.header}>
// //         <Text style={styles.headerText}>Server Name: {serverName}</Text>
// //         <Text style={styles.headerText}>Server URL: {serverHost}</Text>
// //       </View>
// //       <View style={styles.content}>
// //         <View style={styles.hugeRectangle}>
// //           <View style={[styles.box, { backgroundColor: "#FF4500" }]}>
// //             <Text style={styles.boxNumber}>{severityCount.Disaster}</Text>
// //             <Text style={styles.boxText}>Disaster</Text>
// //           </View>
// //           <View style={[styles.box, { backgroundColor: "#FF6347" }]}>
// //             <Text style={styles.boxNumber}>{severityCount.High}</Text>
// //             <Text style={styles.boxText}>High</Text>
// //           </View>
// //           <View style={[styles.box, { backgroundColor: "#FFA500" }]}>
// //             <Text style={styles.boxNumber}>{severityCount.Average}</Text>
// //             <Text style={styles.boxText}>Average</Text>
// //           </View>
// //           <View style={[styles.box, { backgroundColor: "#FFD700" }]}>
// //             <Text style={styles.boxNumber}>{severityCount.Warning}</Text>
// //             <Text style={styles.boxText}>Warning</Text>
// //           </View>
// //           <View style={[styles.box, { backgroundColor: "#87CEFA" }]}>
// //             <Text style={styles.boxNumber}>{severityCount.Info}</Text>
// //             <Text style={styles.boxText}>Info</Text>
// //           </View>
// //           <View style={[styles.box, { backgroundColor: "#D3D3D3" }]}>
// //             <Text style={styles.boxNumber}>{severityCount["N/A"]}</Text>
// //             <Text style={styles.boxText}>N/A</Text>
// //           </View>
// //         </View>
// //         <View style={styles.tableContainer}>
// //           <View style={styles.tableRow}>
// //             {displayColumns.map((colIndex) => (
// //               <Text
// //                 key={colIndex}
// //                 style={[
// //                   styles.tableHeader,
// //                   colIndex === 0 && styles.tableHeaderHost,
// //                 ]}>
// //                 {tableHead[colIndex]}
// //               </Text>
// //             ))}
// //           </View>
// //           {tableData.map((rowData, rowIndex) => (
// //             <View key={rowIndex} style={styles.tableRow}>
// //               {displayColumns.map((colIndex) => {
// //                 const cellData = rowData[colIndex];
// //                 const severity = rowData[2];
// //                 const backgroundColor =
// //                   colIndex === 1 ? severityColors[severity] : "transparent";
// //                 return (
// //                   <Text
// //                     key={colIndex}
// //                     style={[
// //                       styles.tableCell,
// //                       colIndex === 0 && styles.tableCellHost,
// //                       { backgroundColor },
// //                     ]}>
// //                     {cellData}
// //                   </Text>
// //                 );
// //               })}
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
// //     padding: 10,
// //     backgroundColor: "#ddd",
// //     borderBottomWidth: 1,
// //     borderBottomColor: "#bbb",
// //   },
// //   headerText: {
// //     fontSize: 14,
// //     color: "#333",
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
// //     fontSize: 12,
// //   },
// //   tableHeaderHost: {
// //     flex: 2, // Host group column size
// //     textAlign: "left",
// //   },
// //   tableCell: {
// //     flex: 1,
// //     textAlign: "center",
// //     padding: 5,
// //     fontSize: 12,
// //   },
// //   tableCellHost: {
// //     flex: 2, // Host group column size
// //     textAlign: "left",
// //   },
// // });

// // export default DashboardScreen;
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { fetchDataHostProblems } from "../services/apiHost";
import { Ionicons } from "@expo/vector-icons";

const DashboardScreen = () => {
  const [tableData, setTableData] = useState([]);
  const [severityCount, setSeverityCount] = useState({
    Disaster: 0,
    High: 0,
    Average: 0,
    Warning: 0,
    Info: 0,
    "N/A": 0,
  });

  const fetchData = async () => {
    const data = await fetchDataHostProblems();
    setTableData(data);

    const counts = {
      Disaster: 0,
      High: 0,
      Average: 0,
      Warning: 0,
      Info: 0,
      "N/A": 0,
    };

    data.forEach((row) => {
      counts[row[2]]++;
    });

    setSeverityCount(counts);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const tableHead = ["Host group", "With problems", "Severity", "Total"];

  const severityColors = {
    Disaster: "#FF8C50", // Lighter Red
    High: "#FF7F7F", // Lighter Dark Orange
    Average: "#FFB84D", // Lighter Orange
    Warning: "#FFD966", // Lighter Gold
    Info: "#ADD8E6", // Lighter Light Blue
    "N/A": "#D3D3D3", // Light Grey (unchanged)
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Server Name</Text>
        <Text style={styles.headerText}>Server URL</Text>
        <TouchableOpacity onPress={fetchData} style={styles.refreshButton}>
          <Ionicons name="refresh" size={24} color="black" />
        </TouchableOpacity>
      </View>
      <View style={styles.content}>
        <View style={styles.hugeRectangle}>
          <View style={[styles.box, { backgroundColor: "#E57373" }]}>
            <Text style={styles.boxNumber}>{severityCount.Disaster}</Text>
            <Text style={styles.boxText}>Disaster</Text>
          </View>
          <View style={[styles.box, { backgroundColor: "#FF8A65" }]}>
            <Text style={styles.boxNumber}>{severityCount.High}</Text>
            <Text style={styles.boxText}>High</Text>
          </View>
          <View style={[styles.box, { backgroundColor: "#FFB74D" }]}>
            <Text style={styles.boxNumber}>{severityCount.Average}</Text>
            <Text style={styles.boxText}>Average</Text>
          </View>
          <View style={[styles.box, { backgroundColor: "#FFF176" }]}>
            <Text style={styles.boxNumber}>{severityCount.Warning}</Text>
            <Text style={styles.boxText}>Warning</Text>
          </View>
          <View style={[styles.box, { backgroundColor: "#90CAF9" }]}>
            <Text style={styles.boxNumber}>{severityCount.Info}</Text>
            <Text style={styles.boxText}>Info</Text>
          </View>
          <View style={[styles.box, { backgroundColor: "#D3D3D3" }]}>
            <Text style={styles.boxNumber}>{severityCount["N/A"]}</Text>
            <Text style={styles.boxText}>N/A</Text>
          </View>
        </View>
        <View style={styles.tableContainer}>
          <View style={styles.tableRow}>
            {tableHead.map((header, index) => (
              <Text
                key={index}
                style={[
                  styles.tableHeader,
                  index === 0 && styles.tableHeaderHost,
                ]}>
                {header}
              </Text>
            ))}
          </View>
          {tableData.map((rowData, rowIndex) => (
            <View key={rowIndex} style={styles.tableRow}>
              {rowData
                .filter((_, index) => index !== 2) // Filtering out the "Severity" column
                .map((cellData, cellIndex) => (
                  <Text
                    key={cellIndex}
                    style={[
                      styles.tableCell,
                      cellIndex === 0 && styles.tableCellHost,
                      cellIndex === 1 && {
                        backgroundColor: severityColors[rowData[2]],
                      }, // Color the "With problems" column
                    ]}>
                    {cellData}
                  </Text>
                ))}
            </View>
          ))}
        </View>
      </View>
    </ScrollView>
  );
};

const { width } = Dimensions.get("window");
const boxFontSize = width / 35;
const numberFontSize = width / 25;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f0f4f7",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    backgroundColor: "#ddd",
    borderBottomWidth: 1,
    borderBottomColor: "#bbb",
  },
  headerText: {
    fontSize: 14,
    color: "#333",
    marginLeft: 10,
  },
  refreshButton: {
    marginLeft: "auto",
  },
  content: {
    flex: 1,
    padding: 16,
  },
  hugeRectangle: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  box: {
    flex: 1,
    height: 80,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
    marginHorizontal: 1, // Ensure small gap between boxes
    padding: 2,
  },
  boxText: {
    fontSize: boxFontSize,
    fontWeight: "bold",
    color: "#000", // Black font color
    textAlign: "center",
  },
  boxNumber: {
    fontSize: numberFontSize,
    fontWeight: "bold",
    color: "#000", // Black font color
    textAlign: "center",
  },
  tableContainer: {
    marginTop: 20,
  },
  tableRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 5,
    borderBottomWidth: 1,
    borderColor: "#C1C0B9",
  },
  tableHeaderRow: {
    backgroundColor: "#f1f8ff",
  },
  tableHeader: {
    flex: 1,
    fontWeight: "bold",
    textAlign: "center",
    padding: 5,
    fontSize: 12,
  },
  tableHeaderHost: {
    flex: 2, // Host group column size
    textAlign: "left",
  },
  tableCell: {
    flex: 1,
    textAlign: "center",
    padding: 5,
    fontSize: 12,
  },
  tableCellHost: {
    flex: 2, // Host group column size
    textAlign: "left",
  },
});

export default DashboardScreen;

// import React, { useEffect, useState } from "react";
// import {
//   View,
//   Text,
//   StyleSheet,
//   Dimensions,
//   ScrollView,
//   TouchableOpacity,
//   FlatList,
//   ActivityIndicator,
// } from "react-native";
// import { useLocalSearchParams } from "expo-router";
// import { fetchDataHostProblems } from "../services/apiHost";
// import { Ionicons } from "@expo/vector-icons";

// const DashboardScreen = () => {
//   const {
//     serverName,
//     serverHost,
//     username,
//     password,
//     httpUser,
//     httpPassword,
//     rememberMe,
//     useHttpAuth,
//   } = useLocalSearchParams();

//   const [tableData, setTableData] = useState([]);
//   const [severityCount, setSeverityCount] = useState({
//     Disaster: 0,
//     High: 0,
//     Average: 0,
//     Warning: 0,
//     Info: 0,
//     "N/A": 0,
//   });
//   const [loading, setLoading] = useState(false);
//   const [offset, setOffset] = useState(0);
//   const limit = 20; // Number of hosts to fetch per batch

//   const fetchAndSetData = async (reset = false) => {
//     try {
//       setLoading(true);
//       const data = await fetchDataHostProblems(limit, offset);
//       if (reset) {
//         setTableData(data);
//       } else {
//         setTableData((prevData) => [...prevData, ...data]);
//       }

//       const counts = {
//         Disaster: 0,
//         High: 0,
//         Average: 0,
//         Warning: 0,
//         Info: 0,
//         "N/A": 0,
//       };
//       data.forEach((row) => {
//         Object.entries(row.severityCounts).forEach(([severity, count]) => {
//           if (counts.hasOwnProperty(severity)) {
//             counts[severity] += count;
//           }
//         });
//       });
//       setSeverityCount(counts);
//       setOffset((prevOffset) => prevOffset + limit);
//     } catch (error) {
//       console.error("Error fetching data:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     console.log("Server Name:", serverName);
//     console.log("Server Host:", serverHost);
//     console.log("Username:", username);
//     console.log("Password:", password);
//     console.log("HTTP Username:", httpUser);
//     console.log("HTTP Password:", httpPassword);
//     console.log("Remember Me:", rememberMe);
//     console.log("Use HTTP Authentication:", useHttpAuth);

//     fetchAndSetData(true);

//     // Timer
//     const intervalId = setInterval(() => fetchAndSetData(true), 5 * 60 * 1000); // Fetch data every 5 minutes

//     return () => clearInterval(intervalId); // Cleanup interval on component unmount
//   }, [
//     serverName,
//     serverHost,
//     username,
//     password,
//     httpUser,
//     httpPassword,
//     rememberMe,
//     useHttpAuth,
//   ]);

//   const tableHead = ["Host group", "With problems", "Severity", "Total"];

//   // Define which columns to display (index-based)
//   const displayColumns = [0, 1, 3]; // Display "Host group", "With problems", and "Total"

//   const severityColors = {
//     Disaster: "#FF8C50", // Lighter Red
//     High: "#FF7F7F", // Lighter Dark Orange
//     Average: "#FFB84D", // Lighter Orange
//     Warning: "#FFD966", // Lighter Gold
//     Info: "#ADD8E6", // Lighter Light Blue
//     "N/A": "#D3D3D3", // Light Grey (unchanged)
//   };

//   const renderTableRow = ({ item: rowData }) => {
//     return (
//       <View style={styles.tableRow}>
//         {displayColumns.map((colIndex) => {
//           const cellData = rowData[colIndex];
//           const severity = rowData[2];
//           const backgroundColor =
//             colIndex === 1 ? severityColors[severity] : "transparent";
//           return (
//             <Text
//               key={colIndex}
//               style={[
//                 styles.tableCell,
//                 colIndex === 0 && styles.tableCellHost,
//                 { backgroundColor },
//               ]}>
//               {cellData}
//             </Text>
//           );
//         })}
//       </View>
//     );
//   };

//   return (
//     <ScrollView style={styles.container}>
//       <View style={styles.header}>
//         <Text style={styles.headerText}>Server Name: {serverName}</Text>
//         <Text style={styles.headerText}>Server URL: {serverHost}</Text>
//         <TouchableOpacity
//           onPress={() => fetchAndSetData(true)}
//           style={styles.refreshButton}>
//           <Ionicons name="refresh" size={24} color="black" />
//         </TouchableOpacity>
//       </View>
//       <View style={styles.content}>
//         <View style={styles.hugeRectangle}>
//           {Object.keys(severityColors).map((severity) => (
//             <View
//               key={severity}
//               style={[
//                 styles.box,
//                 { backgroundColor: severityColors[severity] },
//               ]}>
//               <Text style={styles.boxNumber}>{severityCount[severity]}</Text>
//               <Text style={styles.boxText}>{severity}</Text>
//             </View>
//           ))}
//         </View>
//         <View style={styles.tableContainer}>
//           <View style={styles.tableRow}>
//             {displayColumns.map((colIndex) => (
//               <Text
//                 key={colIndex}
//                 style={[
//                   styles.tableHeader,
//                   colIndex === 0 && styles.tableHeaderHost,
//                 ]}>
//                 {tableHead[colIndex]}
//               </Text>
//             ))}
//           </View>
//           <FlatList
//             data={tableData}
//             renderItem={renderTableRow}
//             keyExtractor={(item, index) => index.toString()}
//             onEndReached={() => fetchAndSetData()}
//             onEndReachedThreshold={0.5}
//             ListFooterComponent={loading && <ActivityIndicator />}
//           />
//         </View>
//       </View>
//     </ScrollView>
//   );
// };

// const { width } = Dimensions.get("window");
// const boxFontSize = width / 35;
// const numberFontSize = width / 25;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#f0f4f7",
//   },
//   header: {
//     flexDirection: "row",
//     alignItems: "center",
//     padding: 10,
//     backgroundColor: "#ddd",
//     borderBottomWidth: 1,
//     borderBottomColor: "#bbb",
//   },
//   headerText: {
//     fontSize: 14,
//     color: "#333",
//     marginRight: 10,
//   },
//   refreshButton: {
//     marginLeft: "auto",
//   },
//   content: {
//     flex: 1,
//     padding: 16,
//   },
//   hugeRectangle: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "center",
//     marginBottom: 20,
//   },
//   box: {
//     flex: 1,
//     height: 80,
//     justifyContent: "center",
//     alignItems: "center",
//     borderRadius: 8,
//     marginHorizontal: 1, // Ensure small gap between boxes
//     padding: 2,
//   },
//   boxText: {
//     fontSize: boxFontSize,
//     fontWeight: "bold",
//     color: "#000", // Black font color
//     textAlign: "center",
//   },
//   boxNumber: {
//     fontSize: numberFontSize,
//     fontWeight: "bold",
//     color: "#000", // Black font color
//     textAlign: "center",
//   },
//   tableContainer: {
//     marginTop: 20,
//   },
//   tableRow: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     paddingVertical: 5,
//     borderBottomWidth: 1,
//     borderColor: "#C1C0B9",
//   },
//   tableHeaderRow: {
//     backgroundColor: "#f1f8ff",
//   },
//   tableHeader: {
//     flex: 1,
//     fontWeight: "bold",
//     textAlign: "center",
//     padding: 5,
//     fontSize: 12,
//   },
//   tableHeaderHost: {
//     flex: 2, // Host group column size
//     textAlign: "left",
//   },
//   tableCell: {
//     flex: 1,
//     textAlign: "center",
//     padding: 5,
//     fontSize: 12,
//   },
//   tableCellHost: {
//     flex: 2, // Host group column size
//     textAlign: "left",
//   },
// });

// export default DashboardScreen;
