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

        let myHeaders = new Headers({
            "Access-Control-Allow-Methods": "GET",
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Headers": "x-auth-token, x-response-control,access-control-allow-origin, access-control-allow-headers",
            "Content-Length": 0,
            "Content-Type": "text/plain",


            // "X-Auth-Token": process.env.API_KEY
            "X-Auth-Token": "81e1d8497a114fccac5688e87f6741a0"

        });
        fetch(
            url,
            {
                method: "GET",
                headers: myHeaders
            }
        )
            .then((response) => response.json())
            .then((data) => resolve(data))
            .catch(error => reject(error))
    })
}
