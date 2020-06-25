import { fetchData } from "./fetchData";

export default class LocalStorage {
    isTeamNamesOnLocalStorage(leagueId, season) {
        return new Promise((resolve, reject) => {
            let shortNames = localStorage.getItem(leagueId);
            if (!shortNames || shortNames.season != season) {
                fetchData("teams", leagueId)
                    .then((data) => {
                        this.season = data.season.startDate;
                        this.setShortNamesToLocalStorage(leagueId, data.teams);
                        console.log("will resolve with shortnames");
                        resolve(JSON.parse(localStorage.getItem(leagueId)));
                    })
                    .catch(() => reject("cannot fetch the data"));
            }
            else {
                resolve(JSON.parse(shortNames));
            }

        })
    }


    setShortNamesToLocalStorage(leagueId, teams, season) {
        //clearing previous values in the array
        this.shortNames = [];

        //pushing "teamId" & "teamShortName"
        teams.forEach((team) => {
            let shortName = [team.id, team.shortName];

            this.shortNames.push(shortName);
        });

        this.shortNames.season = season;
        //set "current-season" as well
        localStorage.setItem(leagueId, JSON.stringify(this.shortNames));
    }


}


//search if adding data to local storage returns a promise

