function handleFetchErrors(res) {
  if (!res.ok) throw new Error("something went wrong");
  return res;
}

const offlineEndpoints = (leagueId) => {
  return {
    leagueDetails: `./backupData/${leagueId}.json`,
    standings: `./backupData/${leagueId}Standings.json`,
    teams: `./backupData/${leagueId}Teams.json`,
    scorers: `./backupData/${leagueId}Scorers.json`,
    particularTeam: `./backupData/athletiMadrid.json`,
    matches: "",
  };
};

const onlineEndpoints = (leagueId) => {
  return {
    leagueDetails: `https://api.football-data.org/v2/competitions/${leagueId}`,
    standings: `https://api.football-data.org/v2/competitions/${leagueId}/standings`,
    teams: `https://api.football-data.org/v2/competitions/${leagueId}/teams`,
    particularTeam: `https://api.football-data.org/v2/teams/${leagueId}`,
    scorers: `https://api.football-data.org/v2/competitions/${leagueId}/scorers`,
    matches: `https://api.football-data.org/v2/teams/${leagueId}/matches/`,
  };
};

export function fetchData(dataToBeFetched, leagueId) {
  const {
    leagueDetails,
    standings,
    teams,
    particularTeam,
    matches,
    scorers,
  } = onlineEndpoints(leagueId);

  return new Promise((resolve, reject) => {
    let url;

    if (!dataToBeFetched) {
      url = leagueDetails;
    }

    if (dataToBeFetched === "standings") {
      url = standings;
    }

    if (dataToBeFetched === "teams") {
      url = teams;
    }

    if (dataToBeFetched === "particularTeam") {
      url = particularTeam;
    }

    if (dataToBeFetched === "matches") {
      url = matches;
    }

    if (dataToBeFetched === "scorers") {
      url = scorers;
    }

    let myHeaders = new Headers({
      "X-Auth-Token": "81e1d8497a114fccac5688e87f6741a0",
    });
    fetch(url, {
      method: "GET",
      headers: myHeaders,
    })
      .then((response) => response.json())
      .then((data) => resolve(data))
      .catch((error) => reject(error));
  });
}
