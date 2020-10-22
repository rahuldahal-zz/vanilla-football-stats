import PreLoader from "./preloader";
import TeamInfo from "./teamInfo";
import { fetchData } from "./fetchData";

export default class Teams {
  constructor(leagueId) {
    this.leagueId = leagueId;
    this.fetchTeams();
    this.standingsOutput = document.getElementById("standingsOutput");
    this.teamsOutput = document.getElementById("teamsOutput");
    this.scorersOutput = document.getElementById("scorersOutput");

    // hide "standingsOutput" and display "teamsOutput"
    this.standingsOutput.style.display = "none";
    this.scorersOutput.style.display = "none";
    this.teamsOutput.style.display = "grid";
  }

  fetchTeams() {
    fetchData("teams", this.leagueId)
      .then((data) => {
        this.data = data;
        this.populateTeams();
      })
      .catch((error) => console.log(error));
  }

  // data.count is available on that data, via football-data.org

  populateTeams() {
    PreLoader.prototype.hideLoader();
    console.log(this.data.teams);
    this.data.teams.forEach((theTeam) => {
      //creating the "team" cards

      let team = document.createElement("div");
      team.setAttribute("class", "team");
      team.classList.add("clickable");
      team.setAttribute("data-id", theTeam.id);
      team.addEventListener(
        "click",
        (e) => new TeamInfo(e.currentTarget.dataset.id)
      );

      let logo = document.createElement("img");
      logo.setAttribute("src", theTeam.crestUrl);
      logo.setAttribute("style", "height: 100px;");

      let name = document.createElement("h2");
      name.textContent = theTeam.name;

      let info = document.createElement("div");
      info.setAttribute("class", "info");

      let stadium = document.createElement("h5");
      stadium.textContent = theTeam.venue;

      let founded = document.createElement("small");
      founded.textContent = theTeam.founded;

      team.appendChild(logo);
      info.appendChild(name);
      info.appendChild(stadium);
      info.appendChild(founded);
      team.appendChild(info);
      this.teamsOutput.appendChild(team);
    });
  }
}
