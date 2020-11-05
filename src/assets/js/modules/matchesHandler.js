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
    this.events();
    new Navigation().highlightStat(
        "matches",
        document.querySelectorAll("#navigation>button")
      );
}

  // events
  events() {
    this.clearStorage.addEventListener("click", ()=>{
      localStorage.clear();
      location.reload();
    })
  }

  // methods

  selectDOMElements(){
    this.standingsOutput = document.getElementById("standingsOutput");
    this.scorersOutput = document.getElementById("scorersOutput");
    this.teamsOutput = document.getElementById("teamsOutput");
    this.matchesOutput = document.getElementById("matchesOutput");
    this.clearStorage = document.getElementById("clearStorage");

    this.standingsOutput.style.display = "none";
    this.matchesOutput.style.display = "flex";
    this.teamsOutput.style.display = "none";
    this.scorersOutput.style.display = "none";
  }

  fetchShortNames(){
    console.log(`fetching for ${this.leagueId}`);
    fetchData(null, this.leagueId)
    .then((leagueDetails) =>{
      this.matchDay = leagueDetails.currentSeason.currentMatchday;
      return LocalStorage.prototype.isTeamNamesOnLocalStorage(
        this.leagueId,
        leagueDetails.currentSeason.startDate
      );
    })
    .then((response) => {
      this.shortNames = response;
      this.fetchUpcomingMatches();
    })
    .catch((err) => {
      console.error(err);
      flash.error("there was an error while fetching the resource.");
    });
  }

  fetchUpcomingMatches(){
      fetchData("matches", this.leagueId, {matchday: this.matchDay+1})
      .then(data=>{
          PreLoader.prototype.hideLoader();
          this.matches = data.matches;
          this.populateMatches();
      })
      .catch(err=>console.log(err))
  }

  populateMatches(){
    this.matchesOutput.scrollTop = 0;
    const matchesWrap = this.matchesOutput.firstElementChild;
    matchesWrap.innerHTML = "";
    for(let match of this.matches){
      let {homeTeam, awayTeam, utcDate} = match;
      const date = new Date(utcDate);
      homeTeam = this.shortNames.find(name=>name.id === homeTeam.id);
      awayTeam = this.shortNames.find(name=>name.id === awayTeam.id);
      matchesWrap.insertAdjacentHTML("beforeend", `
        <div class="match">
          <div class="team">
            <div class="homeTeam">
              <img src="${homeTeam.crestUrl}" alt="${homeTeam.shortName} logo">
              <h3>${homeTeam.shortName}</h3>
            </div>
            <strong>v/s</strong>
            <div class="awayTeam">
              <img src="${awayTeam.crestUrl}" alt="${awayTeam.shortName} logo">
              <h3>${awayTeam.shortName}</h3>
            </div>
          </div>
          <small class="date">${date.toLocaleString()}</small>
        </div>
      `)
    }
  }
}