const express = require('express');
const fs = require("fs");
const app = express();
const PORT = 3000;


let gameState = {
    round: 1,
    player: "",
    rollsLeft: 99999,
    diceValues: [5, 0, 0, 0, 0],
    held: [false, false, false, false, false],
    gameScores: {
        ones: 0,
        twos: 0,
        threes: 0,
        fours: 0,
        fives: 0,
        sixes: 0,
        bonus: false,
        upperScore: 0,
        toak: 0,
        foak: 0,
        fullHouse: 0,
        smStraight: 0,
        lgStraight: 0,
        yahtzee: 0,
        chance: 0,
        lowerScore: 0,
        totalScore: 0
    }
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
        res.json({ values: gameState.diceValues, rolls: gameState.rollsLeft });
    } else {
        res.json("Click a score box to end the round");
    }
});

app.get('/hold-unhold-dice/:die', (req, res) => {
    die = req.params.die;
    if (!gameState.held[die - 1] && !req.query.reset) {
        gameState.held[die - 1] = true
        res.json("5px solid yellow");
    } else {
        gameState.held[die - 1] = false
        res.json("none");
    }
});

app.get('/game-state', (req, res) => {
    res.json(gameState);
});

app.get('/calc-score/:box', (req, res) => {
    //will calculate the score based on the dice values and the box provided, then update that, boxes html
    let score = 0;

    const counts = [0, 0, 0, 0, 0, 0];

    gameState.diceValues.forEach(val => {
        counts[val]++;
    });


    switch (req.params.box) {
        //upper
        case "ones":
            score = counts[0];
            break;
        case "twos":
            score = counts[1] * 2;
            break;
        case "threes":
            score = counts[2] * 3;
            break;
        case "fours":
            score = counts[3] * 4;
            break;
        case "fives":
            score = counts[4] * 5;
            break;
        case "sixes":
            score = counts[5] * 6;
            break;
        //lower
        case "toak":
            for (let i = 0; i < counts.length; i++) {
                if (counts[i] >= 3) {
                    score = (i + 1) * 3
                    break;
                }
            }
            break;
        case "foak":
            for (let i = 0; i < counts.length; i++) {
                if (counts[i] >= 4) {
                    score = (i + 1) * 4
                    break;
                }
            }
            break;
        case "full_house":
            if (counts.includes(3) && counts.includes(2)) {
                score = ((counts.indexOf(3) + 1) * 3) + ((counts.indexOf(2) + 1) * 2)
                if (score < 25) {
                    score = 25;
                }
            }
            break;
        case "sm_straight":
            for (let start = 0; start <= 2; start++) {
                if (
                    counts[start] > 0 &&
                    counts[start + 1] > 0 &&
                    counts[start + 2] > 0 &&
                    counts[start + 3] > 0
                ) {
                    score = 30;
                    break;
                }
            }
            break;
        case "lg_straight":
            for (let i = 0; i < counts.length; i++) {
                if (counts[i] > 1) {
                    score = 0;
                }
            }
            score = 40;
            break;
        case "yahtzee":
            if (counts.includes(5)) {
                score = 50;
            }
            break;
        case "chance":
            gameState.diceValues.forEach(val => {
                score += val + 1;
            });
            break;
        default:
            console.log("invalid selection");
            break;
    }

    res.json(score);

});

app.get('/new-game', (req, res) => {

    gameState = {
        round: 1,
        player: "",
        rollsLeft: 3,
        diceValues: [0, 0, 0, 0, 0],
        held: [false, false, false, false, false],
        gameScores: {
            ones: 0,
            twos: 0,
            threes: 0,
            fours: 0,
            fives: 0,
            sixes: 0,
            bonus: false,
            upperScore: 0,
            toak: 0,
            foak: 0,
            fullHouse: 0,
            smStraight: 0,
            lgStraight: 0,
            yahtzee: 0,
            chance: 0,
            lowerScore: 0,
            totalScore: 0
        }
    };

    res.json(gameState);
});

app.get('/end-round/:table/:roundScore', (req, res) => {
    try {

        const roundScore = parseInt(req.params.roundScore);

        if (req.params.table) {
            gameState.gameScores.upperScore += roundScore;
            if (gameState.gameScores.upperScore >= 63) {
                gameState.gameScores.bonus = true;
                gameState.gameScores.upperScore += 35;
            }
        } else {
            gameState.gameScores.lowerScore += roundScore;
        }

        gameState.gameScores.totalScore = gameState.gameScores.lowerScore + gameState.gameScores.upperScore;

        gameState.diceValues = [0, 0, 0, 0, 0]

        gameState.round++;
        gameState.rollsLeft = 3;

        res.json(gameState);
    } catch (error) {
        console.error('Error:', error);
    }
});

app.get('/end-game', (req, res) => {

});

app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));