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
import { fetchDataHostProblems } from "../services/apiHost";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

const HostScreen = () => {
  const router = useRouter();
  const [tableData, setTableData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [severityCount, setSeverityCount] = useState({
    Disaster: 0,
    High: 0,
    Average: 0,
    Warning: 0,
    Info: 0,
    "N/A": 0,
  });
  const [selectedSeverity, setSelectedSeverity] = useState(null);

  const navigateToHostDetails = (
    hostName,
    problemName,
    severity,
    duration,
    hostID
  ) => {
    router.push({
      pathname: "/hostDetail",
      params: {
        hostName,
        problemName,
        severity,
        duration,
        hostID,
      },
    });
  };

  const fetchData = async () => {
    const data = [];
    // const data = await fetchDataHostProblems();
    const transformedData = data.map((event) => [
      event.hosts[0]?.host || "Unknown Host",
      event.name,
      mapSeverity(event.severity),
      event.duration,
      event.hosts[0]?.hostid,
    ]);
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

    transformedData.forEach((row) => {
      counts[row[2]]++;
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
      await fetchData();
    };

    initialize();
  }, []);

  const handleSearch = (text) => {
    setSearchQuery(text);
    const filteredData = tableData.filter((row) =>
      row[0].toLowerCase().includes(text.toLowerCase())
    );
    setFilteredData(filteredData);
  };

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
                    onPress={() =>
                      navigateToHostDetails(
                        rowData[0],
                        rowData[1],
                        rowData[2],
                        rowData[3],
                        rowData[4]
                      )
                    }>
                    <View key={rowIndex} style={styles.tableRow}>
                      {rowData
                        .filter((_, index) => index !== 2 && index !== 4) // Filtering out the "Severity" column and hostID
                        .map((cellData, cellIndex) => (
                          <Text
                            key={cellIndex}
                            style={[
                              styles.tableCell,
                              cellIndex === 0 && styles.tableCellHost,
                              cellIndex !== 0 && styles.tableCellSmall,
                              cellIndex === 1 && {
                                backgroundColor: severityColors[rowData[2]],
                              }, // Color the "With problems" column
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
  hugeRectangle: {
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
    marginTop: 20,
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
    alignItems: "center", // Ensure alignment to the top
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
    justifyContent: "center", // Center vertically
    alignItems: "center", // Center vertically
  },
  tableCellHost: {
    flex: 2.5,
    textAlign: "left",
    flexWrap: "wrap",
    maxWidth: "100%",
    justifyContent: "center", // Center vertically
    alignItems: "center", // Center vertically
  },
  tableCellSmall: {
    flex: 1.5,
    maxWidth: "100%",
    justifyContent: "center", // Center vertically
    alignItems: "center", // Center vertically
  },
});

export default HostScreen;
