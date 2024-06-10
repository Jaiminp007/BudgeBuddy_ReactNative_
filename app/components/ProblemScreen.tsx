import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  ScrollView,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { fetchDataHostProblems, authService } from "../services/apiHost";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

const ProblemScreen = () => {
  const router = useRouter();
  const [authToken, setAuthToken] = useState<string | null>(null);
  const [tableData, setTableData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [severityCount, setSeverityCount] = useState({
    Disaster: 0,
    High: 0,
    Average: 0,
    Warning: 0,
    Info: 0,
    "N/A": 0,
  });

  const navigateToHostDetails = (hostName, problemName, severity, duration, hostID) => {
    router.push({
      pathname: "/hostDetailScreen",
      params: {
        hostName,
        problemName,
        severity,
        duration,
        hostID,
      },
    });
  };

  const fetchData = async (token) => {
    const data = await fetchDataHostProblems(token);
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
      const token = await authService.login();
      setAuthToken(token);
      await fetchData(token);
    };

    initialize();

    const intervalId = setInterval(() => {
      if (authToken) {
        fetchData(authToken);
      }
    }, 30000); // Fetch data every 30 seconds

    return () => clearInterval(intervalId);
  }, [authToken]);

  const handleSearch = (text) => {
    setSearchQuery(text);
    const filteredData = tableData.filter(row => row[0].toLowerCase().includes(text.toLowerCase()));
    setFilteredData(filteredData);
  };

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
      <View style={styles.header}>
        <Text style={styles.headerText}>Server Name</Text>
        <Text style={styles.headerText}>Server URL</Text>
        <TouchableOpacity onPress={() => fetchData(authToken)} style={styles.refreshButton}>
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
          {filteredData.map((rowData, rowIndex) => (
            <TouchableOpacity key={rowIndex} onPress={() => navigateToHostDetails(rowData[0], rowData[1], rowData[2], rowData[3], rowData[4])}>
              <View key={rowIndex} style={styles.tableRow}>
                {rowData
                  .filter((_, index) => index !== 2 && index !== 4) // Filtering out the "Severity" column and hostID
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
            </TouchableOpacity>
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
  searchContainer: {
    padding: 10,
  },
  searchInput: {
    backgroundColor: "#fff",
    padding: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#ccc",
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

export default ProblemScreen;
