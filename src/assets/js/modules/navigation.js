import PreLoader from "./preloader";
import Teams from "./teamsHandler";
import Standings from "./standingsHandler";

export default class Navigation {

    constructor(leagueId) {
        this.navigationButtons = document.querySelectorAll("#navigation>button");
        this.leagueDropdown = document.getElementById("leagueDropdown");
        this.dropdownLeagues = document.querySelectorAll(".league"),
            this.selected = document.getElementById("selected");
        this.leagueId = leagueId;
        this.events();
    }

    //select for "standings" || "teams" || "scorers"

    events() {
        this.navigationButtons.forEach((stat) => {
            stat.addEventListener("click", (e) => {
                if (!stat.classList.contains("active")) {

                    PreLoader.prototype.showLoader();

                    this.statValue = e.target.getAttribute("id");
                    console.log(this.statValue);

                    // remove the "active" class
                    this.navigationButtons.forEach(btn => {
                        btn.classList.remove("active");
                    })

                    // add the "active" class to targeted element
                    e.target.classList.add("active");

                    if (this.statValue === "standings") new Standings(this.leagueId);
                    else if (this.statValue === "scorers") scorers(data);
                    else if (this.statValue === "teams") new Teams(this.leagueId);
                }
            });
        });

        //showDropDrownItems
        this.selected.addEventListener("click", () => this.toggleDropDown());
        this.selected.addEventListener("keyup", () => this.toggleDropDown());


        //dropdownLeagues dropdown handler
        this.dropdownLeagues.forEach((league) => {
            let selectedLeague = document.querySelector("#selected>span");
            league.addEventListener("click", e => {

                // execute only when the selected "league" is different from "current" league

                if (selectedLeague.textContent != e.currentTarget.textContent) {

                    PreLoader.prototype.showLoader();

                    //collapse the leagueDropdown

                    leagueDropdown.classList.remove("scaleY1");
                    selectedLeague.textContent = e.currentTarget.textContent;

                    //ends

                    selected.style.transform = "translateY(-80px)";

                    //remove/set active class

                    for (let i = 0; i < this.navigationButtons.length; i++) {
                        if (this.navigationButtons[i].classList.contains("active")) {
                            this.navigationButtons[i].classList.remove("active");
                            break;
                        }
                    }

                    //to highlight "standings" initially on every selection
                    this.navigationButtons[2].classList.add("active");


                    this.leagueId = league.dataset.league;
                    teamsOutput.innerHTML = "";

                    //fetch standings
                    new Standings(this.leagueId);

                }
            });
        });


    }



    toggleDropDown() {
        console.log("clicked");
        leagueDropdown.classList.toggle("scaleY1");
    }
}