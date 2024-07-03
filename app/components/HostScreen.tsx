// import React, { useEffect, useState } from "react";
// import {
//   View,
//   Text,
//   StyleSheet,
//   Dimensions,
//   ScrollView,
//   TouchableOpacity,
//   TextInput,
//   SafeAreaView,
//   KeyboardAvoidingView,
//   Platform,
//   ActivityIndicator,
// } from "react-native";
// import { fetchHostInterface } from "../services/apiHost";
// import { Ionicons } from "@expo/vector-icons";
// import { useRouter } from "expo-router";

// const HostScreen = () => {
//   const router = useRouter();
//   const [tableData, setTableData] = useState([]);
//   const [filteredData, setFilteredData] = useState([]);
//   const [searchQuery, setSearchQuery] = useState("");

//   const navigateToHostDetails = (hostID, hostName, hostIP, hostDNS) => {
//     router.push({
//       pathname: "/hostDetail",
//       params: {
//         hostID,
//         hostName,
//         hostIP,
//         hostDNS,
//       },
//     });
//   };

//   const fetchData = async () => {
//     const data = await fetchHostInterface();
//     console.log("interface", data);

//     const transformedData = data.map((event) => [
//       event.hosts[0]?.hostid || "Unknown ID",
//       event.hosts[0]?.host || "Unknown Host",
//       event.ip,
//       event.dns || "N/A",

//       // event.dns === "Unknown DNS" ? "N/A" : event.dns,
//     ]);
//     setTableData(transformedData);
//     setFilteredData(transformedData);
//   };

//   useEffect(() => {
//     const initialize = async () => {
//       await fetchData();
//     };

//     initialize();
//   }, []);

//   const handleSearch = (text) => {
//     setSearchQuery(text);
//     const filteredData = tableData.filter((row) =>
//       row[1].toLowerCase().includes(text.toLowerCase())
//     );
//     setFilteredData(filteredData);
//   };

//   const tableHead = ["Host Name", "Host IP", "Host DNS"];

//   return (
//     <SafeAreaView style={{ flex: 1, backgroundColor: "#f8f9fa" }}>
//       <KeyboardAvoidingView
//         style={{ flex: 1 }}
//         behavior={Platform.OS === "ios" ? "padding" : "height"}
//       >
//         <ScrollView style={styles.container}>
//           <View style={styles.header}>
//             <TextInput
//               style={styles.searchInput}
//               placeholder="Search Host Name..."
//               value={searchQuery}
//               onChangeText={handleSearch}
//             />
//             <TouchableOpacity onPress={fetchData} style={styles.refreshButton}>
//               <Ionicons name="refresh" size={24} color="black" />
//             </TouchableOpacity>
//           </View>

//           <View style={styles.content}>
//             {filteredData.length === 0 ? (
//               <ActivityIndicator size="large" color="#007BFF" />
//             ) : (
//               <View style={styles.tableContainer}>
//                 <View style={styles.tableRow}>
//                   {tableHead.map((header, index) => (
//                     <Text key={index} style={styles.tableHeader}>
//                       {header}
//                     </Text>
//                   ))}
//                 </View>
//                 {filteredData.map((rowData, rowIndex) => (
//                   <TouchableOpacity
//                     key={rowIndex}
//                     onPress={() =>
//                       navigateToHostDetails(rowData[0], rowData[1], rowData[2], rowData[3])
//                     }
//                   >
//                     <View key={rowIndex} style={styles.tableRow}>
//                       {rowData
//                       .filter((_, index) => index !==0)
//                       .map((cellData, cellIndex) => (
//                         <Text key={cellIndex} style={styles.tableCell}>
//                           {cellData}
//                         </Text>
//                       ))}
//                     </View>
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

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#f8f9fa",
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
//     padding: 10,
//   },
//   searchInput: {
//     marginLeft: "2%",
//     backgroundColor: "#fff",
//     padding: 10,
//     borderRadius: 8,
//     borderWidth: 1,
//     borderColor: "#ccc",
//     width: "85%",
//   },
//   content: {
//     flex: 1,
//     padding: 16,
//   },
//   tableContainer: {
//     marginTop: 20,
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
//   tableCell: {
//     flex: 1,
//     textAlign: "center",
//     paddingVertical: 5,
//     paddingHorizontal: 2,
//     fontSize: 15,
//     color: "#333",
//     flexWrap: "wrap",
//     width: Dimensions.get('window').width / 4, // Set width dynamically based on screen size
//   },
// });

