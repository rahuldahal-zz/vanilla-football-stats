function handleFetchErrors(res) {
    if (!res.ok) throw new Error("something went wrong");
    return res;
}

export function fetchData(dataToBeFetched, id) {

    return new Promise((resolve, reject) => {
        // let url = `http://api.football-data.org/v2/competitions/${id}/${dataToBeFetched}`;
        let url = "./backupData/bundesligaStandings.json";

        if (dataToBeFetched === "teams")
            url = `./backupData/bundesligaTeams.json`;
        if (dataToBeFetched === "particularTeam")
            // url = `http://api.football-data.org/v2/teams/${id}`;
            url = "./backupData/athletiMadrid.json";
        if (dataToBeFetched === "matches")
            url = `http://api.football-data.org/v2/teams/${id}/matches/`;

        console.log(url);

        fetch(
            url,
            {
                headers: {
                    "X-Auth-Token": "81e1d8497a114fccac5688e87f6741a0"
                }
            }
        )
            .then((response) => response.json())
            .then((data) => resolve(data))
            .catch(error => reject(error))
    })
}
