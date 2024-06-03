// // // // const fetchData = async () => {
// // // //   try {
// // // //     console.log("test");
// // // //     // Place Holder Values
// // // //     const tableData = [
// // // //       ["NIsarg", "1s", "High", "13"],
// // // //       ["AIRTEL", "24", "Disaster", "57"],
// // // //       ["Airtel_Pushpak NLD Links", "3", "Average", "27"],
// // // //       ["Asopalav Links", "4", "Warning", "27"],
// // // //       [
// // // //         "Bhavnagar District Co-Operative Bank Limited (BDCI)",
// // // //         "1",
// // // //         "Info",
// // // //         "245",
// // // //       ],
// // // //       ["Cargo Ford", "5", "High", "23"],
// // // //       ["Kadi Nagrik Sahkari Bank (KNSB)", "13", "Average", "47"],
// // // //       ["KDCC", "13", "Warning", "230"],
// // // //       ["MUCB", "16", "Info", "105"],
// // // //       ["QAPL", "3", "High", "75"],
// // // //       ["SIFY", "24", "Disaster", "114"],
// // // //       ["SIPL - POP Backup RF", "3", "Average", "37"],
// // // //       ["SIPL Core Fiber POP", "3", "Warning", "19"],
// // // //       ["SIPL POP", "12", "Info", "142"],
// // // //       ["SIPL POP N/W SWITCH & OLT", "5", "High", "39"],
// // // //       ["SIPL POP RAW POWER", "1", "Disaster", "9"],
// // // //       ["TCL", "28", "Warning", "224"],
// // // //       [
// // // //         "The Banaskantha Mercantile Co-Operative Bank Ltd",
// // // //         "10",
// // // //         "Average",
// // // //         "13",
// // // //       ],
// // // //       ["The Bhagvoday Co-Op Bank", "11", "Info", "34"],
// // // //       ["The Kalol Nagrik Sahkari Bank Ltd.", "4", "High", "28"],
// // // //       ["TIKONA", "11", "Warning", "83"],
// // // //       ["TRP Mall Bopal", "1", "N/A", "8"],
// // // //       ["TTSL", "15", "Disaster", "216"],
// // // //       ["TTSL DLC_Mondeal Heights And Popular Plaza", "1", "High", "18"],
// // // //       ["Vijay Co-OP Bank", "13", "Average", "24"],
// // // //     ];

// // // //     // API CALL

// // // //     return tableData;
// // // //   } catch (error) {
// // // //     console.error("Error fetching host data:", error);
// // // //     throw error;
// // // //   }
// // // // };

// // // // export { fetchData };

// // // // import axios from "axios";

// // // // const SERVER_URL = "https://nms.sanghviinfo.com";
// // // // const USERNAME = "snv_monitor";
// // // // const PASSWORD = "v4kUtbTYpeu6#9!a";

// // // // const login = async () => {
// // // //   const payload = {
// // // //     jsonrpc: "2.0",
// // // //     method: "user.login",
// // // //     params: {
// // // //       user: USERNAME,
// // // //       password: PASSWORD,
// // // //     },
// // // //     id: 1,
// // // //   };

// // // //   try {
// // // //     const response = await axios.post(
// // // //       `${SERVER_URL}/zabbix/api_jsonrpc.php`,
// // // //       payload,
// // // //       {
// // // //         headers: { "Content-Type": "application/json-rpc" },
// // // //       }
// // // //     );
// // // //     if (response.data.result) {
// // // //       return response.data.result;
// // // //     } else if (response.data.error) {
// // // //       console.error("Login error:", response.data.error);
// // // //       throw new Error(`Login error: ${response.data.error}`);
// // // //     } else {
// // // //       console.error("Unexpected response:", response.data);
// // // //       throw new Error(`Unexpected response: ${response.data}`);
// // // //     }
// // // //   } catch (error) {
// // // //     console.error("Error during login:", error);
// // // //     throw error;
// // // //   }
// // // // };

// // // // const fetchHosts = async (authToken) => {
// // // //   const payload = {
// // // //     jsonrpc: "2.0",
// // // //     method: "host.get",
// // // //     params: {
// // // //       output: ["hostid", "name"],
// // // //       selectInterfaces: ["interfaceid", "ip"],
// // // //     },
// // // //     auth: authToken,
// // // //     id: 1,
// // // //   };

