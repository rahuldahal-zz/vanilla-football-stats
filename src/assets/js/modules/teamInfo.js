import { fetchData } from "./fetchData";


export default class TeamInfo {
    constructor(teamId) {
        this.teamInfoCard = document.getElementById("teamInfoCard");
        this.previousHomeName = document.getElementById("previousHomeName");
        this.previousHomeGoal = document.getElementById("previousHomeGoal");
        this.previousAwayName = document.getElementById("previousAwayName");
        this.previousAwayGoal = document.getElementById("previousAwayGoal");
        this.lastHomeName = document.getElementById("lastHomeName");
        this.lastHomeGoal = document.getElementById("lastHomeGoal");
        this.lastAwayName = document.getElementById("lastAwayName");
        this.lastAwayGoal = document.getElementById("lastAwayGoal");
        this.nextHomeName = document.getElementById("nextHomeName");
        this.nextAwayName = document.getElementById("nextAwayName");
        this.matchesPlayed = [];

        this.collapseTeamInfo = document.getElementById("collapse");

        this.showTeamInfo(teamId);
        this.events();
    }

    events() {
        this.collapseTeamInfo.addEventListener("click", () => this.hideTeamInfo());
    }


    showTeamInfo(teamId) {
        //always start on top
        this.teamInfoCard.scrollTop = 0;

        this.teamInfoCard.classList.add("teamInfo_active");

        //fetch matches played for calculating current form

        // fetchData("matches", teamId)
        //     .then((data) => this.currentForm(teamId, data, played));


        //populate the template with data
        this.logoWrapper = document.getElementById("logoWrapper"),
            this.clubName = document.getElementById("clubName"),
            this.activeCompetitions = document.getElementById("activeCompetitions"),
            this.country = document.getElementById("country"),
            this.stadiumName = document.getElementById("stadiumName"),
            this.address = document.getElementById("address"),
            this.email = document.getElementById("email"),
            this.website = document.getElementById("website"),
            this.played = null,
            this.manager = document.getElementById("manager"),
            this.players = document.querySelectorAll(".players"),
            this.date = new Date().getFullYear();



        fetchData("particularTeam", teamId)
            .then((data) => {
                console.log(data);

                this.logoWrapper.style.backgroundImage = `url(${data.crestUrl})`;
                this.clubName.innerHTML = `<h1 style="display: inline-block; margin-right: 10px;">${data.name}</h1><small>${data.founded}</small>`;
                this.country.innerHTML = `<h4>Country</h4><em>${data.area.name}</em>`;
                this.stadiumName.textContent = data.venue;

                this.address.innerHTML = `<i class="fas fa-map-marker-alt"></i>${data.address}`;

                if (data.email) {
                    this.email.setAttribute("href", `mailto:${data.email}`);
                    this.email.innerHTML = `<i class="fas fa-at"></i>${data.email}`;
                } else {
                    this.email.innerHTML = ""; //to clear the previous value
                }

                //check for valid URL

                if (data.website.substr(0, 3) == "htt") {
                    this.website.setAttribute("href", `${data.website}`);
                    this.website.innerHTML = `<i class="fas fa-external-link-alt"></i>${data.website}`;
                } else {
                    this.website.innerHTML = "";
                }

                for (let i = 0; i < data.activeCompetitions.length; i++) {
                    let competition = document.createElement("em");
                    competition.textContent = data.activeCompetitions[i].name;
                    this.activeCompetitions.appendChild(competition);
                }

                //matches played
                // understand this...
                for (let i = 0; i < this.matchesPlayed.length; i++) {
                    let team = this.matchesPlayed[i];
                    if (team[0] == teamId) {
                        this.played = team[1];
                        break;
                    }
                }

                //squads

                for (let i = 0; i < data.squad.length; i++) {
                    let player = document.createElement("div");
                    player.setAttribute("class", "player");
                    let name = document.createElement("h4");
                    let p = data.squad[i];
                    name.textContent = p.name;
                    let nationality = document.createElement("var");
                    nationality.textContent = p.nationality;
                    let age = document.createElement("small");
                    let dob = p.dateOfBirth.substr(0, 4);
                    age.textContent = `${this.date - Number(dob)} yrs`;

                    player.appendChild(name);
                    player.appendChild(nationality);
                    player.appendChild(age);

                    //check the position of player and sort accordingly

                    if (p.position === "Goalkeeper") {
                        this.players[0].appendChild(player);
                    } else if (p.position === "Defender") {
                        this.players[1].appendChild(player);
                    } else if (p.position === "Midfielder") {
                        this.players[2].appendChild(player);
                    } else if (p.position === "Attacker") {
                        this.players[3].appendChild(player);
                    }

                    if (p.role === "COACH") {
                        this.manager.appendChild(name);
                        this.manager.appendChild(nationality);
                    }
                }
            });

    }


