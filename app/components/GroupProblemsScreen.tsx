import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, ScrollView, Dimensions } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { fetchGroupProblemDetails, authService } from "../services/apiHost";

const GroupProblemsScreen = () => {
  const [authToken, setAuthToken] = useState<string | null>(null);
  const [tableData, setTableData] = useState([]);
  const { groupId, groupName } = useLocalSearchParams();

  const fetchData = async (token) => {
    console.log("Detail Screen");
    const data = await fetchGroupProblemDetails(token, groupId);
    const transformedData = data.map((event) => [
      event.hosts[0]?.host || "Unknown Host",
      event.name,
      mapSeverity(event.severity),
      event.duration,
    ]);
    setTableData(transformedData);
    console.log(transformedData);
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
      const token = await authService.login();
      setAuthToken(token);
      await fetchData(token);
    };

    initialize();
  }, []);

  const tableHead = ["Host Name", "Problems", "Time"];

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
      <Text style={styles.header}>Problems for Group {groupName}</Text>
      <View style={styles.content}>
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
    fontSize: 15,
  },
  tableHeaderHost: {
    flex: 2, // Host group column size
    textAlign: "left",
  },
  tableCell: {
    flex: 1,
    textAlign: "center",
    padding: 5,
    fontSize: 15,
    width:5,
  },
  tableCellHost: {
    flex: 2, // Host group column size
    textAlign: "left",
  },
});

export default GroupProblemsScreen;
