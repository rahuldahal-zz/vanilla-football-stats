function handleFetchErrors(res) {
  if (!res.ok) throw new Error("something went wrong");
  return res;
}

export function fetchData(dataToBeFetched, id) {
  return new Promise((resolve, reject) => {
    let url;

    if (!dataToBeFetched)
      url = `https://api.football-data.org/v2/competitions/${id}`;
    // url = "./backupData/bundesliga.json";

    if (dataToBeFetched === "standings") {
      url = `https://api.football-data.org/v2/competitions/${id}/${dataToBeFetched}`;
      // url = "./backupData/bundesligaStandings.json";
    }

    if (dataToBeFetched === "teams")
      url = `https://api.football-data.org/v2/competitions/${id}/teams`;
    // url = `./backupData/bundesligaTeams.json`;

    if (dataToBeFetched === "particularTeam")
      // url = `https://api.football-data.org/v2/teams/${id}`;
      url = "./backupData/athletiMadrid.json";

    if (dataToBeFetched === "matches") {
      console.log("No backup data found for matches...");
    }
    // url = `https://api.football-data.org/v2/teams/${id}/matches/`;

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
