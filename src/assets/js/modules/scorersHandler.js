import { fetchData } from "./utils/fetchData";
import PreLoader from "./utils/preloader";

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
    console.log(this.data);

    // always start on top
    this.scorersOutput.scrollTop = 0;
    const scorersWrap = this.scorersOutput.firstElementChild;
    scorersWrap.innerHTML = "";
    const { scorers } = this.data;
    scorers.map((scorer) => {
      const { name, nationality, position, dateOfBirth } = scorer.player;
      scorersWrap.insertAdjacentHTML(
        "beforeend",
        `
            <div class="scorer">
            <h2 class="goals">${scorer.numberOfGoals} Goals</h2> 
                <h4 class="name">${name}</h4>
                <p class="position">${position}</p>
                <p class="country">${nationality}</p>
                <span class="age">${
                  new Date().getFullYear() - new Date(dateOfBirth).getFullYear()
                } yrs</span>
            </div>
    `
      );
    });
  }
}
