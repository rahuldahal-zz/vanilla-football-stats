import PreLoader from "./preloader";
const preloader = new PreLoader();
import { fetchData } from "./fetchData";
import LocalStorage from "./localStorage";



export default class Standings {
    constructor(leagueId) {
        this.standingsOutput = document.getElementById("standingsOutput");
        this.teamsOutput = document.getElementById("teamsOutput");
        this.domTable = document.querySelector("#standingsOutput>table");
        this.tableRows = document.querySelectorAll("#standingsOutput tr");
        this.matchesPlayed = [];
        this.leagueId = leagueId || 2002; //change this...
        LocalStorage.prototype.isTeamNamesOnLocalStorage(this.leagueId, "19/20")

            .then((response) => {
                this.shortNames = response;
                console.log(this.shortNames);
                this.fetchStandings();
            });
    }

    //fetch standings
    fetchStandings(leagueId) {
        fetchData("standings", leagueId)
            .then((data) => {
                console.log(data);
                this.populateStandings(data); //populates standingsOutput by giving it the data
                preloader.hideLoader();
                selected.style.transform = "translateY(0)";
            })
            .catch((error) => {
                preloader.hideLoader();
                this.standingsOutput.textContent = error;
            });
    }

    populateStandings(data, type) {
        //hide teams, show standings
        this.teamsOutput.style.display = "none";
        this.standingsOutput.style.display = "block";

        let table;
        if (!type || type === "total")
            table = data.standings[0].table;
        if (type === "home")
            table = data.standings[1].table;
        if (type === "away")
            table = data.standings[2].data;
        console.log(data);

        //reset value of <tr> if value exists

        if (this.tableRows.length) {
            for (let i = 1; i < this.tableRows.length; i++) {
                this.domTable.removeChild(this.tableRows[i]);
            }
        }

        //ends here

        for (let i = 0; i < table.length; i++) {
            //getting team id and matches played
            let team = [table[i].team.id, table[i].playedGames];

            //adding that array into matches played array, as to retrieve later
            this.matchesPlayed.push(team);

            ///
            let teamName;
            for (let j = 0; j < this.shortNames.length; j++) {
                if (this.shortNames[j][0] == table[i].team.id)
                    teamName = this.shortNames[j][1];
            }
            let tr = document.createElement("tr");
            tr.innerHTML = `
                    <td style="text-align: center;">${table[i].position}</td>
                    <td><img src="${
                table[i].team.crestUrl
                }" class="clubLogo"><span  class="teamName">${teamName}</span></td>
                    <td style="text-align: center;">${table[i].playedGames}</td>
                    <td style="text-align: center;">${table[i].won}</td>
                    <td style="text-align: center;">${table[i].draw}</td>
                    <td style="text-align: center;">${table[i].lost}</td>
                    <td style="text-align: center;">${table[i].goalsFor}</td>
                    <td style="text-align: center;">${table[i].goalsAgainst}</td>
                    <td style="text-align: center;">${
                table[i].goalsFor - table[i].goalsAgainst
                }</td>
                    <td class="points" style="text-align: center;">${
                table[i].points
                }</td>
    
              `;
            if (i % 2 == 0)
                tr.children[9].setAttribute(
                    "style",
                    "background-color: #00ff85; text-align: center;"
                );
            else
                tr.children[9].setAttribute(
                    "style",
                    "background-color: #1ab66b; color: #fff; text-align: center;"
                );
            this.domTable.appendChild(tr);
        }

        console.log(this.matchesPlayed);
    }

}