var UCL = "#0e1e5b";

const leagueIdAndNameMap = {
    2002: {
        name: "bundesliga",
        hexColor: "#d20515",
        accentColor: "#ffffff",
        rgbColor: "210, 5, 21"
    },
    2014: {
        name: "laliga",
        hexColor: "#ee8707",
        accentColor: "#fbec21",
        rgbColor: "238, 135, 7"
    },
    2015: {
        name: "ligueone",
        hexColor: "#dae025",
        accentColor: "#12233f",
        rgbColor: "218, 224, 37"
    },
    2019: {
        name: "seriea",
        hexColor: "#008fd7",
        accentColor: "#024494",
        rgbColor: "0, 143, 215"
    },
    2021: {
        name: "premierleague",
        hexColor: "#3d195b",
        accentColor: "#e90052",
        rgbColor: "61, 25, 91"
    },
  };



export default class LeagueDetails{
    constructor(){
    }

    getOne(id){
        return leagueIdAndNameMap[id];
    }

    getName(id){
        return leagueIdAndNameMap[id].name;
    }

    getHexColor(id){
        return leagueIdAndNameMap[id].hexColor;
    }

    getRGBColor(id){
        return leagueIdAndNameMap[id].rgbColor;
    }

    getAccentColor(id){
        return leagueIdAndNameMap[id].accentColor;
    }
}