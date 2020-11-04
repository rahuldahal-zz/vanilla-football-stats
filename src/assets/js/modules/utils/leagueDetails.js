var UCL = "#0e1e5b";

const leagueIdAndNameMap = {
    2002: {
        name: "bundesliga",
        hexColor: "#d20515",
        rgbColor: "210, 5, 21"
    },
    2014: {
        name: "laliga",
        hexColor: "#ee8707",
        rgbColor: "238, 135, 7"
    },
    2015: {
        name: "ligueone",
        hexColor: "#dae025",
        rgbColor: "218, 224, 37"
    },
    2019: {
        name: "seriea",
        hexColor: "#008fd7",
        rgbColor: "0, 143, 215"
    },
    2021: {
        name: "premierleague",
        hexColor: "#3d195b",
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
}