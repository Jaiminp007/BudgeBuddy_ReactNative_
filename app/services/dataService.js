// // services/dataService.js
// import axios from "axios";

// const ZABBIX_URL = "https://nms.sanghviinfo.com/zabbix/api_jsonrpc.php";
// const ZABBIX_USERNAME = "snv_monitor";
// const ZABBIX_PASSWORD = "v4kUtbTYpeu6#9!a";

// let authToken = null;

// const login = async () => {
//   const payload = {
//     jsonrpc: "2.0",
//     method: "user.login",
//     params: {
//       user: ZABBIX_USERNAME,
//       password: ZABBIX_PASSWORD,
//     },
//     id: 1,
//   };

//   const headers = {
//     "Content-Type": "application/json-rpc",
//   };

//   try {
//     const response = await axios.post(ZABBIX_URL, payload, { headers });
//     if (response.data.result) {
//       authToken = response.data.result;
//       return authToken;
//     } else {
//       throw new Error("Login failed");
//     }
//   } catch (error) {
//     console.error("Login error:", error);
//     throw error;
//   }
// };

// const getHosts = async () => {
//   if (!authToken) {
//     await login();
//   }

//   const payload = {
//     jsonrpc: "2.0",
//     method: "host.get",
//     params: {
//       output: "extend",
//     },
//     auth: authToken,
//     id: 1,
//   };

//   const headers = {
//     "Content-Type": "application/json-rpc",
//   };

//   try {
//     const response = await axios.post(ZABBIX_URL, payload, { headers });
//     return response.data.result;
//   } catch (error) {
//     console.error("Error fetching hosts:", error);
//     throw error;
//   }
// };

// const getHostInterface = async (hostId) => {
//   if (!authToken) {
//     await login();
//   }

//   const payload = {
//     jsonrpc: "2.0",
//     method: "hostinterface.get",
//     params: {
//       output: "extend",
//       hostids: hostId,
//     },
//     auth: authToken,
//     id: 1,
//   };

//   const headers = {
//     "Content-Type": "application/json-rpc",
//   };

//   try {
//     const response = await axios.post(ZABBIX_URL, payload, { headers });
//     return response.data.result;
//   } catch (error) {
//     console.error("Error fetching host interface:", error);
//     throw error;
//   }
// };

// const getProblems = async (hostId) => {
//   if (!authToken) {
//     await login();
//   }

//   const payload = {
//     jsonrpc: "2.0",
//     method: "problem.get",
//     params: {
//       output: "extend",
//       hostids: hostId,
//     },
//     auth: authToken,
//     id: 1,
//   };

//   const headers = {
//     "Content-Type": "application/json-rpc",
//   };

//   try {
//     const response = await axios.post(ZABBIX_URL, payload, { headers });
//     return response.data.result;
//   } catch (error) {
//     console.error("Error fetching problems:", error);
//     throw error;
//   }
// };

// export { login, getHosts, getHostInterface, getProblems };