// // // //   try {
// // // //     const response = await axios.post(
// // // //       `${SERVER_URL}/zabbix/api_jsonrpc.php`,
// // // //       payload,
// // // //       {
// // // //         headers: { "Content-Type": "application/json-rpc" },
// // // //       }
// // // //     );
// // // //     if (response.data.result) {
// // // //       return response.data.result;
// // // //     } else if (response.data.error) {
// // // //       console.error("Error fetching hosts:", response.data.error);
// // // //       throw new Error(`Error fetching hosts: ${response.data.error}`);
// // // //     } else {
// // // //       console.error("Unexpected response:", response.data);
// // // //       throw new Error(`Unexpected response: ${response.data}`);
// // // //     }
// // // //   } catch (error) {
// // // //     console.error("Error fetching hosts:", error);
// // // //     throw error;
// // // //   }
// // // // };

// // // // const fetchDataHostNameHostIP = async () => {
// // // //   try {
// // // //     console.log("Fetching data...");
// // // //     const authToken = await login();
// // // //     const hosts = await fetchHosts(authToken);
// // // //     console.log("Hosts:", hosts);
// // // //     return hosts.map((host) => {
// // // //       const ip =
// // // //         host.interfaces && host.interfaces[0] && host.interfaces[0].ip
// // // //           ? host.interfaces[0].ip
// // // //           : "N/A";
// // // //       return [host.name, ip];
// // // //     });
// // // //   } catch (error) {
// // // //     console.error("Error fetching data:", error);
// // // //     throw error;
// // // //   }
// // // // };

// // // // export { fetchData };

// // // //
// // // import axios from "axios";

// // // const SERVER_URL = "https://nms.sanghviinfo.com";
// // // const USERNAME = "snv_monitor";
// // // const PASSWORD = "v4kUtbTYpeu6#9!a";

// // // // Axios instance with interceptors for logging and retry mechanism
// // // const axiosInstance = axios.create({
// // //   baseURL: `${SERVER_URL}/zabbix/api_jsonrpc.php`,
// // //   headers: { "Content-Type": "application/json-rpc" },
// // // });

// // // axiosInstance.interceptors.request.use(
// // //   (config) => {
// // //     console.log("Starting Request", JSON.stringify(config, null, 2));
// // //     return config;
// // //   },
// // //   (error) => {
// // //     console.error("Request Error", error);
// // //     return Promise.reject(error);
// // //   }
// // // );

// // // axiosInstance.interceptors.response.use(
// // //   (response) => {
// // //     console.log("Response:", JSON.stringify(response, null, 2));
// // //     return response;
// // //   },
// // //   async (error) => {
// // //     console.error("Response Error", error);
// // //     if (
// // //       error.code === "ERR_NETWORK" &&
// // //       error.config &&
// // //       !error.config.__isRetryRequest
// // //     ) {
// // //       error.config.__isRetryRequest = true;
// // //       return axiosInstance(error.config);
// // //     }
// // //     return Promise.reject(error);
// // //   }
// // // );

// // // const login = async () => {
// // //   const payload = {
// // //     jsonrpc: "2.0",
// // //     method: "user.login",
// // //     params: {
// // //       user: USERNAME,
// // //       password: PASSWORD,
// // //     },
// // //     id: 1,
// // //   };

// // //   try {
// // //     const response = await axiosInstance.post("", payload);
// // //     if (response.data.result) {
// // //       return response.data.result;
// // //     } else if (response.data.error) {
// // //       console.error("Login error:", response.data.error);
// // //       throw new Error(`Login error: ${response.data.error}`);
// // //     } else {
// // //       console.error("Unexpected response:", response.data);
// // //       throw new Error(`Unexpected response: ${response.data}`);
// // //     }
// // //   } catch (error) {
// // //     console.error("Error during login:", error);
// // //     throw error;
// // //   }
// // // };

// // // const fetchHosts = async (authToken) => {
// // //   const payload = {
// // //     jsonrpc: "2.0",
// // //     method: "host.get",
// // //     params: {
// // //       output: ["hostid", "name"],
// // //       selectInterfaces: ["interfaceid", "ip"],
// // //     },
// // //     auth: authToken,
// // //     id: 1,
// // //   };

