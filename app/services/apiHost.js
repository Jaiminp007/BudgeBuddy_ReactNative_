import axios from "axios";

// const SERVER_URL = "http://43.252.198.181";
// const USERNAME = "Admin";
// const PASSWORD = "Gfgnl@#123";


const SERVER_URL = "https://nms.sanghviinfo.com";
const USERNAME = "snv_monitor";
const PASSWORD = "v4kUtbTYpeu6#9!a";

// Axios instance with interceptors for logging and retry mechanism
const axiosInstance = axios.create({
  baseURL: `${SERVER_URL}/zabbix/api_jsonrpc.php`,
  headers: { "Content-Type": "application/json-rpc" },
  timeout: 3600000,
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

class AuthService {
  constructor() {
    if (!AuthService.instance) {
      AuthService.instance = this;
      this.authToken = null;
    }
    return AuthService.instance;
  }

  async login() {
    if (!this.authToken) {
      const payload = {
        jsonrpc: "2.0",
        method: "user.login",
        params: {
          username: USERNAME,
          password: PASSWORD,
        },
        id: 1,
      };

      try {
        const response = await axiosInstance.post("", payload);
        if (response.data.result) {
          this.authToken = response.data.result;
        } else {
          throw new Error(`Login error: ${JSON.stringify(response.data.error)}`);
        }
      } catch (error) {
        console.error("Error during login:", error.message || error);
        throw error;
      }
    }
    return this.authToken;
  }

  getToken() {
    return this.authToken;
  }
}

const authService = new AuthService();

// Additional functions remain unchanged

const fetchProblems = async (authToken, hostIds) => {
  const payload = {
    jsonrpc: "2.0",
    method: "problem.get",
    params: {
      output: ["triggerids", "objectid", "clock", "severity"],
      hostids: hostIds,
    },
    auth: authToken,
    id: 1,
  };

  try {
    const response = await axiosInstance.post("", payload);
    return response.data.result;
  } catch (error) {
    console.error("Error fetching problems:", error);
    throw error;
  }
};

const ping = async (authToken, hostId) => {
  const payload = {
    jsonrpc: "2.0",
    method: "script.execute",
    params: {
      scriptid: "1",
      hostid: hostId,
    },
    auth: authToken,
    id: 1,
  };

  try {
    const response = await axiosInstance.post("", payload);
    return response.data.result;
  } catch (error) {
    console.error("Error fetching ping:", error);
    throw error;
  }
};

const traceroute = async (authToken, hostId) => {
  const payload = {
    jsonrpc: "2.0",
    method: "script.execute",
    params: {
      scriptid: "2",
      hostid: hostId,
    },
    auth: authToken,
    id: 1,
  };

  try {
    const response = await axiosInstance.post("", payload);
    return response.data.result;
  } catch (error) {
    console.error("Error fetching traceroute:", error);
    throw error;
  }
};

const fetchTriggers = async (authToken) => {
  const payload = {
    jsonrpc: "2.0",
    method: "trigger.get",
    params: {
      output: ["triggerid"],
      selectDependencies: 1,
      filter: { status: "0" },
    },
    auth: authToken,
    id: 1,
  };

  try {
    const response = await axiosInstance.post("", payload);
    return response.data.result;
  } catch (error) {
    console.error("Error fetching triggers:", error);
    throw error;
  }
};

const fetchEvents = async (authToken, eventIds) => {
  const payload = {
    jsonrpc: "2.0",
    method: "event.get",
    params: {
      output: "extend",
      eventids: eventIds,
      sortfield: ["clock"],
      selectHosts: ["hostid", "host"],
      suppressed: 0,
    },
    auth: authToken,
    id: 2,
  };

  try {
    const response = await axiosInstance.post("", payload);
    return response.data.result;
  } catch (error) {
    console.error("Error fetching events:", error);
    throw error;
  }
};

const fetchEnabledHosts = async (authToken, groupId) => {
  const payload = {
    jsonrpc: "2.0",
    method: "host.get",
    params: {
      output: ["hostid"],
      groupids: groupId,
      filter: {
        status: 0, // 0 means enabled hosts
      },
    },
    auth: authToken,
    id: 1,
  };

  try {
    const response = await axiosInstance.post("", payload);
    return response.data.result.map((host) => host.hostid);
  } catch (error) {
    console.error("Error fetching enabled hosts:", error);
    throw error;
  }
};

const fetchHostDetails = async (authToken, gid) => {
  const params = {
    output: ["hostid", "host"],
    filter: { status: 0 },
  };
  if (gid) {
    params.groupids = gid;
  }
  const payload = {
    jsonrpc: "2.0",
    method: "host.get",
    params: params,
    auth: authToken,
    id: 1,
  };

  try {
    const response = await axiosInstance.post("", payload);
    return response.data.result;
  } catch (error) {
    console.error("Error fetching host details:", error);
    throw error;
  }
};

const fetchHostGroupDetails = async (authToken) => {
  const payload = {
    jsonrpc: "2.0",
    method: "hostgroup.get",
    params: {
      output: "extend",
      selectHosts: ["hostid", "host"],
    },
    auth: authToken,
    id: 1,
  };

  try {
    const response = await axiosInstance.post("", payload);
    return response.data.result;
  } catch (error) {
    console.error("Error fetching host group details:", error);
    throw error;
  }
};

const convertUnixToDate = (unixTimestamp) => {
  const milliseconds = unixTimestamp * 1000;
  const dateObject = new Date(milliseconds);
  return dateObject.toLocaleString(); // Adjust date formatting as needed
};

const fetchDataHostProblems = async (authToken) => {
  try {
    console.log("Fetching data...");
    const [triggers, hostDetails] = await Promise.all([
      fetchTriggers(authToken),
      fetchHostDetails(authToken),
    ]);

    const activeTriggers = triggers.map((trigger) => trigger.triggerid);
    const hostIds = hostDetails.map((item) => item.hostid);
    const problemDetail = await fetchProblems(authToken, hostIds);
    const filteredProblems = problemDetail.filter((problem) =>
      activeTriggers.includes(problem.objectid)
    );

    const eventIds = filteredProblems.map((detail) => detail.eventid);
    const eventAll = await fetchEvents(authToken, eventIds);

    eventAll.forEach((event) => {
      const eventTime = parseInt(event.clock) * 1000;
      const currentTime = new Date().getTime();
      const durationInMillis = currentTime - eventTime;

      const seconds = Math.floor(durationInMillis / 1000) % 60;
      const minutes = Math.floor(durationInMillis / (1000 * 60)) % 60;
      const hours = Math.floor(durationInMillis / (1000 * 60 * 60)) % 24;
      const days = Math.floor(durationInMillis / (1000 * 60 * 60 * 24)) % 30;
      const months = Math.floor(durationInMillis / (1000 * 60 * 60 * 24 * 30)) % 12;
      const years = Math.floor(durationInMillis / (1000 * 60 * 60 * 24 * 30 * 12));

      let durationString = '';
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

      durationString = durationString.replace(/,\s*$/, '');

      event.duration = durationString;
    });

    eventAll.sort((a, b) => parseInt(b.clock) - parseInt(a.clock));
    // console.log(eventAll)
    return eventAll;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};

const fetchHostGroupProblems = async (authToken) => {
  try {
    const [hostGroupDetails, triggers] = await Promise.all([
      fetchHostGroupDetails(authToken),
      fetchTriggers(authToken),
    ]);

    const activeTriggers = triggers.map((trigger) => trigger.triggerid);
    const groupProblemCounts = {};
    const allProblems = {};

    const fetchProblemsPromises = hostGroupDetails.map(async (group) => {
      const groupId = group.groupid;
      const groupName = group.name;
      const enabledHostIds = await fetchEnabledHosts(authToken, groupId);
      if (enabledHostIds.length > 0) {
        const problems = await fetchProblems(authToken, enabledHostIds);
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
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};

const fetchGroupProblemDetails = async (authToken, gid) => {
  try {
    console.log("Fetching data...");
    const [triggers, hostDetails] = await Promise.all([
      fetchTriggers(authToken),
      fetchHostDetails(authToken, gid),
    ]);

    const activeTriggers = triggers.map((trigger) => trigger.triggerid);
    const hostIds = hostDetails.map((item) => item.hostid);
    const problemDetail = await fetchProblems(authToken, hostIds);
    const filteredProblems = problemDetail.filter((problem) =>
      activeTriggers.includes(problem.objectid)
    );

    const eventIds = filteredProblems.map((detail) => detail.eventid);
    const eventAll = await fetchEvents(authToken, eventIds);

    eventAll.forEach((event) => {
      const eventTime = parseInt(event.clock) * 1000;
      const currentTime = new Date().getTime();
      const durationInMillis = currentTime - eventTime;

      const seconds = Math.floor(durationInMillis / 1000) % 60;
      const minutes = Math.floor(durationInMillis / (1000 * 60)) % 60;
      const hours = Math.floor(durationInMillis / (1000 * 60 * 60)) % 24;
      const days = Math.floor(durationInMillis / (1000 * 60 * 60 * 24)) % 30;
      const months = Math.floor(durationInMillis / (1000 * 60 * 60 * 24 * 30)) % 12;
      const years = Math.floor(durationInMillis / (1000 * 60 * 60 * 24 * 30 * 12));

      let durationString = '';
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

      durationString = durationString.replace(/,\s*$/, '');

      event.duration = durationString;
    });

    eventAll.sort((a, b) => parseInt(b.clock) - parseInt(a.clock));
    return eventAll;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};

export {
  authService,
  fetchDataHostProblems,
  fetchHostDetails,
  fetchHostGroupProblems,
  fetchGroupProblemDetails,
  ping,
  traceroute,
};
