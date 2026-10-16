let dice = [1,1,1,1,1];


const dieValue1 = "<div class=\"pip middle\"></div>";
const dieValue2 = "<div class=\"pip top-left\"></div> <div class=\"pip bottom-right\"></div>";
const dieValue3 = "<div class=\"pip top-left\"></div> <div class=\"pip middle\"></div> <div class=\"pip bottom-right\"></div>";
const dieValue4 = "<div class=\"pip top-left\"></div> <div class=\"pip top-right\"></div> <div class=\"pip bottom-left\"></div> <div class=\"pip bottom-right\"></div>";
const dieValue5 = "<div class=\"pip top-left\"></div> <div class=\"pip top-right\"></div> <div class=\"pip middle\"></div> <div class=\"pip bottom-left\"></div> <div class=\"pip bottom-right\"></div>";
const dieValue6 = "<div class=\"pip top-left\"></div> <div class=\"pip top-right\"></div> <div class=\"pip middle-left\"></div> <div class=\"pip middle-right\"></div> <div class=\"pip bottom-left\"></div> <div class=\"pip bottom-right\"></div>";


let diceValues = [dieValue1, dieValue2, dieValue3, dieValue4, dieValue5, dieValue6]

function roll() {
    for (let i = 0; i < dice.length; i++) {
        dice[i] = Math.floor(Math.random() * 6 + 1);
        // console.log("rolled a " + dice[i])
    }
    updateDiceHTML();
}

function updateDiceHTML() {
    console.log(dice[0]);
    document.getElementById("die1").innerHTML = diceValues[dice[0] - 1];
    document.getElementById("die2").innerHTML = diceValues[dice[1] - 1];
    document.getElementById("die3").innerHTML = diceValues[dice[2] - 1];
    document.getElementById("die4").innerHTML = diceValues[dice[3] - 1];
    document.getElementById("die5").innerHTML = diceValues[dice[4] - 1];
}

async function animateDice() {
    const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));
    for (let i = 0; i < 10; i++) {
        roll()
       await sleep(100);
    }
}