    hideTeamInfo() {
        this.teamInfoCard.classList.remove("teamInfo_active");
        this.logoWrapper.style.backgroundImage = "";
        this.clubName.textContent = "";
        this.activeCompetitions.innerHTML = "<h4>Active Competitions</h4>";
        this.manager.innerHTML = "<h3>Manager</h3>";
        this.players.forEach((playerWrap) => {
            playerWrap.innerHTML = "";
        });
    }

    currentForm(teamId, data, matchesPlayedCount) {
        let matchesArray = data.matches;
        console.log(matchesArray + "->>>");
        let previousMatch, lastMatch, nextMatch;

        //get the league matchday whose value  = matchesPlayedCount

        for (let i = 0; i < matchesArray.length; i++) {
            let count = 0;
            if (matchesArray[i].matchday == matchesPlayedCount - 1) {
                previousMatch = matchesArray[i];
                count++;
            }
            if (matchesArray[i].matchday == matchesPlayedCount) {
                lastMatch = matchesArray[i];
                count++;
            }
            if (matchesArray[i].matchday == matchesPlayedCount + 1) {
                nextMatch = matchesArray[i];
                count++;
            }
            if (count === 3) break;
        }

        let away = [
            previousMatch.awayTeam,
            lastMatch.awayTeam,
            nextMatch.awayTeam,
        ];
        let awayTeamNames = [];
        let home = [
            previousMatch.homeTeam,
            lastMatch.homeTeam,
            nextMatch.homeTeam,
        ];
        let homeTeamNames = [];
        let scores = [previousMatch.score, lastMatch.score];
        let wonBy = [scores[0].winner, scores[1].winner];

        for (let i = 0; i < shortNames.length; i++) {
            // console.log(shortNames[i][0]);
            if (away[0].id == shortNames[i][0]) awayTeamNames[0] = shortNames[i][1];
            if (away[1].id == shortNames[i][0]) awayTeamNames[1] = shortNames[i][1];
            if (away[2].id == shortNames[i][0]) awayTeamNames[2] = shortNames[i][1];
            if (home[0].id == shortNames[i][0]) homeTeamNames[0] = shortNames[i][1];
            if (home[1].id == shortNames[i][0]) homeTeamNames[1] = shortNames[i][1];
            if (home[2].id == shortNames[i][0]) homeTeamNames[2] = shortNames[i][1];
        }
        console.log(aName, homeTeamNames);

        //[0] = previousMatch [1] = lastMatch

        if (wonBy[0] === "HOME_TEAM") wonBy[0] = home[0].id;
        else if (wonBy[0] === "AWAY_TEAM") wonBy[0] = away[0].id;
        else wonBy[0] = null;

        if (wonBy[1] === "HOME_TEAM") wonBy[1] = home[1].id;
        else if (wonBy[1] === "AWAY_TEAM") wonBy[1] = away[1].id;
        else wonBy[1] = null;

        //check for win
        let result = [];
        if (wonBy[0] == teamId) result[0] = 1;
        //WON
        else if (wonBy[0] == null) result[0] = 0;
        //DREW
        else result[0] = -1; //LOST

        if (wonBy[1] == teamId) result[1] = 1;
        //WON
        else if (wonBy[1] == null) result[1] = 0;
        //DREW
        else result[1] = -1; //LOST

        //checked

        console.log(result);

        //append to the DOM

        /*
     
      previousHomeName = previous home name
      previousHomeGoal = previous home goal, etc
     
      */



        let scoreCards = document.querySelectorAll(".score");

        if (result[0] == 1)
            scoreCards[0].style.borderLeft = "5px solid #00ff85";
        else if (result[0] == -1)
            scoreCards[0].style.borderLeft = "5px solid #A63232";
        else scoreCards[0].style.borderLeft = "5px solid grey";

        if (result[1] == 1)
            scoreCards[1].style.borderLeft = "5px solid #00ff85";
        else if (result[1] == -1)
            scoreCards[1].style.borderLeft = "5px solid #ff9494";
        else scoreCards[1].style.borderLeft = "5px solid grey";

        this.previousHomeName.textContent = homeTeamNames[0];
        this.previousHomeGoal.textContent = scores[0].fullTime.homeTeam;

        this.previousAwayName.textContent = awayTeamNames[0];
        this.previousAwayGoal.textContent = scores[0].fullTime.awayTeam;

        this.lastHomeName.textContent = homeTeamNames[1];
        this.lastHomeGoal.textContent = scores[1].fullTime.homeTeam;

        this.lastAwayName.textContent = awayTeamNames[1];
        this.lastAwayGoal.textContent = scores[1].fullTime.awayTeam;

        this.nextHomeName.textContent = homeTeamNames[2];
        this.nextAwayName.textContent = awayTeamNames[2];

        console.log(matchesArray);
    }

}