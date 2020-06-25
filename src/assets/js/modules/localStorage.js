import { fetchData } from "./fetchData";

export default class LocalStorage {
    isTeamNamesOnLocalStorage(leagueId, season) {
        return new Promise((resolve, reject) => {
            this.key = `${leagueId} ${season}`;
            let shortNames = localStorage.getItem(this.key);
            if (!shortNames) {
                fetchData("teams", leagueId)
                    .then((data) => {
                        this.setShortNamesToLocalStorage(data.teams);
                        console.log("will resolve with shortnames");
                        resolve(JSON.parse(localStorage.getItem(this.key)));
                    })
                    .catch(() => reject("cannot fetch the data"));
            }
            else {
                console.log("already has shortnames...")
                resolve(JSON.parse(shortNames));
            }

        })
    }


    setShortNamesToLocalStorage(teams) {

        // clearing previous values in the array
        this.shortNames = [];

        // pushing "teamId" & "teamShortName"
        this.shortNames = teams.map((team) => [team.id, team.shortName]);

        // set in the LocalStorage
        localStorage.setItem(this.key, JSON.stringify(this.shortNames));
    }


}


// search if adding data to local storage returns a promise

