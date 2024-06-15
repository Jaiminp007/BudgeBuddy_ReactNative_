// import axios from "axios";

// class AuthService {
//   constructor() {
//     if (!AuthService.instance) {
//       AuthService.instance = this;
//       this.authToken = null;
//       this.axiosInstance = null;
//     }
//     return AuthService.instance;
//   }

//   async login(url, username, password, httpAuth = null) {
//     this.axiosInstance = axios.create({
//       baseURL: `${url}/zabbix/api_jsonrpc.php`,
//       headers: { "Content-Type": "application/json-rpc" },
//       timeout: 3600000,
//     });

//     this.axiosInstance.interceptors.request.use(
//       (config) => {
//         console.log("Starting Request", JSON.stringify(config, null, 2));
//         return config;
//       },
//       (error) => {
//         console.error("Request Error", error);
//         return Promise.reject(error);
//       }
//     );

//     this.axiosInstance.interceptors.response.use(
//       (response) => {
//         console.log("Response:", JSON.stringify(response, null, 2));
//         return response;
//       },
//       async (error) => {
//         console.error("Response Error", error);
//         if (
//           error.code === "ERR_NETWORK" &&
//           error.config &&
//           !error.config.__isRetryRequest
//         ) {
//           error.config.__isRetryRequest = true;
//           return this.axiosInstance(error.config);
//         }
//         return Promise.reject(error);
//       }
//     );

//     if (!this.authToken) {
//       const payload = {
//         jsonrpc: "2.0",
//         method: "user.login",
//         params: {
//           username: username,
//           password: password,
//         },
//         id: 1,
//       };

//       try {
//         const response = await this.axiosInstance.post("", payload);
//         if (response.data.result) {
//           this.authToken = response.data.result;
//         } else {
//           throw new Error(
//             `Login error: ${JSON.stringify(response.data.error)}`
//           );
//         }
//       } catch (error) {
//         console.error("Error during login:", error.message || error);
//         throw error;
//       }
//     }
//     return this.authToken;
//   }

//   getToken() {
//     return this.authToken;
//   }
// }

// const authService = new AuthService();

// const fetchProblems = async (authToken, hostIds) => {
//   const payload = {
//     jsonrpc: "2.0",
//     method: "problem.get",
//     params: {
//       output: ["triggerids", "objectid", "clock", "severity"],
//       hostids: hostIds,
//     },
//     auth: authToken,
//     id: 1,
//   };

//   try {
//     const response = await authService.axiosInstance.post("", payload);
//     return response.data.result;
//   } catch (error) {
//     console.error("Error fetching problems:", error);
//     throw error;
//   }
// };

// const ping = async (authToken, hostId) => {
//   const payload = {
//     jsonrpc: "2.0",
//     method: "script.execute",
//     params: {
//       scriptid: "1",
//       hostid: hostId,
//     },
//     auth: authToken,
//     id: 1,
//   };

//   try {
//     const response = await authService.axiosInstance.post("", payload);
//     return response.data.result;
//   } catch (error) {
//     console.error("Error fetching ping:", error);
//     throw error;
//   }
// };

// const traceroute = async (authToken, hostId) => {
//   const payload = {
//     jsonrpc: "2.0",
//     method: "script.execute",
//     params: {
//       scriptid: "2",
//       hostid: hostId,
//     },
//     auth: authToken,
//     id: 1,
//   };

//   try {
//     const response = await authService.axiosInstance.post("", payload);
//     return response.data.result;
//   } catch (error) {
//     console.error("Error fetching traceroute:", error);
//     throw error;
//   }
// };

// const fetchTriggers = async (authToken) => {
//   const payload = {
//     jsonrpc: "2.0",
//     method: "trigger.get",
//     params: {
//       output: ["triggerid"],
//       selectDependencies: 1,
//       filter: { status: "0" },
//     },
//     auth: authToken,
//     id: 1,
//   };

//   try {
//     const response = await authService.axiosInstance.post("", payload);
//     return response.data.result;
//   } catch (error) {
//     console.error("Error fetching triggers:", error);
//     throw error;
//   }
// };

// const fetchEvents = async (authToken, eventIds) => {
//   const payload = {
//     jsonrpc: "2.0",
//     method: "event.get",
//     params: {
//       output: "extend",
//       selectAcknowledges: "extend",
//       eventids: eventIds,
//       sortfield: ["clock"],
//       selectHosts: ["hostid", "host"],
//       suppressed: 0,
//     },
//     auth: authToken,
//     id: 2,
//   };

