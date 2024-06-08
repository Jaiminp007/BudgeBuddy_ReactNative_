import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { fetchHostGroupProblems } from "../services/apiHost";
import { Ionicons } from "@expo/vector-icons";
import { DrawerActions } from '@react-navigation/native';
import { useRouter, useLocalSearchParams } from "expo-router";

const DashboardScreen = ({ navigation }) => {
  const { serverName, serverHost, username, password, httpUser, httpPassword, rememberMe, useHttpAuth } = useLocalSearchParams();
  console.log(serverName, serverHost, username, password, httpUser, httpPassword, rememberMe, useHttpAuth )
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
    const { allProblems, groupProblemCounts } = await fetchHostGroupProblems(username, password);
    const transformedData = Object.entries(groupProblemCounts).map(([groupName, { problemCount, totalHosts }]) => ({
      gname: groupName,
      pcount: problemCount,
      totalHosts: totalHosts,
    }));
    setTableData(transformedData);

    const counts = {
      Disaster: 0,
      High: 0,
      Average: 0,
      Warning: 0,
      Info: 0,
      "N/A": 0,
    };

    Object.values(allProblems).forEach(problem => {
      counts[mapSeverity(problem.severity)]++;
    });

    setSeverityCount(counts);
  };

  useEffect(() => {
    
    fetchData();
    const intervalId = setInterval(() => {
      fetchData();
    }, 30000); // Fetch data every 30 seconds
    return () => clearInterval(intervalId);
  }, []);

  const tableHead = ["Host Name", "Problems", "Total Hosts"];

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
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Host Name</Text>
        <TouchableOpacity onPress={fetchData} style={styles.refreshButton}>
          <Ionicons name="refresh" size={24} color="black" />
        </TouchableOpacity>
        <TouchableOpacity onPress={ProblemSc} style={styles.menuButton}>
          <Ionicons name="menu" size={24} color="black" />
        </TouchableOpacity>
      </View>
      <View style={styles.content}>
        <View style={styles.hugeRectangle}>
          {Object.entries(severityCount).map(([severity, count]) => (
            <View key={severity} style={[styles.box, { backgroundColor: severityColors[severity] }]}>
              <Text style={styles.boxNumber}>{count}</Text>
              <Text style={styles.boxText}>{severity}</Text>
            </View>
          ))}
        </View>
        <View style={styles.tableContainer}>
          <View style={styles.tableRow}>
            {tableHead.map((header, index) => (
              <Text key={index} style={styles.tableHeader}>
                {header}
              </Text>
            ))}
          </View>
          {tableData
            .filter((rowData) => rowData.totalHosts > 0) // Filter out rows where totalHosts is 0
            .map((rowData, rowIndex) => (
              <View key={rowIndex} style={styles.tableRow}>
                <Text style={styles.tableCell}>{rowData.gname}</Text>
                <Text style={styles.tableCell}>{rowData.pcount}</Text>
                <Text style={styles.tableCell}>{rowData.totalHosts}</Text>
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
    marginHorizontal: 1,
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
  },
  tableRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 5,
    borderBottomWidth: 1,
    borderColor: "#C1C0B9",
  },
  tableHeader: {
    flex: 1,
    fontWeight: "bold",
    textAlign: "center",
    padding: 5,
    fontSize: 12,
  },
  tableCell: {
    flex: 1,
    textAlign: "center",
    padding: 5,
    fontSize: 12,
  },
});

export default DashboardScreen;
