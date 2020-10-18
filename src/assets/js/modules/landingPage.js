import PreLoader from "./preloader";
import Standings from "./standingsHandler";
import Navigation from "./navigation";

export default class LandingPage {
  constructor() {
    this.landingContent = document.getElementById("landingContent");
    this.leagues = document.querySelectorAll("#selectLeague button");
    this.leagueId;
    this.handleButtons();
  }

  handleButtons() {
    this.leagues.forEach((league) => {
      league.addEventListener("click", (e) => {
        // show loader
        PreLoader.prototype.showLoader();

        this.leagueId = e.currentTarget.dataset.league;
        //change the "selected-league" text on the top-left of the screen
        document.querySelector("#selected>span").textContent =
          league.dataset.leagueName;

        //display the "header" and "nav"
        document.querySelector("header").style.display = "flex";
        document.querySelector("nav").style.display = "flex";

        //hide the "landingContent" and show the standings
        landingContent.style.display = "none";

        //start to fetch things
        new Navigation(this.leagueId);
        new Standings(this.leagueId).init();
      });
    });
  }
}
