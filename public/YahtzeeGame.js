let gameState = {
    round: 0,
    player: "",
    scoreUpper: 0,
    bonus: false,
    scoreLower: 0,
    scoreTotal: 0,
    rollsLeft: 0
};

let previousGame = {
    ones: 0,
    twos: 0,
    threes: 0,
    fours: 0,
    fives: 0,
    sixes: 0,
    bonus: 0,
    toak: 0,
    foak: 0,
    fullHouse: 0,
    smStraight: 0,
    lgStraight: 0,
    yahtzee: 0,
    chance: 0,
    total: 0
}

let bestGame = {
    ones: 0,
    twos: 0,
    threes: 0,
    fours: 0,
    fives: 0,
    sixes: 0,
    bonus: 0,
    toak: 0,
    foak: 0,
    fullHouse: 0,
    smStraight: 0,
    lgStraight: 0,
    yahtzee: 0,
    chance: 0,
    total: 0
}

function startNewGame() {
    document.getElementById("endScreen").style = "display: none";
    document.querySelectorAll('.current').forEach(slot => slot.addEventListener('click', endRound));
    let scoreBoxes = document.getElementsByClassName("current");

    for (let i = 0; i < scoreBoxes.length; i++) {
        scoreBoxes[i].innerHTML = "";
    }

    document.getElementById("upper_subtotal").innerHTML = "";
    document.getElementById("bonus").innerHTML = "";
    document.getElementById("upper_total").innerHTML = "";

    document.getElementById("upper_total2").innerHTML = "";
    document.getElementById("lower_total").innerHTML = "";
    document.getElementById("grand_total").innerHTML = "";


    //reset dice
    for (let i = 1; i < 6; i++) {
        unhold(i);
    }
    diceValues = [0, 0, 0, 0, 0]
    updateDiceFaces(diceValues);

    gameState = {
        round: 1,
        player: "",
        scoreUpper: 0,
        bonus: false,
        scoreLower: 0,
        scoreTotal: 0,
        rollsLeft: 3
    };
    document.getElementById("roll").innerHTML = "<strong>Roll " + gameState.rollsLeft + "/3</strong>"
    document.getElementById("instructions").innerHTML = "";
}

function endRound(e) {
    // console.log("endRound Called");
    const roundScore = calculateScore(getDiceValues().toSorted(), e.currentTarget);
    e.currentTarget.innerHTML = roundScore;

    if (document.getElementById("upper_section").contains(e.currentTarget)) {
        gameState.scoreUpper += roundScore;
        document.getElementById("upper_subtotal").innerHTML = gameState.scoreUpper;
        if (gameState.scoreUpper > 63) {
            gameState.bonus = true;
            document.getElementById("bonus").innerHTML = 35;
            gameState.scoreUpper += 35;
        }
        document.getElementById("upper_total").innerHTML = gameState.scoreUpper;
        document.getElementById("upper_total2").innerHTML = gameState.scoreUpper;
    } else if (document.getElementById("lower_section").contains(e.currentTarget)) {
        gameState.scoreLower += roundScore;
        document.getElementById("lower_total").innerHTML = gameState.scoreLower;
    }

    gameState.scoreTotal = gameState.scoreLower + gameState.scoreUpper;
    document.getElementById("grand_total").innerHTML = gameState.scoreTotal;

    //reset dice
    for (let i = 1; i < 6; i++) {
        unhold(i);
    }
    diceValues = [0, 0, 0, 0, 0]
    updateDiceFaces(diceValues);

    if (gameState.round == 13) {
        endGame();
    } else {
        gameState.round++;
        gameState.rollsLeft = 3;
        document.getElementById("roll").innerHTML = "<strong>Roll " + gameState.rollsLeft + "/3</strong>"
        document.getElementById("instructions").innerHTML = "";
    }
}

function endGame() {
    previousGame = getGameScores();
    if (previousGame.total > bestGame.total) {
        bestGame = previousGame;
    }
    document.getElementById("endScore").innerHTML = gameState.scoreTotal;
    document.getElementById("endScreen").style = "display: block";
}

function getGameScores() {
    let game = {
        ones: document.getElementById("ones").innerHTML,
        twos: document.getElementById("twos").innerHTML,
        threes: document.getElementById("threes").innerHTML,
        fours: document.getElementById("fours").innerHTML,
        fives: document.getElementById("fives").innerHTML,
        sixes: document.getElementById("sixes").innerHTML,
        bonus: document.getElementById("bonus").innerHTML,
        toak: document.getElementById("toak").innerHTML,
        foak: document.getElementById("foak").innerHTML,
        fullHouse: document.getElementById("full_house").innerHTML,
        smStraight: document.getElementById("sm_straight").innerHTML,
        lgStraight: document.getElementById("lg_straight").innerHTML,
        yahtzee: document.getElementById("yahtzee").innerHTML,
        chance: document.getElementById("chance").innerHTML,
        total: document.getElementById("grand_total").innerHTML
    }
    return game;
}

function updateHTML() {

}