// // //   try {
// // //     const response = await axiosInstance.post("", payload);
// // //     if (response.data.result) {
// // //       return response.data.result;
// // //     } else if (response.data.error) {
// // //       console.error("Error fetching hosts:", response.data.error);
// // //       throw new Error(`Error fetching hosts: ${response.data.error}`);
// // //     } else {
// // //       console.error("Unexpected response:", response.data);
// // //       throw new Error(`Unexpected response: ${response.data}`);
// // //     }
// // //   } catch (error) {
// // //     console.error("Error fetching hosts:", error);
// // //     throw error;
// // //   }
// // // };

// // // const fetchProblems = async (authToken, hostId) => {
// // //   const payload = {
// // //     jsonrpc: "2.0",
// // //     method: "problem.get",
// // //     params: {
// // //       objectids: hostId,
// // //       output: ["eventid", "name", "severity"],
// // //       selectAcknowledges: "extend",
// // //       selectTags: "extend",
// // //     },
// // //     auth: authToken,
// // //     id: 1,
// // //   };

// // //   try {
// // //     const response = await axiosInstance.post("", payload);
// // //     if (response.data.result) {
// // //       return response.data.result;
// // //     } else if (response.data.error) {
// // //       console.error("Error fetching problems:", response.data.error);
// // //       throw new Error(`Error fetching problems: ${response.data.error}`);
// // //     } else {
// // //       console.error("Unexpected response:", response.data);
// // //       throw new Error(`Unexpected response: ${response.data}`);
// // //     }
// // //   } catch (error) {
// // //     console.error("Error fetching problems:", error);
// // //     throw error;
// // //   }
// // // };

// // // const fetchDataHostProblems = async () => {
// // //   try {
// // //     console.log("Fetching data...");
// // //     const authToken = await login();
// // //     const hosts = await fetchHosts(authToken);

// // //     const hostData = await Promise.all(
// // //       hosts.map(
// // //         rateLimit(async (host) => {
// // //           const ip =
// // //             host.interfaces && host.interfaces[0] && host.interfaces[0].ip
// // //               ? host.interfaces[0].ip
// // //               : "N/A";
// // //           const problems = await fetchProblems(authToken, host.hostid);
// // //           const totalProblems = problems.length;
// // //           const severityCounts = problems.reduce((acc, problem) => {
// // //             const severity = problem.severity;
// // //             acc[severity] = (acc[severity] || 0) + 1;
// // //             return acc;
// // //           }, {});
// // //           const problemNames = problems.map((problem) => problem.name);
// // //           return {
// // //             hostName: host.name,
// // //             ip,
// // //             totalProblems,
// // //             problemNames,
// // //             severityCounts,
// // //           };
// // //         }, 1000)
// // //       ) // Limit to 1 request per second
// // //     );

// // //     console.log("Host Data with Problems:", hostData);
// // //     return hostData;
// // //   } catch (error) {
// // //     console.error("Error fetching data:", error);
// // //     throw error;
// // //   }
// // // };

// // // const fetchDataHostNameHostIP = async () => {
// // //   try {
// // //     console.log("Fetching data...");
// // //     const authToken = await login();
// // //     const hosts = await fetchHosts(authToken);

// // //     console.log("Hosts:", hosts);
// // //     return hosts.map((host) => {
// // //       const ip =
// // //         host.interfaces && host.interfaces[0] && host.interfaces[0].ip
// // //           ? host.interfaces[0].ip
// // //           : "N/A";
// // //       return [host.name, ip];
// // //     });
// // //   } catch (error) {
// // //     console.error("Error fetching data:", error);
// // //     throw error;
// // //   }
// // // };

// // // export { fetchDataHostProblems, fetchDataHostNameHostIP };
// // import axios from "axios";

// // const SERVER_URL = "https://nms.sanghviinfo.com";
// // const USERNAME = "snv_monitor";
// // const PASSWORD = "v4kUtbTYpeu6#9!a";

// // // Axios instance with interceptors for logging and retry mechanism
// // const axiosInstance = axios.create({
// //   baseURL: `${SERVER_URL}/zabbix/api_jsonrpc.php`,
// //   headers: { "Content-Type": "application/json-rpc" },
// // });

// // axiosInstance.interceptors.request.use(
// //   (config) => {
// //     console.log("Starting Request", JSON.stringify(config, null, 2));
// //     return config;
// //   },
// //   (error) => {
// //     console.error("Request Error", error);
// //     return Promise.reject(error);
// //   }
// // );