//   try {
//     const response = await authService.axiosInstance.post("", payload);
//     return response.data.result;
//   } catch (error) {
//     console.error("Error fetching events:", error);
//     throw error;
//   }
// };

// const fetchEnabledHosts = async (authToken, groupId) => {
//   const payload = {
//     jsonrpc: "2.0",
//     method: "host.get",
//     params: {
//       output: ["hostid"],
//       groupids: groupId,
//       filter: {
//         status: 0, // 0 means enabled hosts
//       },
//     },
//     auth: authToken,
//     id: 1,
//   };

//   try {
//     const response = await authService.axiosInstance.post("", payload);
//     return response.data.result.map((host) => host.hostid);
//   } catch (error) {
//     console.error("Error fetching enabled hosts:", error);
//     throw error;
//   }
// };

// const fetchHostDetails = async (authToken, gid) => {
//   const params = {
//     output: ["hostid", "host"],
//     filter: { status: 0 },
//   };
//   if (gid) {
//     params.groupids = gid;
//   }
//   const payload = {
//     jsonrpc: "2.0",
//     method: "host.get",
//     params: params,
//     auth: authToken,
//     id: 1,
//   };

//   try {
//     const response = await authService.axiosInstance.post("", payload);
//     return response.data.result;
//   } catch (error) {
//     console.error("Error fetching host details:", error);
//     throw error;
//   }
// };

// const fetchHostGroupDetails = async (authToken) => {
//   const payload = {
//     jsonrpc: "2.0",
//     method: "hostgroup.get",
//     params: {
//       output: "extend",
//       selectHosts: ["hostid", "host"],
//     },
//     auth: authToken,
//     id: 1,
//   };

//   try {
//     const response = await authService.axiosInstance.post("", payload);
//     return response.data.result;
//   } catch (error) {
//     console.error("Error fetching host group details:", error);
//     throw error;
//   }
// };

// const convertUnixToDate = (unixTimestamp) => {
//   const milliseconds = unixTimestamp * 1000;
//   const dateObject = new Date(milliseconds);
//   return dateObject.toLocaleString(); // Adjust date formatting as needed
// };

// const fetchDataHostProblems = async (authToken) => {
//   try {
//     console.log("Fetching data...");
//     const [triggers, hostDetails] = await Promise.all([
//       fetchTriggers(authToken),
//       fetchHostDetails(authToken),
//     ]);

//     const activeTriggers = triggers.map((trigger) => trigger.triggerid);
//     const hostIds = hostDetails.map((item) => item.hostid);
//     const problemDetail = await fetchProblems(authToken, hostIds);
//     const filteredProblems = problemDetail.filter((problem) =>
//       activeTriggers.includes(problem.objectid)
//     );

//     const eventIds = filteredProblems.map((detail) => detail.eventid);
//     const eventAll = await fetchEvents(authToken, eventIds);

//     eventAll.forEach((event) => {
//       const eventTime = parseInt(event.clock) * 1000;
//       const currentTime = new Date().getTime();
//       const durationInMillis = currentTime - eventTime;

//       const seconds = Math.floor(durationInMillis / 1000) % 60;
//       const minutes = Math.floor(durationInMillis / (1000 * 60)) % 60;
//       const hours = Math.floor(durationInMillis / (1000 * 60 * 60)) % 24;
//       const days = Math.floor(durationInMillis / (1000 * 60 * 60 * 24)) % 30;
//       const months =
//         Math.floor(durationInMillis / (1000 * 60 * 60 * 24 * 30)) % 12;
//       const years = Math.floor(
//         durationInMillis / (1000 * 60 * 60 * 24 * 30 * 12)
//       );

//       let durationString = "";
//       if (years >= 1) {
//         durationString += `${years}Y `;
//       }
//       if (months >= 1) {
//         durationString += `${months}M `;
//       }
//       if (days >= 1) {
//         durationString += `${days}d `;
//       }
//       if (hours >= 1) {
//         durationString += `${hours}h `;
//       }
//       if (minutes >= 1) {
//         durationString += `${minutes}m `;
//       }
//       durationString += `${seconds}s`;

//       durationString = durationString.replace(/,\s*$/, "");

//       event.duration = durationString;
//     });

