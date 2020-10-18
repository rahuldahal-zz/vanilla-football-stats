function handleFetchErrors(res) {
  if (!res.ok) throw new Error("something went wrong");
  return res;
}

export function fetchData(dataToBeFetched, leagueId) {
  return new Promise((resolve, reject) => {
    let url;

    if (!dataToBeFetched) {
      url = `https://api.football-data.org/v2/competitions/${leagueId}`;
      // url = `./backupData/${leagueId}.json`;
    }

    if (dataToBeFetched === "standings") {
      url = `https://api.football-data.org/v2/competitions/${leagueId}/${dataToBeFetched}`;
      // url = `./backupData/${leagueId}Standings.json`;
    }

    if (dataToBeFetched === "teams") {
      url = `https://api.football-data.org/v2/competitions/${leagueId}/teams`;
      // url = `./backupData/${leagueId}Teams.json`;
    }

    if (dataToBeFetched === "particularTeam") {
      url = `https://api.football-data.org/v2/teams/${leagueId}`;
      // url = "./backupData/athletiMadrid.json";
    }

    if (dataToBeFetched === "matches") {
      console.log("No backup data found for matches...");
      url = `https://api.football-data.org/v2/teams/${leagueId}/matches/`;
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