// // axiosInstance.interceptors.response.use(
// //   (response) => {
// //     console.log("Response:", JSON.stringify(response, null, 2));
// //     return response;
// //   },
// //   async (error) => {
// //     console.error("Response Error", error);
// //     if (
// //       error.code === "ERR_NETWORK" &&
// //       error.config &&
// //       !error.config.__isRetryRequest
// //     ) {
// //       error.config.__isRetryRequest = true;
// //       return axiosInstance(error.config);
// //     }
// //     return Promise.reject(error);
// //   }
// // );

// // // Rate limit to control the amount of requests
// // const rateLimit = (fn, delay) => {
// //   let lastCall = 0;
// //   return (...args) => {
// //     const now = new Date().getTime();
// //     if (now - lastCall < delay) {
// //       return new Promise((resolve) =>
// //         setTimeout(() => resolve(fn(...args)), delay)
// //       );
// //     }
// //     lastCall = now;
// //     return fn(...args);
// //   };
// // };

// // const login = async () => {
// //   const payload = {
// //     jsonrpc: "2.0",
// //     method: "user.login",
// //     params: {
// //       user: USERNAME,
// //       password: PASSWORD,
// //     },
// //     id: 1,
// //   };

// //   try {
// //     const response = await axiosInstance.post("", payload);
// //     if (response.data.result) {
// //       return response.data.result;
// //     } else if (response.data.error) {
// //       console.error("Login error:", response.data.error);
// //       throw new Error(`Login error: ${response.data.error}`);
// //     } else {
// //       console.error("Unexpected response:", response.data);
// //       throw new Error(`Unexpected response: ${response.data}`);
// //     }
// //   } catch (error) {
// //     console.error("Error during login:", error);
// //     throw error;
// //   }
// // };

// // const fetchHosts = async (authToken) => {
// //   const payload = {
// //     jsonrpc: "2.0",
// //     method: "host.get",
// //     params: {
// //       output: ["hostid", "name"],
// //       selectInterfaces: ["interfaceid", "ip"],
// //     },
// //     auth: authToken,
// //     id: 1,
// //   };

// //   try {
// //     const response = await axiosInstance.post("", payload);
// //     if (response.data.result) {
// //       return response.data.result;
// //     } else if (response.data.error) {
// //       console.error("Error fetching hosts:", response.data.error);
// //       throw new Error(`Error fetching hosts: ${response.data.error}`);
// //     } else {
// //       console.error("Unexpected response:", response.data);
// //       throw new Error(`Unexpected response: ${response.data}`);
// //     }
// //   } catch (error) {
// //     console.error("Error fetching hosts:", error);
// //     throw error;
// //   }
// // };

// // const fetchProblems = async (authToken, hostId) => {
// //   const payload = {
// //     jsonrpc: "2.0",
// //     method: "problem.get",
// //     params: {
// //       objectids: hostId,
// //       output: ["eventid", "name", "severity"],
// //       selectAcknowledges: "extend",
// //       selectTags: "extend",
// //     },
// //     auth: authToken,
// //     id: 1,
// //   };

// //   try {
// //     const response = await axiosInstance.post("", payload);
// //     if (response.data.result) {
// //       return response.data.result;
// //     } else if (response.data.error) {
// //       console.error("Error fetching problems:", response.data.error);
// //       throw new Error(`Error fetching problems: ${response.data.error}`);
// //     } else {
// //       console.error("Unexpected response:", response.data);
// //       throw new Error(`Unexpected response: ${response.data}`);
// //     }
// //   } catch (error) {
// //     console.error("Error fetching problems:", error);
// //     throw error;
// //   }
// // };

// // const fetchDataHostProblems = async () => {
// //   try {
// //     console.log("Fetching data...");
// //     const authToken = await login();
// //     const hosts = await fetchHosts(authToken);

// //     const hostData = await Promise.all(
// //       hosts.map(
// //         rateLimit(async (host) => {
// //           const ip =
// //             host.interfaces && host.interfaces[0] && host.interfaces[0].ip
// //               ? host.interfaces[0].ip
// //               : "N/A";
// //           const problems = await fetchProblems(authToken, host.hostid);
// //           const totalProblems = problems.length;
// //           const severityCounts = problems.reduce((acc, problem) => {
// //             const severity = problem.severity;
// //             acc[severity] = (acc[severity] || 0) + 1;
// //             return acc;
// //           }, {});
// //           const problemNames = problems.map((problem) => problem.name);
// //           return {
// //             hostName: host.name,
// //             ip,
// //             totalProblems,
// //             problemNames,
// //             severityCounts,
// //           };
// //         }, 1000)
// //       ) // Limit to 1 request per second
// //     );