//     eventAll.sort((a, b) => parseInt(b.clock) - parseInt(a.clock));
//     return eventAll;
//   } catch (error) {
//     console.error("Error fetching data:", error);
//     throw error;
//   }
// };

// const fetchHostGroupProblems = async (authToken) => {
//   try {
//     const [hostGroupDetails, triggers] = await Promise.all([
//       fetchHostGroupDetails(authToken),
//       fetchTriggers(authToken),
//     ]);

//     const activeTriggers = triggers.map((trigger) => trigger.triggerid);
//     const groupProblemCounts = {};
//     const allProblems = {};

//     const fetchProblemsPromises = hostGroupDetails.map(async (group) => {
//       const groupId = group.groupid;
//       const groupName = group.name;
//       const enabledHostIds = await fetchEnabledHosts(authToken, groupId);
//       if (enabledHostIds.length > 0) {
//         const problems = await fetchProblems(authToken, enabledHostIds);
//         const filteredProblems = problems.filter((problem) =>
//           activeTriggers.includes(problem.objectid)
//         );
//         filteredProblems.forEach((problem) => {
//           if (!allProblems[problem.eventid]) {
//             allProblems[problem.eventid] = problem;
//           }
//         });
//         groupProblemCounts[groupId] = {
//           groupName: groupName,
//           problemCount: filteredProblems.length,
//           totalHosts: enabledHostIds.length,
//         };
//       } else {
//         groupProblemCounts[groupId] = {
//           groupName: groupName,
//           problemCount: 0,
//           totalHosts: 0,
//         };
//       }
//     });

//     await Promise.all(fetchProblemsPromises);

//     console.log("Problems count for each host group:", groupProblemCounts);
//     return {
//       allProblems,
//       groupProblemCounts,
//     };
//   } catch (error) {
//     console.error("Error fetching data:", error);
//     throw error;
//   }
// };

// const fetchGroupProblemDetails = async (authToken, gid) => {
//   try {
//     console.log("Fetching data...");
//     const [triggers, hostDetails] = await Promise.all([
//       fetchTriggers(authToken),
//       fetchHostDetails(authToken, gid),
//     ]);

//     const activeTriggers = triggers.map((trigger) => trigger.triggerid);
//     const hostIds = hostDetails.map((item) => item.hostid);
//     const problemDetail = await fetchProblems(authToken, hostIds);
//     const filteredProblems = problemDetail.filter((problem) =>
//       activeTriggers.includes(problem.objectid)
//     );

//     const eventIds = filteredProblems.map((detail) => detail.eventid);
//     const eventAll = await fetchEvents(authToken, eventIds);

//     eventAll.forEach((event) => {
//       const eventTime = parseInt(event.clock) * 1000;
//       const currentTime = new Date().getTime();
//       const durationInMillis = currentTime - eventTime;

//       const seconds = Math.floor(durationInMillis / 1000) % 60;
//       const minutes = Math.floor(durationInMillis / (1000 * 60)) % 60;
//       const hours = Math.floor(durationInMillis / (1000 * 60 * 60)) % 24;
//       const days = Math.floor(durationInMillis / (1000 * 60 * 60 * 24)) % 30;
//       const months =
//         Math.floor(durationInMillis / (1000 * 60 * 60 * 24 * 30)) % 12;
//       const years = Math.floor(
//         durationInMillis / (1000 * 60 * 60 * 24 * 30 * 12)
//       );

//       let durationString = "";
//       if (years >= 1) {
//         durationString += `${years}Y `;
//       }
//       if (months >= 1) {
//         durationString += `${months}M `;
//       }
//       if (days >= 1) {
//         durationString += `${days}d `;
//       }
//       if (hours >= 1) {
//         durationString += `${hours}h `;
//       }
//       if (minutes >= 1) {
//         durationString += `${minutes}m `;
//       }
//       durationString += `${seconds}s`;

//       durationString = durationString.replace(/,\s*$/, "");

//       event.duration = durationString;
//     });

//     eventAll.sort((a, b) => parseInt(b.clock) - parseInt(a.clock));
//     return eventAll;
//   } catch (error) {
//     console.error("Error fetching data:", error);
//     throw error;
//   }
// };

// export {
//   authService,
//   fetchDataHostProblems,
//   fetchHostDetails,
//   fetchHostGroupProblems,
//   fetchGroupProblemDetails,
//   ping,
//   traceroute,
// };

// import axios from "axios";

