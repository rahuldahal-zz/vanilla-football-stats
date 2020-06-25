let windowHeight = window.innerHeight;
let windowWidth = window.innerWidth;

//standings

//check screen size and "shorten" the "table-heading" for small screen

if (windowWidth <= 1024) for1024();

function for1024() {
    let th = document.querySelectorAll("#standingsOutput th");
    th[0].textContent = "";
    th[2].textContent = "MP";
    th[3].textContent = "W";
    th[4].textContent = "D";
    th[5].textContent = "L";
    th[6].textContent = "GF";
    th[7].textContent = "GA";
    th[8].textContent = "GD";
    th[9].textContent = "Pts.";
}





