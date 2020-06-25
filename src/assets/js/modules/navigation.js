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
                this.statValue = e.target.getAttribute("id");
                console.log(this.statValue);
                for (let i = 0; i < this.navigationButtons.length; i++) {
                    if (this.navigationButtons[i].classList.contains("active")) {
                        this.navigationButtons[i].classList.remove("active");
                        break;
                    }
                }

                e.target.classList.add("active");

                PreLoader.prototype.showLoader();

                if (this.statValue === "standings") new Standings(this.leagueId);
                else if (this.statValue === "scorers") scorers(data);
                else if (this.statValue === "teams") new Teams(this.leagueId);

                PreLoader.prototype.hideLoader();
            });
        });

        //showDropDrownItems
        this.selected.addEventListener("click", () => this.toggleDropDown());
        this.selected.addEventListener("keyup", () => this.toggleDropDown());


        //dropdownLeagues dropdown handler
        this.dropdownLeagues.forEach((league) => {
            league.addEventListener("click", () => {

                //collapse the leagueDropdown

                leagueDropdown.classList.remove("scaleY1");
                document.querySelector("#selected>span").textContent =
                    league.textContent;

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

            });
        });


    }


    toggleDropDown() {
        console.log("clicked");
        leagueDropdown.classList.toggle("scaleY1");
    }
}