// class AuthService {
//   constructor() {
//     if (!AuthService.instance) {
//       AuthService.instance = this;
//       this.authToken = null;
//       this.serverHost = null;
//       this.axiosInstance = axios.create({
//         headers: { "Content-Type": "application/json-rpc" },
//         timeout: 3600000,
//       });

//       this.axiosInstance.interceptors.request.use(
//         (config) => {
//           console.log("Starting Request", JSON.stringify(config, null, 2));
//           return config;
//         },
//         (error) => {
//           console.error("Request Error", error);
//           return Promise.reject(error);
//         }
//       );

//       this.axiosInstance.interceptors.response.use(
//         (response) => {
//           console.log("Response:", JSON.stringify(response, null, 2));
//           return response;
//         },
//         async (error) => {
//           console.error("Response Error", error);
//           if (
//             error.code === "ERR_NETWORK" &&
//             error.config &&
//             !error.config.__isRetryRequest
//           ) {
//             error.config.__isRetryRequest = true;
//             return this.axiosInstance(error.config);
//           }
//           return Promise.reject(error);
//         }
//       );
//     }
//     return AuthService.instance;
//   }

//   async login(url, username, password, httpAuth = null) {
//     this.serverHost = url;

//     if (!this.authToken) {
//       const payload = {
//         jsonrpc: "2.0",
//         method: "user.login",
//         params: {
//           username: username,
//           password: password,
//         },
//         id: 1,
//       };

//       try {
//         const response = await this.axiosInstance.post(
//           `${this.serverHost}/zabbix/api_jsonrpc.php`,
//           payload
//         );
//         if (response.data.result) {
//           this.authToken = response.data.result;
//         } else {
//           throw new Error(
//             `Login error: ${JSON.stringify(response.data.error)}`
//           );
//         }
//       } catch (error) {
//         console.error("Error during login:", error.message || error);
//         throw error;
//       }
//     }
//     return this.authToken;
//   }

//   async makeRequest(method, params = {}) {
//     if (!this.authToken || !this.serverHost) {
//       throw new Error("Auth token or server host not set. Please login first.");
//     }

//     const payload = {
//       jsonrpc: "2.0",
//       method: method,
//       params: params,
//       auth: this.authToken,
//       id: 1,
//     };

//     try {
//       const response = await this.axiosInstance.post(
//         `${this.serverHost}/zabbix/api_jsonrpc.php`,
//         payload
//       );
//       return response.data.result;
//     } catch (error) {
//       console.error(`Error during ${method} request:`, error);
//       throw error;
//     }
//   }

//   getToken() {
//     return this.authToken;
//   }
// }

// const authService = new AuthService();

// // Update all the existing functions to use authService.makeRequest
// const fetchProblems = async (hostIds) => {
//   const params = {
//     output: ["triggerids", "objectid", "clock", "severity"],
//     hostids: hostIds,
//   };

//   return await authService.makeRequest("problem.get", params);
// };

// const ping = async (hostId) => {
//   const params = {
//     scriptid: "1",
//     hostid: hostId,
//   };

//   return await authService.makeRequest("script.execute", params);
// };

// const traceroute = async (hostId) => {
//   const params = {
//     scriptid: "2",
//     hostid: hostId,
//   };

//   return await authService.makeRequest("script.execute", params);
// };

// const fetchTriggers = async () => {
//   const params = {
//     output: ["triggerid"],
//     selectDependencies: 1,
//     filter: { status: "0" },
//   };

//   return await authService.makeRequest("trigger.get", params);
// };

// const fetchEvents = async (eventIds) => {
//   const params = {
//     output: "extend",
//     selectAcknowledges: "extend",
//     eventids: eventIds,
//     sortfield: ["clock"],
//     selectHosts: ["hostid", "host"],
//     suppressed: 0,
//   };

//   return await authService.makeRequest("event.get", params);
// };

// const fetchEnabledHosts = async (groupId) => {
//   const params = {
//     output: ["hostid"],
//     groupids: groupId,
//     filter: {
//       status: 0, // 0 means enabled hosts
//     },
//   };

//   const result = await authService.makeRequest("host.get", params);
//   return result.map((host) => host.hostid);
// };

// const fetchHostDetails = async (gid) => {
//   const params = {
//     output: ["hostid", "host"],
//     filter: { status: 0 },
//   };
//   if (gid) {
//     params.groupids = gid;
//   }

//   return await authService.makeRequest("host.get", params);
// };

