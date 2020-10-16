import PreLoader from "./preloader";
import { fetchData } from "./fetchData";
import LocalStorage from "./localStorage";
import TeamInfo from "./teamInfo";

export default class Standings {
  constructor(leagueId) {
    this.standingsOutput = document.getElementById("standingsOutput");
    this.teamsOutput = document.getElementById("teamsOutput");
    this.domTable = document.querySelector("#standingsOutput>table");
    this.filterStandingsBtn = document.querySelectorAll(
      "#filterButtonsWrap button"
    );
    this.matchesPlayed = [];
    this.leagueId = leagueId || 2002; // change this...
    console.log("standings: ", leagueId);

    this.windowWidth = window.innerWidth;
    this.shortenTableHeadingForSmallScreens();
    this.init();
  }

  // check if "shortNames" with current "season" is on LocalStorage
  // leagueDetails will have the list of all the seasons, and of course currentSeason

  init() {
    fetchData(null, this.leagueId)
      .then((leagueDetails) =>
        LocalStorage.prototype.isTeamNamesOnLocalStorage(
          this.leagueId,
          leagueDetails.currentSeason.startDate
        )
      )
      .then((response) => {
        this.shortNames = response;
        console.log("Short names: ", this.shortNames);
        this.fetchStandings();
      });
  }

  // fetch standings
  fetchStandings() {
    fetchData("standings", this.leagueId)
      .then((data) => {
        this.data = data;
        console.log(
          "The data in fetch standings: ",
          this.data.competition.name
        );
        this.populateStandings();
        this.filterStandings();
        PreLoader.prototype.hideLoader();
        selected.style.transform = "translateY(0)";
      })
      .catch((error) => {
        PreLoader.prototype.hideLoader();
        this.standingsOutput.textContent = error;
      });
  }

  // filter standings
  filterStandings() {
    console.log("on filter standings: ", this.data.competition.name);

    this.filterStandingsBtn.forEach((btn) => {
      btn.addEventListener("click", () => {
        if (!btn.classList.contains("activeFilter")) {
          console.log("Data in filter: ", this.data.competition.name);

          this.filterStandingsBtn.forEach((btn) =>
            btn.classList.remove("activeFilter")
          );
          btn.classList.add("activeFilter");

          this.populateStandings(btn.dataset.tableType);
        }
      });
    });
  }

  populateStandings(type) {
    console.log("The standings data: ", this.data.competition.name);
    console.log("By type: ", type);
    // hide teams, show standings
    this.teamsOutput.style.display = "none";
    this.standingsOutput.style.display = "flex";

    this.matchesPlayed = [];
    this.tableRows = Array.from(
      document.querySelectorAll("#standingsOutput tr")
    );

    let table;
    // table = the "table" from the response
    if (!type || type === "total") table = this.data.standings[0].table;
    if (type === "home") table = this.data.standings[1].table;
    if (type === "away") table = this.data.standings[2].table;

    // reset value of <tr> if value exists, except the first one(th)

    this.tableRows.forEach((row, index) => {
      if (index > 0) {
        this.domTable.removeChild(row);
      }
    });

    // ends here

    // start populating the content

    for (let standing of table) {
      // getting team id and matches played
      let team = [standing.team.id, standing.playedGames];

      // adding that array into matches played array, as to retrieve later
      this.matchesPlayed.push(team);

      let teamName;
      for (let shortName of this.shortNames) {
        if (shortName[0] == standing.team.id) {
          teamName = shortName[1];
        }
      }
      let tr = document.createElement("tr");
      // ${ standing.team.crestUrl} img src
      tr.innerHTML = `
                    <td style="text-align: center;">${standing.position}</td>

                    <td class="showTeamInfo" data-id="${
                      standing.team.id
                    }"><img src="" class="clubLogo"><span  class="teamName">${teamName}</span></td>

                    <td style="text-align: center;">${standing.playedGames}</td>
                    <td style="text-align: center;">${standing.won}</td>
                    <td style="text-align: center;">${standing.draw}</td>
                    <td style="text-align: center;">${standing.lost}</td>
                    <td style="text-align: center;">${standing.goalsFor}</td>
                    <td style="text-align: center;">${
                      standing.goalsAgainst
                    }</td>
                    <td style="text-align: center;">${
                      standing.goalsFor - standing.goalsAgainst
                    }</td>
                    <td class="points" style="text-align: center;">${
                      standing.points
                    }</td>

              `;

      // append the "table-row" to the "table element"
      this.domTable.appendChild(tr);
    }

    console.log("Matches played: ", this.matchesPlayed);
    this.showTeamInfoHandler();
  }

  showTeamInfoHandler() {
    this.teamNames = document.querySelectorAll(".showTeamInfo");
    this.teamNames.forEach((team) => {
      team.style.cursor = "pointer";
      team.addEventListener("click", (e) => {
        console.log(e.currentTarget);
        console.log(e.currentTarget.dataset.id);
        new TeamInfo(e.currentTarget.dataset.id);
      });
    });
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
