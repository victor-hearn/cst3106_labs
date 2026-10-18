const dieFace1 = "<div class=\"pip middle\"></div>";
const dieFace2 = "<div class=\"pip top-left\"></div> <div class=\"pip bottom-right\"></div>";
const dieFace3 = "<div class=\"pip top-left\"></div> <div class=\"pip middle\"></div> <div class=\"pip bottom-right\"></div>";
const dieFace4 = "<div class=\"pip top-left\"></div> <div class=\"pip top-right\"></div> <div class=\"pip bottom-left\"></div> <div class=\"pip bottom-right\"></div>";
const dieFace5 = "<div class=\"pip top-left\"></div> <div class=\"pip top-right\"></div> <div class=\"pip middle\"></div> <div class=\"pip bottom-left\"></div> <div class=\"pip bottom-right\"></div>";
const dieFace6 = "<div class=\"pip top-left\"></div> <div class=\"pip top-right\"></div> <div class=\"pip middle-left\"></div> <div class=\"pip middle-right\"></div> <div class=\"pip bottom-left\"></div> <div class=\"pip bottom-right\"></div>";


let faceValues = [dieFace1, dieFace2, dieFace3, dieFace4, dieFace5, dieFace6];

function roll() {
    let diceValues = [1, 1, 1, 1, 1];
    for (let i = 0; i < diceValues.length; i++) {
        diceValues[i] = Math.floor(Math.random() * 6);
    }
    updateDiceFaces(diceValues);
    calculateScore(diceValues);
}

function updateDiceFaces(values) {
    let dice = [
        document.getElementById("die1"),
        document.getElementById("die2"),
        document.getElementById("die3"),
        document.getElementById("die4"),
        document.getElementById("die5")
    ];

    for (let i =0; i < 5; i++) {
        dice[i].innerHTML = faceValues[values[i]];
    }

}

function updateDiceHTML(hidden) {
    let dice = [
        document.getElementById("die1"),
        document.getElementById("die2"),
        document.getElementById("die3"),
        document.getElementById("die4"),
        document.getElementById("die5")
    ];
    let btn = document.getElementById("roll");

    for (let i = 0; i < 5; i++) {
        if (hidden) {
            console.log("hidden: true");
            dice[i].style = "top: 0; opacity: 1;";
        } else {
            console.log("hidden: false");
            dice[i].style = "top: " + (btn.getBoundingClientRect().top - dice[i].getBoundingClientRect().top) + "px; opacity: 0;";
        }
    }

}

async function animateDice() {
    const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));
    updateDiceHTML(false);

    await sleep(2000);

    updateDiceHTML(true);

    await sleep(500);

    for (let i = 0; i < 15; i++) {
        roll()
        await sleep(100);
    }
}