// const fetchHostGroupDetails = async () => {
//   const params = {
//     output: "extend",
//     selectHosts: ["hostid", "host"],
//   };

//   return await authService.makeRequest("hostgroup.get", params);
// };

// // Adjust the fetchHostGroupProblems function similarly to use the new makeRequest method

// const fetchHostGroupProblems = async () => {
//   try {
//     const [hostGroupDetails, triggers] = await Promise.all([
//       fetchHostGroupDetails(),
//       fetchTriggers(),
//     ]);

//     const activeTriggers = triggers.map((trigger) => trigger.triggerid);
//     const groupProblemCounts = {};
//     const allProblems = {};

//     const fetchProblemsPromises = hostGroupDetails.map(async (group) => {
//       const groupId = group.groupid;
//       const groupName = group.name;
//       const enabledHostIds = await fetchEnabledHosts(groupId);
//       if (enabledHostIds.length > 0) {
//         const problems = await fetchProblems(enabledHostIds);
//         const filteredProblems = problems.filter((problem) =>
//           activeTriggers.includes(problem.objectid)
//         );
//         filteredProblems.forEach((problem) => {
//           if (!allProblems[problem.eventid]) {
//             allProblems[problem.eventid] = problem;
//           }
//         });
//         groupProblemCounts[groupId] = {
//           groupName: groupName,
//           problemCount: filteredProblems.length,
//           totalHosts: enabledHostIds.length,
//         };
//       } else {
//         groupProblemCounts[groupId] = {
//           groupName: groupName,
//           problemCount: 0,
//           totalHosts: 0,
//         };
//       }
//     });

//     await Promise.all(fetchProblemsPromises);

//     console.log("Problems count for each host group:", groupProblemCounts);
//     return {
//       allProblems,
//       groupProblemCounts,
//     };
//   } catch (error) {
//     console.error("Error fetching data:", error);
//     throw error;
//   }
// };

// export {
//   authService,
//   fetchProblems,
//   fetchTriggers,
//   fetchEvents,
//   fetchEnabledHosts,
//   fetchHostDetails,
//   fetchHostGroupDetails,
//   fetchHostGroupProblems,
//   ping,
//   traceroute,
// };

import axios from "axios";

class AuthService {
  constructor() {
    if (!AuthService.instance) {
      AuthService.instance = this;
      this.authToken = null;
      this.serverHost = null;
      this.axiosInstance = axios.create({
        headers: { "Content-Type": "application/json-rpc" },
        timeout: 3600000,
      });

      this.axiosInstance.interceptors.request.use(
        (config) => {
          console.log("Starting Request", JSON.stringify(config, null, 2));
          return config;
        },
        (error) => {
          console.error("Request Error", error);
          return Promise.reject(error);
        }
      );

      this.axiosInstance.interceptors.response.use(
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
            return this.axiosInstance(error.config);
          }
          return Promise.reject(error);
        }
      );
    }
    return AuthService.instance;
  }

  async login(url, username, password, httpAuth = null) {
    this.serverHost = url;

    if (!this.authToken) {
      const payload = {
        jsonrpc: "2.0",
        method: "user.login",
        params: {
          username: username,
          password: password,
        },
        id: 1,
      };

      try {
        const response = await this.axiosInstance.post(
          `${this.serverHost}/zabbix/api_jsonrpc.php`,
          payload
        );
        if (response.data.result) {
          this.authToken = response.data.result;
        } else {
          throw new Error(
            `Login error: ${JSON.stringify(response.data.error)}`
          );
        }
      } catch (error) {
        console.error("Error during login:", error.message || error);
        throw error;
      }
    }
    return this.authToken;
  }

  async makeRequest(method, params = {}) {
    if (!this.authToken || !this.serverHost) {
      throw new Error("Auth token or server host not set. Please login first.");
    }

    const payload = {
      jsonrpc: "2.0",
      method: method,
      params: params,
      auth: this.authToken,
      id: 1,
    };

    try {
      const response = await this.axiosInstance.post(
        `${this.serverHost}/zabbix/api_jsonrpc.php`,
        payload
      );
      return response.data.result;
    } catch (error) {
      console.error(`Error during ${method} request:`, error);
      throw error;
    }
  }

  getToken() {
    return this.authToken;
  }
}

const authService = new AuthService();

const fetchProblems = async (hostIds) => {
  const params = {
    output: ["triggerids", "objectid", "clock", "severity"],
    hostids: hostIds,
  };

  return await authService.makeRequest("problem.get", params);
};

