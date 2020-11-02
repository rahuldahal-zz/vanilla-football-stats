import PreLoader from "./utils/preloader";
import { fetchData } from "./utils/fetchData";
import LocalStorage from "./utils/localStorage";
import TeamInfo from "./teamInfo";
import FlashMessage from "./utils/flashMessage";
const flash = new FlashMessage();
import Navigation from "./navigation";

export default class Matches{
  constructor(leagueId) {
    this.leagueId = leagueId;
    this.fetchShortNames();
    this.selectDOMElements();
    new Navigation().highlightStat(
        "matches",
        document.querySelectorAll("#navigation>button")
      );
}

  // events
  events() {
  }

  // methods

  selectDOMElements(){
    this.standingsOutput = document.getElementById("standingsOutput");
    this.scorersOutput = document.getElementById("scorersOutput");
    this.teamsOutput = document.getElementById("teamsOutput");
    this.matchesOutput = document.getElementById("matchesOutput");

    this.standingsOutput.style.display = "none";
    this.matchesOutput.style.display = "flex";
    this.teamsOutput.style.display = "none";
    this.scorersOutput.style.display = "none";
  }

  fetchShortNames(){
    fetchData(null, this.leagueId)
    .then((leagueDetails) =>
      LocalStorage.prototype.isTeamNamesOnLocalStorage(
        this.leagueId,
        leagueDetails.currentSeason.startDate
      )
    )
    .then((response) => {
      this.shortNames = response;
      this.fetchMatches();
    })
    .catch((err) => {
      console.error(err);
      flash.error("there was an error while fetching the resource.");
    });
  }

  fetchMatches(){
      fetchData("matches", this.leagueId)
      .then(data=>{
          PreLoader.prototype.hideLoader();
          console.log(data);
      })
      .catch(err=>console.log(err))
  }
}