// export default HostScreen;

import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  ScrollView,
  TouchableOpacity,
  TextInput,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
} from "react-native";
import { fetchHostInterface } from "../services/apiHost";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

const HostScreen = () => {
  const router = useRouter();
  const [tableData, setTableData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  const navigateToHostDetails = (hostID, hostName, hostIP, hostDNS) => {
    router.push({
      pathname: "/hostDetail",
      params: {
        hostID,
        hostName,
        hostIP,
        hostDNS,
      },
    });
  };

  const fetchData = async () => {
    const data = await fetchHostInterface();
    console.log("interface", data);

    const transformedData = data.map((event) => [
      event.hosts[0]?.hostid || "Unknown ID",
      event.hosts[0]?.host || "Unknown Host",
      event.ip,
      event.dns || "N/A",
      event.status,
    ]);
    setTableData(transformedData);
    setFilteredData(transformedData);
  };

  useEffect(() => {
    const initialize = async () => {
      await fetchData();
    };

    initialize();
  }, []);

  const handleSearch = (text) => {
    setSearchQuery(text);
    const filteredData = tableData.filter((row) =>
      row[1].toLowerCase().includes(text.toLowerCase())
    );
    setFilteredData(filteredData);
  };

  const tableHead = ["Host Name", "Host IP", "Host DNS"];

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#f8f9fa" }}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}>
        <ScrollView style={styles.container}>
          <View style={styles.header}>
            <TextInput
              style={styles.searchInput}
              placeholder="Search Host Name..."
              value={searchQuery}
              onChangeText={handleSearch}
            />
            <TouchableOpacity onPress={fetchData} style={styles.refreshButton}>
              <Ionicons name="refresh" size={24} color="black" />
            </TouchableOpacity>
          </View>

          <View style={styles.content}>
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
                    onPress={() =>
                      navigateToHostDetails(
                        rowData[0],
                        rowData[1],
                        rowData[2],
                        rowData[3]
                      )
                    }>
                    <View key={rowIndex} style={styles.tableRow}>
                      {rowData
                        .filter((_, index) => index !== 0) // Filtering out the "Host ID" column
                        .map((cellData, cellIndex) => (
                          <Text
                            key={cellIndex}
                            style={[
                              styles.tableCell,
                              cellIndex === 0 && styles.tableCellHost,
                              cellIndex !== 0 && styles.tableCellSmall,
                            ]}>
                            {cellData}
                          </Text>
                        ))}
                    </View>
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
    flex: 1,
    backgroundColor: "#f8f9fa",
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
    fontSize: 14,
    color: "#333",
    marginLeft: 10,
  },
  refreshButton: {
    marginLeft: "auto",
  },
  searchContainer: {
    padding: 10,
  },
  searchInput: {
    marginLeft: "2%",
    backgroundColor: "#fff",
    padding: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#ccc",
    width: "85%",
  },
  content: {
    flex: 1,
    padding: 16,
  },
  tableContainer: {
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
    maxWidth: "100%",
    justifyContent: "center",
    alignItems: "center",
    width: 2,
  },
  tableCellHost: {
    flex: 2.5,
    textAlign: "left",
    flexWrap: "wrap",
    maxWidth: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  tableCellSmall: {
    flex: 1.5,
    maxWidth: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
});

export default HostScreen;