// //     // Sort hosts by the number of problems in descending order
// //     hostData.sort((a, b) => b.totalProblems - a.totalProblems);

// //     console.log("Host Data with Problems:", hostData);
// //     return hostData;
// //   } catch (error) {
// //     console.error("Error fetching data:", error);
// //     throw error;
// //   }
// // };

// // const fetchDataHostNameHostIP = async () => {
// //   try {
// //     console.log("Fetching data...");
// //     const authToken = await login();
// //     const hosts = await fetchHosts(authToken);

// //     console.log("Hosts:", hosts);
// //     return hosts.map((host) => {
// //       const ip =
// //         host.interfaces && host.interfaces[0] && host.interfaces[0].ip
// //           ? host.interfaces[0].ip
// //           : "N/A";
// //       return [host.name, ip];
// //     });
// //   } catch (error) {
// //     console.error("Error fetching data:", error);
// //     throw error;
// //   }
// // };

// // export { fetchDataHostProblems, fetchDataHostNameHostIP };

// import axios from "axios";

// const SERVER_URL = "https://nms.sanghviinfo.com";
// const USERNAME = "snv_monitor";
// const PASSWORD = "v4kUtbTYpeu6#9!a";

// // Axios instance with interceptors for logging and retry mechanism
// const axiosInstance = axios.create({
//   baseURL: `${SERVER_URL}/zabbix/api_jsonrpc.php`,
//   headers: { "Content-Type": "application/json-rpc" },
// });

// axiosInstance.interceptors.request.use(
//   (config) => {
//     console.log("Starting Request", JSON.stringify(config, null, 2));
//     return config;
//   },
//   (error) => {
//     console.error("Request Error", error);
//     return Promise.reject(error);
//   }
// );

// axiosInstance.interceptors.response.use(
//   (response) => {
//     console.log("Response:", JSON.stringify(response, null, 2));
//     return response;
//   },
//   async (error) => {
//     console.error("Response Error", error);
//     if (
//       error.code === "ERR_NETWORK" &&
//       error.config &&
//       !error.config.__isRetryRequest
//     ) {
//       error.config.__isRetryRequest = true;
//       return axiosInstance(error.config);
//     }
//     return Promise.reject(error);
//   }
// );

// const login = async () => {
//   const payload = {
//     jsonrpc: "2.0",
//     method: "user.login",
//     params: {
//       user: USERNAME,
//       password: PASSWORD,
//     },
//     id: 1,
//   };

//   try {
//     const response = await axiosInstance.post("", payload);
//     if (response.data.result) {
//       return response.data.result;
//     } else if (response.data.error) {
//       console.error("Login error:", response.data.error);
//       throw new Error(`Login error: ${response.data.error}`);
//     } else {
//       console.error("Unexpected response:", response.data);
//       throw new Error(`Unexpected response: ${response.data}`);
//     }
//   } catch (error) {
//     console.error("Error during login:", error);
//     throw error;
//   }
// };

// const fetchHostIDs = async (authToken, limit, offset) => {
//   const payload = {
//     jsonrpc: "2.0",
//     method: "host.get",
//     params: {
//       output: ["hostid"],
//       limit,
//       offset,
//     },
//     auth: authToken,
//     id: 1,
//   };

//   try {
//     const response = await axiosInstance.post("", payload);
//     if (response.data.result) {
//       return response.data.result.map((host) => host.hostid);
//     } else if (response.data.error) {
//       console.error("Error fetching host IDs:", response.data.error);
//       throw new Error(`Error fetching host IDs: ${response.data.error}`);
//     } else {
//       console.error("Unexpected response:", response.data);
//       throw new Error(`Unexpected response: ${response.data}`);
//     }
//   } catch (error) {
//     console.error("Error fetching host IDs:", error);
//     throw error;
//   }
// };

// const fetchHostDetails = async (authToken, hostIds) => {
//   const payload = {
//     jsonrpc: "2.0",
//     method: "host.get",
//     params: {
//       output: ["hostid", "name"],
//       hostids: hostIds,
//       selectInterfaces: ["interfaceid", "ip"],
//     },
//     auth: authToken,
//     id: 1,
//   };

