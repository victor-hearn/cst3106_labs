const express = require('express');
const app = express();
const PORT = 3000;

const dieFace1 = "<div class=\"pip middle\"></div>";
const dieFace2 = "<div class=\"pip top-left\"></div> <div class=\"pip bottom-right\"></div>";
const dieFace3 = "<div class=\"pip top-left\"></div> <div class=\"pip middle\"></div> <div class=\"pip bottom-right\"></div>";
const dieFace4 = "<div class=\"pip top-left\"></div> <div class=\"pip top-right\"></div> <div class=\"pip bottom-left\"></div> <div class=\"pip bottom-right\"></div>";
const dieFace5 = "<div class=\"pip top-left\"></div> <div class=\"pip top-right\"></div> <div class=\"pip middle\"></div> <div class=\"pip bottom-left\"></div> <div class=\"pip bottom-right\"></div>";
const dieFace6 = "<div class=\"pip top-left\"></div> <div class=\"pip top-right\"></div> <div class=\"pip middle-left\"></div> <div class=\"pip middle-right\"></div> <div class=\"pip bottom-left\"></div> <div class=\"pip bottom-right\"></div>";


let faceValues = [dieFace1, dieFace2, dieFace3, dieFace4, dieFace5, dieFace6];

let diceValues = [0, 0, 0, 0, 0];

let held = [false, false, false, false, false];

let dice = [
    document.getElementById("die1"),
    document.getElementById("die2"),
    document.getElementById("die3"),
    document.getElementById("die4"),
    document.getElementById("die5")
];

let gameState = {
    round: 0,
    player: "",
    scoreUpper: 0,
    bonus: false,
    scoreLower: 0,
    scoreTotal: 0,
    rollsLeft: 0
};

app.use(express.static('public'));

app.get('/roll-dice', (req, res) => {
    const dice = Array.from({ length: 5 }, () => Math.floor(Math.random() * 6) + 1);
    res.json(dice);
});

app.get('/hold-unhold-dice', (req, res) => {
    if (!held[die - 1]) {
        //console.log("die"+die+"; Held: " + held[die-1])
        held[die - 1] = true
        document.getElementById("die" + die).style = "border: 5px solid yellow;"
    } else {
        //console.log("die"+die+"; Held: " + held[die-1])
        held[die - 1] = false
        document.getElementById("die" + die).style = "border: none;"
    }
});

app.get('/dice-values', (req, res) => {

});

app.get('/calc-score', (req, res) => {

});

app.get('/new-game', (req, res) => {

});

app.get('/end-round', (req, res) => {

});

app.get('/end-game', (req, res) => {

});

app.get('/get-game=scores', (req, res) => {

});

app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));