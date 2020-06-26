function handleFetchErrors(res) {
    if (!res.ok) throw new Error("something went wrong");
    return res;
}

export function fetchData(dataToBeFetched, id) {

    return new Promise((resolve, reject) => {


        let url;

        if (!dataToBeFetched)
            url = `https://api.football-data.org/v2/competitions/${id}`;
        // url = "./backupData/bundesliga.json"

        if (dataToBeFetched === "standings") {
            url = `https://api.football-data.org/v2/competitions/${id}/${dataToBeFetched}`;
            // let url = "./backupData/bundesligaStandings.json";
        }

        if (dataToBeFetched === "teams")
            url = `https://api.football-data.org/v2/competitions/${id}/teams`;
        // url = `./backupData/bundesligaTeams.json`;

        if (dataToBeFetched === "particularTeam")
            url = `https://api.football-data.org/v2/teams/${id}`;
        // url = "./backupData/athletiMadrid.json";

        if (dataToBeFetched === "matches")
            url = `https://api.football-data.org/v2/teams/${id}/matches/`;

        console.log(url);

        fetch(
            url,
            {
                method: "GET",
                headers: {
                    "X-Auth-Token": process.env.API_KEY,

                    "Access-Control-Allow-Headers": "Access-Control-Allow-Headers, Origin, Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers, Authorization, Access-Control-Allow-Origin",

                    "Access-Control-Request-Headers": "Access-Control-Allow-Headers, Origin, Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers, Authorization, Access-Control-Allow-Origin",

                    "Access-Control-Allow-Methods": "PUT, GET, POST, OPTIONS",


                    "Access-Control-Allow-Origin": "*"

                }
            }
        )
            .then((response) => response.json())
            .then((data) => resolve(data))
            .catch(error => reject(error))
    })
}
