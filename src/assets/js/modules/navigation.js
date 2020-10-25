import PreLoader from "./utils/preloader";
import Teams from "./teamsHandler";
import Standings from "./standingsHandler";
import Scorers from "./scorersHandler";
import Router from "./utils/router";

const leagueIdAndNameMap = {
  2002: "bundesliga",
  2014: "laliga",
  2015: "ligueone",
  2019: "seriea",
  2021: "premierleague",
};

let hasBeenCalledOnce = false;

export default class Navigation {
  constructor(leagueId) {
    console.log("navigation is called...");
    this.leagueId = leagueId;
    if (!hasBeenCalledOnce) {
      hasBeenCalledOnce = true;
      this.selectDOMElements();
      this.events();
      this.routesForDropdownLeagues();
      this.routesForNavigationButtons();
    }
  }

  selectDOMElements() {
    console.log("selecting DOM elements...");
    this.navigationButtons = document.querySelectorAll("#navigation>button");
    this.dropdownLeagueContainer = document.getElementById(
      "dropdownLeagueContainer"
    );
    this.filterStandingsBtn = document.querySelectorAll(
      "#filterButtonsWrap button"
    );
    this.dropdownLeagues = document.querySelectorAll(".league");
    this.selected = document.getElementById("selected");
  }

  routesForNavigationButtons() {
    // select for "standings" || "teams" || "scorers"
    this.navigationButtons.forEach((stat) => {
      new Router({
        link: stat,
        path: `/${leagueIdAndNameMap[this.leagueId]}/${stat.getAttribute(
          "id"
        )}`,
        callback: () => this.navMenuCallback(stat),
      });
    });
  }

  routesForDropdownLeagues() {
    this.dropdownLeagues.forEach((league) => {
      new Router({
        link: league,
        callback: () => this.dropdownLeaguesCallback(league),
      });
    });
  }

  events() {
    console.log("events is called");
    // showDropDrownItems
    this.selected.addEventListener("click", (e) => this.toggleDropDown(e));
    this.selected.addEventListener("keyup", (e) => this.toggleDropDown(e));

    // filter standings
    this.filterStandingsBtn.forEach((btn) => {
      btn.addEventListener(
        "click",
        () => {
          if (!btn.classList.contains("activeFilter")) {
            console.log("clicked on filter button");

            this.filterStandingsBtn.forEach((btn) =>
              btn.classList.remove("activeFilter")
            );
            btn.classList.add("activeFilter");

            new Standings().populateStandings(btn.dataset.tableType);
          }
        },
        true
      );
    });
  }

  navMenuCallback(stat) {
    // only run if it's not already active

    if (!stat.classList.contains("active")) {
      PreLoader.prototype.showLoader();

      this.statValue = stat.getAttribute("id");
      console.log("clicked on stat: ", this.statValue);

      // remove the "active" class
      this.navigationButtons.forEach((btn) => {
        btn.classList.remove("active");
      });

      // add the "active" class to targeted element
      stat.classList.add("active");

      if (this.statValue === "standings") new Standings(this.leagueId).init();
      else if (this.statValue === "scorers") new Scorers(this.leagueId);
      else if (this.statValue === "teams") new Teams(this.leagueId);
    }
  }

  highlightStat(stat, arrayOfStats) {
    const array = this.navigationButtons || arrayOfStats;
    switch (stat) {
      case "teams":
        this.removeClassFromAndAddTo(array, array[0], "active");
        break;
      case "scorers":
        this.removeClassFromAndAddTo(array, array[1], "active");
        break;
      case "standings":
        this.removeClassFromAndAddTo(array, array[2], "active");
        break;
    }
  }

  removeClassFromAndAddTo(elements, elementToAddTo, className) {
    elements.forEach((elem) => elem.classList.remove(className));
    elementToAddTo.classList.add(className);
  }

  dropdownLeaguesCallback(league) {
    console.log("dropdown callback is called");
    this.leagueId = league.dataset.league;
    this.routesForNavigationButtons();
    let selectedLeague = document.querySelector("#selected>span");
    // execute only when the selected "league" is different from "current" league

    if (selectedLeague.textContent != league.textContent) {
      PreLoader.prototype.showLoader();

      // collapse the dropdownLeagueContainer

      dropdownLeagueContainer.classList.remove("scaleY1");
      selectedLeague.textContent = league.textContent;

      // ends

      selected.style.transform = "translateY(-80px)";

      // to highlight "standings" initially on every selection
      this.highlightStat("standings");

      teamsOutput.innerHTML = "";

      // fetch standings
      new Standings(this.leagueId).init();
      this.highlightOverallFilterInitially();
    }
  }

  highlightOverallFilterInitially() {
    this.filterStandingsBtn.forEach((btn) => {
      btn.classList.remove("activeFilter");
    });

    this.filterStandingsBtn[0].classList.add("activeFilter");
  }

  toggleDropDown(e) {
    console.log(e.type);
    this.dropdownLeagueContainer.classList.toggle("scaleY1");
  }
}
