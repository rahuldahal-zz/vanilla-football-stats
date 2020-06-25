import PreLoader from "./preloader";
import { fetchData } from "./fetchData";
import LocalStorage from "./localStorage";
import TeamInfo from "./teamInfo";


export default class Standings {

    constructor(leagueId) {
        this.standingsOutput = document.getElementById("standingsOutput");
        this.teamsOutput = document.getElementById("teamsOutput");
        this.domTable = document.querySelector("#standingsOutput>table");
        this.filterStandingsBtn = document.querySelectorAll("#filterButtonsWrap button");
        this.matchesPlayed = [];
        this.leagueId = leagueId || 2002; //change this...
        this.windowWidth = window.innerWidth;
        this.shortenTableHeadingForSmallScreens();
        this.init();
    }


    // check if "shortNames" with current "season" is on LocalStorage
    // leagueDetails will have the list of all the seasons, and of course currentSeason

    init() {
        fetchData(null, this.leagueId)
            .then((leagueDetails) => LocalStorage.prototype.isTeamNamesOnLocalStorage(this.leagueId, leagueDetails.currentSeason.startDate))
            .then((response) => {
                this.shortNames = response;
                console.log(this.shortNames);
                this.fetchStandings();
            })
    }

    //fetch standings
    fetchStandings() {

        fetchData("standings", this.leagueId)
            .then((data) => {
                this.data = data;
                this.populateStandings(this.data); //populates standingsOutput by giving it the data
                this.filterStandings();
                PreLoader.prototype.hideLoader();
                selected.style.transform = "translateY(0)";
            })
            .catch((error) => {
                PreLoader.prototype.hideLoader();
                this.standingsOutput.textContent = error;
            });
    }

    //filter standings
    filterStandings() {
        this.filterStandingsBtn.forEach((btn) => {

            btn.addEventListener("click", () => {
                if (!btn.classList.contains("activeFilter")) {
                    this.filterStandingsBtn.forEach((btn) => btn.classList.remove("activeFilter"));
                    btn.classList.add("activeFilter");
                    this.populateStandings(this.data, btn.dataset.tableType);
                }
            });
        })
    }

    populateStandings(data, type) {
        console.log(data);
        //hide teams, show standings
        this.teamsOutput.style.display = "none";
        this.standingsOutput.style.display = "flex";

        this.matchesPlayed = [];
        this.tableRows = document.querySelectorAll("#standingsOutput tr");

        let table;
        // table = the "table" from the response
        if (!type || type === "total")
            table = data.standings[0].table;
        if (type === "home")
            table = data.standings[1].table;
        if (type === "away")
            table = data.standings[2].table;

        //reset value of <tr> if value exists

        if (this.tableRows.length) {
            // ignores the first "row", cause it contains "th"
            for (let i = 1; i < this.tableRows.length; i++) {
                this.domTable.removeChild(this.tableRows[i]);
            }
        }

        //ends here

        // start populating the content

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
                   
                    <td class="showTeamInfo" data-id="${table[i].team.id}"><img src="${table[i].team.crestUrl}" class="clubLogo"><span  class="teamName">${teamName}</span></td>
                    


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
            //alternating background colors
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

            //append the "table-row" to the "table element"
            this.domTable.appendChild(tr);
        }

        console.log(this.matchesPlayed);
        this.showTeamInfoHandler()
    }


    showTeamInfoHandler() {
        this.teamNames = document.querySelectorAll(".showTeamInfo");
        this.teamNames.forEach((team) => {
            team.style.cursor = "pointer";
            team.addEventListener("click", e => {
                console.log(e.currentTarget);
                console.log(e.currentTarget.dataset.id);
                new TeamInfo(e.currentTarget.dataset.id);
            })
        })
    }



    shortenTableHeadingForSmallScreens() {
        //standings

        //check screen size and "shorten" the "table-heading" for small screen

        if (this.windowWidth <= 1024) for1024();

        function for1024() {
            let th = document.querySelectorAll("#standingsOutput th");
            th[0].textContent = "";
            th[2].textContent = "MP";
            th[3].textContent = "W";
            th[4].textContent = "D";
            th[5].textContent = "L";
            th[6].textContent = "GF";
            th[7].textContent = "GA";
            th[8].textContent = "GD";
            th[9].textContent = "Pts.";
        }
    }

}
