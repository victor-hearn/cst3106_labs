const express = require('express');
const fs = require("fs");
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

// let dice = [
//     document.getElementById("die1"),
//     document.getElementById("die2"),
//     document.getElementById("die3"),
//     document.getElementById("die4"),
//     document.getElementById("die5")
// ];

let gameState = {
    round: 1,
    player: "",
    scoreUpper: 0,
    bonus: false,
    scoreLower: 0,
    scoreTotal: 0,
    rollsLeft: 0,
    diceValues: [5, 0, 0, 0, 0],
    held: [false, false, false, false, false]
};

app.use(express.static('public'));

app.get('/', (req, res) => {
    fs.readFile('public/mockup.html', function (err, data) {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.write(data);
        return res.end();
    });
});

app.get('/roll-dice', (req, res) => {
    if (gameState.round == 0) {
        res.json(false);
    } else if (gameState.rollsLeft > 0) {
        for (let i = 0; i < gameState.diceValues.length; i++) {
            if (!gameState.held[i]) {
                gameState.diceValues[i] = Math.floor(Math.random() * 6);
            }
        }
        gameState.rollsLeft--;
        res.json(gameState.diceValues);
    } else {
        res.json("Click a score box to end the round");
    }
});

app.get('/hold-unhold-dice/:die', (req, res) => {
    die = req.params.die;
    console.log(die);
    if (!gameState.held[die - 1]) {
        //console.log("die"+die+"; Held: " + held[die-1])
        gameState.held[die - 1] = true
        res.json("5px solid yellow");
    } else {
        //console.log("die"+die+"; Held: " + held[die-1])
        gameState.held[die - 1] = false
        res.json("none");
    }
    res.json();
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