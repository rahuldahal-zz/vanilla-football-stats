import { fetchData } from "./fetchData";
import PreLoader from "./preloader";

export default class Scorers {
  constructor(leagueId) {
    this.leagueId = leagueId;
    this.standingsOutput = document.getElementById("standingsOutput");
    this.teamsOutput = document.getElementById("teamsOutput");
    this.scorersOutput = document.getElementById("scorersOutput");
    this.events();
  }

  // events
  events() {
    this.getData();
  }

  // methods
  getData() {
    fetchData("scorers", this.leagueId).then((data) => {
      this.data = data;
      return this.injectScorers();
    });
  }

  injectScorers() {
    this.standingsOutput.style.display = "none";
    this.teamsOutput.style.display = "none";
    this.scorersOutput.style.display = "flex";
    PreLoader.prototype.hideLoader();

    const scorersWrap = this.scorersOutput.firstElementChild;
    scorersWrap.innerHTML = "";
    const { scorers } = this.data;
    scorers.map((scorer) => {
      const { name, nationality, position, dob } = scorer.player;
      scorersWrap.insertAdjacentHTML(
        "beforeend",
        `
            <div class="scorer">
                <h3 class="name">${name}</h3>
                <p class="position">${position}</p>
                <p class="country">${nationality}</p>
                <span class="age">33 yrs</span>
                <strong class="goals">${scorer.numberOfGoals}</strong> Goals
            </div>
    `
      );
    });
  }
}