const ping = async (hostId) => {
  const params = {
    scriptid: "1",
    hostid: hostId,
  };

  return await authService.makeRequest("script.execute", params);
};

const traceroute = async (hostId) => {
  const params = {
    scriptid: "2",
    hostid: hostId,
  };

  return await authService.makeRequest("script.execute", params);
};

const fetchTriggers = async () => {
  const params = {
    output: ["triggerid"],
    selectDependencies: 1,
    filter: { status: "0" },
  };

  return await authService.makeRequest("trigger.get", params);
};

const fetchEvents = async (eventIds) => {
  const params = {
    output: "extend",
    selectAcknowledges: "extend",
    eventids: eventIds,
    sortfield: ["clock"],
    selectHosts: ["hostid", "host"],
    suppressed: 0,
  };

  return await authService.makeRequest("event.get", params);
};

const fetchEnabledHosts = async (groupId) => {
  const params = {
    output: ["hostid"],
    groupids: groupId,
    filter: {
      status: 0, // 0 means enabled hosts
    },
  };

  const result = await authService.makeRequest("host.get", params);
  return result.map((host) => host.hostid);
};

const fetchHostDetails = async (gid) => {
  const params = {
    output: ["hostid", "host"],
    filter: { status: 0 },
  };
  if (gid) {
    params.groupids = gid;
  }

  return await authService.makeRequest("host.get", params);
};

const fetchHostInterface = async () => {
  const params = {
    output: "extend",
    selectHosts: ["hostid", "host"],
    
  };

  return await authService.makeRequest("hostinterface.get", params);
};

const fetchHostStatus  = async (hostid) => {
  const params = {
    output: "extend",
    hostids:hostid,
    selectHostGroups: ["groupid", "name"],
    
  };

  return await authService.makeRequest("host.get", params);
};

const fetchHostGroupDetails = async () => {
  const params = {
    output: "extend",
    selectHosts: ["hostid", "host"],
  };

  return await authService.makeRequest("hostgroup.get", params);
};



