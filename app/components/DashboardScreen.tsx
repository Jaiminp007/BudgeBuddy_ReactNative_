import React, { useEffect } from "react";
import { View, Text, StyleSheet, Dimensions, ScrollView } from "react-native";
import { useLocalSearchParams } from "expo-router";

const DashboardScreen = () => {
  const {
    serverName,
    serverHost,
    username,
    password,
    httpUser,
    httpPassword,
    rememberMe,
    useHttpAuth,
  } = useLocalSearchParams();

  useEffect(() => {
    console.log("Server Name:", serverName);
    console.log("Server Host:", serverHost);
    console.log("Username:", username);
    console.log("Password:", password);
    console.log("HTTP Username:", httpUser);
    console.log("HTTP Password:", httpPassword);
    console.log("Remember Me:", rememberMe);
    console.log("Use HTTP Authentication:", useHttpAuth);
  }, [
    serverName,
    serverHost,
    username,
    password,
    httpUser,
    httpPassword,
    rememberMe,
    useHttpAuth,
  ]);

  const tableHead = ["Host group", "With problems", "Total"];
  const tableData = [
    ["ACCUTE", "1", "13"],
    ["AIRTEL", "24", "57"],
    ["Airtel_Pushpak NLD Links", "3", "27"],
    ["Asopalav Links", "4", "27"],
    ["Bhavnagar District Co-Operative Bank Limited (BDCI)", "1", "245"],
    ["Cargo Ford", "5", "23"],
    ["Kadi Nagrik Sahkari Bank (KNSB)", "13", "47"],
    ["KDCC", "13", "230"],
    ["MUCB", "16", "105"],
    ["QAPL", "3", "75"],
    ["SIFY", "24", "114"],
    ["SIPL - POP Backup RF", "3", "37"],
    ["SIPL Core Fiber POP", "3", "19"],
    ["SIPL POP", "12", "142"],
    ["SIPL POP N/W SWITCH & OLT", "5", "39"],
    ["SIPL POP RAW POWER", "1", "9"],
    ["TCL", "28", "224"],
    ["The Banaskantha Mercantile Co-Operative Bank Ltd", "10", "13"],
    ["The Bhagvoday Co-Op Bank", "11", "34"],
    ["The Kalol Nagrik Sahkari Bank Ltd.", "4", "28"],
    ["TIKONA", "11", "83"],
    ["TRP Mall Bopal", "1", "8"],
    ["TTSL", "15", "216"],
    ["TTSL DLC_Mondeal Heights And Popular Plaza", "1", "18"],
    ["Vijay Co-OP Bank", "13", "24"],
    // Add more rows as needed
  ];

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Server Name: {serverName}</Text>
        <Text style={styles.headerText}>Server URL: {serverHost}</Text>
      </View>
      <View style={styles.content}>
        <View style={styles.hugeRectangle}>
          <View style={[styles.box, { backgroundColor: "#FF6347" }]}>
            <Text style={styles.boxNumber}>123</Text>
            <Text style={styles.boxText}>Disaster</Text>
          </View>
          <View style={[styles.box, { backgroundColor: "#FF4500" }]}>
            <Text style={styles.boxNumber}>456</Text>
            <Text style={styles.boxText}>High</Text>
          </View>
          <View style={[styles.box, { backgroundColor: "#FFA500" }]}>
            <Text style={styles.boxNumber}>789</Text>
            <Text style={styles.boxText}>Average</Text>
          </View>
          <View style={[styles.box, { backgroundColor: "#FFD700" }]}>
            <Text style={styles.boxNumber}>101</Text>
            <Text style={styles.boxText}>Warning</Text>
          </View>
          <View style={[styles.box, { backgroundColor: "#87CEFA" }]}>
            <Text style={styles.boxNumber}>102</Text>
            <Text style={styles.boxText}>Info</Text>
          </View>
          <View style={[styles.box, { backgroundColor: "#D3D3D3" }]}>
            <Text style={styles.boxNumber}>103</Text>
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
              {rowData.map((cellData, cellIndex) => (
                <Text
                  key={cellIndex}
                  style={[
                    styles.tableCell,
                    cellIndex === 0 && styles.tableCellHost,
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
    padding: 10,
    backgroundColor: "#ddd",
    borderBottomWidth: 1,
    borderBottomColor: "#bbb",
  },
  headerText: {
    fontSize: 14,
    color: "#333",
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