//   try {
//     const response = await axiosInstance.post("", payload);
//     if (response.data.result) {
//       return response.data.result;
//     } else if (response.data.error) {
//       console.error("Error fetching host details:", response.data.error);
//       throw new Error(`Error fetching host details: ${response.data.error}`);
//     } else {
//       console.error("Unexpected response:", response.data);
//       throw new Error(`Unexpected response: ${response.data}`);
//     }
//   } catch (error) {
//     console.error("Error fetching host details:", error);
//     throw error;
//   }
// };

// const fetchProblems = async (authToken, hostId) => {
//   const payload = {
//     jsonrpc: "2.0",
//     method: "problem.get",
//     params: {
//       output: "extend",
//       selectAcknowledges: "extend",
//       selectTags: "extend",
//       objectids: hostId,
//       recent: true,
//       sortfield: ["eventid"],
//       sortorder: "DESC",
//     },
//     auth: authToken,
//     id: 1,
//   };

//   try {
//     const response = await axiosInstance.post("", payload);
//     if (response.data.result) {
//       return response.data.result;
//     } else if (response.data.error) {
//       console.error("Error fetching problems:", response.data.error);
//       throw new Error(`Error fetching problems: ${response.data.error}`);
//     } else {
//       console.error("Unexpected response:", response.data);
//       throw new Error(`Unexpected response: ${response.data}`);
//     }
//   } catch (error) {
//     console.error("Error fetching problems:", error);
//     throw error;
//   }
// };

// const fetchDataHostProblems = async (limit, offset) => {
//   try {
//     console.log("Fetching data...");
//     const authToken = await login();
//     const hostIds = await fetchHostIDs(authToken, limit, offset);

//     const hostDetails = await fetchHostDetails(authToken, hostIds);

//     const hostData = await Promise.all(
//       hostDetails.map(
//         rateLimit(async (host) => {
//           const ip =
//             host.interfaces && host.interfaces[0] && host.interfaces[0].ip
//               ? host.interfaces[0].ip
//               : "N/A";
//           const problems = await fetchProblems(authToken, host.hostid);
//           const totalProblems = problems.length;
//           const severityCounts = problems.reduce((acc, problem) => {
//             const severity = problem.severity;
//             acc[severity] = (acc[severity] || 0) + 1;
//             return acc;
//           }, {});
//           const problemNames = problems.map((problem) => problem.name);
//           return {
//             hostName: host.name,
//             ip,
//             totalProblems,
//             problemNames,
//             severityCounts,
//           };
//         }, 1000)
//       ) // Limit to 1 request per second
//     );

//     // Sort hosts by the number of problems in descending order
//     hostData.sort((a, b) => b.totalProblems - a.totalProblems);

//     console.log("Host Data with Problems:", hostData);
//     return hostData;
//   } catch (error) {
//     console.error("Error fetching data:", error);
//     throw error;
//   }
// };

// export { fetchDataHostProblems };

import axios from "axios";

const SERVER_URL = "https://nms.sanghviinfo.com";
const USERNAME = "snv_monitor";
const PASSWORD = "v4kUtbTYpeu6#9!a";

// Axios instance with interceptors for logging and retry mechanism
const axiosInstance = axios.create({
  baseURL: `${SERVER_URL}/zabbix/api_jsonrpc.php`,
  headers: { "Content-Type": "application/json-rpc" },
});