const fetchGroupProblemDetails = async (gid) => {
  try {
    console.log("Fetching data...");
    const [triggers, hostDetails] = await Promise.all([
      fetchTriggers(),
      fetchHostDetails(gid),
    ]);

    const activeTriggers = triggers.map((trigger) => trigger.triggerid);
    const hostIds = hostDetails.map((item) => item.hostid);
    const problemDetail = await fetchProblems(hostIds);
    const filteredProblems = problemDetail.filter((problem) =>
      activeTriggers.includes(problem.objectid)
    );

    const eventIds = filteredProblems.map((detail) => detail.eventid);
    const eventAll = await fetchEvents(eventIds);

    eventAll.forEach((event) => {
      const eventTime = parseInt(event.clock) * 1000;
      const currentTime = new Date().getTime();
      const durationInMillis = currentTime - eventTime;

      const seconds = Math.floor(durationInMillis / 1000) % 60;
      const minutes = Math.floor(durationInMillis / (1000 * 60)) % 60;
      const hours = Math.floor(durationInMillis / (1000 * 60 * 60)) % 24;
      const days = Math.floor(durationInMillis / (1000 * 60 * 60 * 24)) % 30;
      const months =
        Math.floor(durationInMillis / (1000 * 60 * 60 * 24 * 30)) % 12;
      const years = Math.floor(
        durationInMillis / (1000 * 60 * 60 * 24 * 30 * 12)
      );

      let durationString = "";
      if (years >= 1) {
        durationString += `${years}Y `;
      }
      if (months >= 1) {
        durationString += `${months}M `;
      }
      if (days >= 1) {
        durationString += `${days}d `;
      }
      if (hours >= 1) {
        durationString += `${hours}h `;
      }
      if (minutes >= 1) {
        durationString += `${minutes}m `;
      }
      durationString += `${seconds}s`;

      durationString = durationString.replace(/,\s*$/, "");

      event.duration = durationString;
    });

    eventAll.sort((a, b) => parseInt(b.clock) - parseInt(a.clock));
    return eventAll;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};

const fetchHostGroupProblems = async () => {
  const hostGroupDetails = await fetchHostGroupDetails();
  const triggers = await fetchTriggers();

  const activeTriggers = triggers.map((trigger) => trigger.triggerid);
  const groupProblemCounts = {};
  const allProblems = {};

  const fetchProblemsPromises = hostGroupDetails.map(async (group) => {
    const groupId = group.groupid;
    const groupName = group.name;
    const enabledHostIds = await fetchEnabledHosts(groupId);
    if (enabledHostIds.length > 0) {
      const problems = await fetchProblems(enabledHostIds);
      const filteredProblems = problems.filter((problem) =>
        activeTriggers.includes(problem.objectid)
      );
      filteredProblems.forEach((problem) => {
        if (!allProblems[problem.eventid]) {
          allProblems[problem.eventid] = problem;
        }
      });
      groupProblemCounts[groupId] = {
        groupName: groupName,
        problemCount: filteredProblems.length,
        totalHosts: enabledHostIds.length,
      };
    } else {
      groupProblemCounts[groupId] = {
        groupName: groupName,
        problemCount: 0,
        totalHosts: 0,
      };
    }
  });

  await Promise.all(fetchProblemsPromises);

  console.log("Problems count for each host group:", groupProblemCounts);
  return {
    allProblems,
    groupProblemCounts,
  };
};

const fetchDataHostProblems = async () => {
  try {
    console.log("Fetching data...");
    const [triggers, hostDetails] = await Promise.all([
      fetchTriggers(),
      fetchHostDetails(),
    ]);

    const activeTriggers = triggers.map((trigger) => trigger.triggerid);
    const hostIds = hostDetails.map((item) => item.hostid);
    const problemDetail = await fetchProblems(hostIds);
    const filteredProblems = problemDetail.filter((problem) =>
      activeTriggers.includes(problem.objectid)
    );

    const eventIds = filteredProblems.map((detail) => detail.eventid);
    const eventAll = await fetchEvents(eventIds);

    eventAll.forEach((event) => {
      const eventTime = parseInt(event.clock) * 1000;
      const currentTime = new Date().getTime();
      const durationInMillis = currentTime - eventTime;

      const seconds = Math.floor(durationInMillis / 1000) % 60;
      const minutes = Math.floor(durationInMillis / (1000 * 60)) % 60;
      const hours = Math.floor(durationInMillis / (1000 * 60 * 60)) % 24;
      const days = Math.floor(durationInMillis / (1000 * 60 * 60 * 24)) % 30;
      const months =
        Math.floor(durationInMillis / (1000 * 60 * 60 * 24 * 30)) % 12;
      const years = Math.floor(
        durationInMillis / (1000 * 60 * 60 * 24 * 30 * 12)
      );

      let durationString = "";
      if (years >= 1) {
        durationString += `${years}Y `;
      }
      if (months >= 1) {
        durationString += `${months}M `;
      }
      if (days >= 1) {
        durationString += `${days}d `;
      }
      if (hours >= 1) {
        durationString += `${hours}h `;
      }
      if (minutes >= 1) {
        durationString += `${minutes}m `;
      }
      durationString += `${seconds}s`;

      durationString = durationString.replace(/,\s*$/, "");

      event.duration = durationString;
    });

    eventAll.sort((a, b) => parseInt(b.clock) - parseInt(a.clock));
    return eventAll;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};

// For HostScreen

// fetchHostDetails

// const fetchHostsInterface = async () => {
//   // const payload = {
//   //   jsonrpc: "2.0",
//   //   method: "hostinterface.get",
//   //   params: {
//   //     output: "ip",
//   //     // hostids: hostId,
//   //     selectHosts: ["hostid", "host"],
//   //   },
//   //   auth: authToken,
//   //   id: 1,
//   // };

//   try {
//     const response = await axiosInstance.post("", payload);
//     // return response.data;
//     const params = {
//       output: "ip",
//       // hostids: hostId,
//       selectHosts: ["hostid", "host"],
//     };
//     return await authService.makeRequest("hostinterface.get", params);
//   } catch (error) {
//     console.error("Error fetching enabled hosts:", error);
//     throw error;
//   }
// };

// const Hostetail = async
// get host id and host name
// for that host id get hostIP, host interface, status from host interface

export {
  authService,
  fetchProblems,
  fetchTriggers,
  fetchEvents,
  fetchEnabledHosts,
  fetchHostDetails,
  fetchHostGroupDetails,
  fetchGroupProblemDetails,
  fetchHostGroupProblems,
  ping,
  traceroute,
  fetchDataHostProblems,

  //
  fetchHostInterface,
  fetchHostStatus,
};