axiosInstance.interceptors.request.use(
  (config) => {
    console.log("Starting Request", JSON.stringify(config, null, 2));
    return config;
  },
  (error) => {
    console.error("Request Error", error);
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => {
    console.log("Response:", JSON.stringify(response, null, 2));
    return response;
  },
  async (error) => {
    console.error("Response Error", error);
    if (
      error.code === "ERR_NETWORK" &&
      error.config &&
      !error.config.__isRetryRequest
    ) {
      error.config.__isRetryRequest = true;
      return axiosInstance(error.config);
    }
    return Promise.reject(error);
  }
);

const login = async () => {
  const payload = {
    jsonrpc: "2.0",
    method: "user.login",
    params: {
      user: USERNAME,
      password: PASSWORD,
    },
    id: 1,
  };

  try {
    const response = await axiosInstance.post("", payload);
    if (response.data.result) {
      return response.data.result;
    } else if (response.data.error) {
      console.error("Login error:", response.data.error);
      throw new Error(`Login error: ${response.data.error}`);
    } else {
      console.error("Unexpected response:", response.data);
      throw new Error(`Unexpected response: ${response.data}`);
    }
  } catch (error) {
    console.error("Error during login:", error);
    throw error;
  }
};

const fetchProblems = async (authToken, HostID) => {
  const payload = {
    jsonrpc: "2.0",
    method: "problem.get",
    params: {
      output: ["clock", "eventid", "acknowledged", "name", "severity"],
      hostids: HostID,
    },
    auth: authToken,
    id: 1,
  };

  try {
    const response = await axiosInstance.post("", payload);
    if (response.data.result) {
      return response.data.result;
    } else if (response.data.error) {
      console.error("Error fetching problems:", response.data.error);
      throw new Error(`Error fetching problems: ${response.data.error}`);
    } else {
      console.error("Unexpected response:", response.data);
      throw new Error(`Unexpected response: ${response.data}`);
    }
  } catch (error) {
    console.error("Error fetching problems:", error);
    throw error;
  }
};

const fetchHostDetails = async (authToken) => {
  const payload = {
    jsonrpc: "2.0",
    method: "host.get",
    params: {
      output: ["hostid", "host"],
      //limit: 10,
    },
    auth: authToken,
    id: 1,
  };

  try {
    const response = await axiosInstance.post("", payload);
    if (response.data.result) {
      // console.log(response.data);
      return response.data.result;
    } else if (response.data.error) {
      console.error("Error fetching host details:", response.data.error);
      throw new Error(`Error fetching host details: ${response.data.error}`);
    } else {
      console.error("Unexpected response:", response.data);
      throw new Error(`Unexpected response: ${response.data}`);
    }
  } catch (error) {
    console.error("Error fetching host details:", error);
    throw error;
  }
};

const fetchDataHostProblems = async () => {
  try {
    console.log("Fetching data...");
    const authToken = await login();
    //const problems = await fetchProblems(authToken, limit, offset);

    // const hostIds = [...new Set(problems.map((problem) => problem.objectid))];

    const hostDetails = await fetchHostDetails(authToken);

    // console.log(hostDetails);

    //  const test = [];
    // let problemDetail;

    // const hostids = hostDetails.map((item) => item.hostid, item.host);
    // console.log(hostDetails);

    // for (host in hostids) {
    //   console.log(host);

    //   // problemDetail = await fetchProblems(authToken, host["hostid"]);
    //   //  console.log(problemDetail);
    //   //   console.log(problemDetail);
    //   //test.append(problemDetail);
    // }

    //const problemDetail = await fetchProblems(authToken, "10084");

    //console.log(test);

    // return hostDetails;

    // Extract hostid and host from hostDetails
    const hostInfo = Object.values(hostDetails).map((detail) => ({
      hostid: detail.hostid,
      host: detail.host,
    }));
    //  console.log(hostInfo);

    // Iterate over hostInfo and fetch problems for each hostid
    // Iterate over hostInfo and fetch problems for each hostid
    const test = [];
    for (const { hostid, host } of hostInfo) {
      console.log("Fetching problems for hostid:", hostid, "host:", host);
      const problems = await fetchProblems(authToken, hostid);

      // Add hostid and host to each problem detail
      const problemDetails = problems.map((problem) => ({
        ...problem,
        hostid,
        host,
      }));

      //console.log(problemDetails);
      test.push(...problemDetails); // Add all problem details to the test array
      console.log(problemDetails);
    }

    return hostDetails;

    // const ip =
    //   hostDetails.interfaces &&
    //   hostDetails.interfaces[0] &&
    //   hostDetails.interfaces[0].ip
    //     ? hostDetails.interfaces[0].ip
    //     : "N/A";

    // const hostProblems = problems.filter(
    //   (problem) => problem.objectid === hostId
    // );

    // const totalProblems = hostProblems.length;
    // const severityCounts = hostProblems.reduce((acc, problem) => {
    //   const severity = problem.severity;
    //   acc[severity] = (acc[severity] || 0) + 1;
    //   return acc;
    // }, {});
    // const problemNames = hostProblems.map((problem) => problem.name);

    // return {
    //   hostName: hostDetails.name,
    //   ip,
    //   totalProblems,
    //   problemNames,
    //   severityCounts,
    // };
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};

export { fetchDataHostProblems, fetchHostDetails };
