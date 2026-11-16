let oldGameState = {
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

//old function
function oldStartNewGame() {
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

//new function for node.js + jquery
async function startNewGame() {
    try {
        //reset gamestate
        let response = await fetch("/new-game");
        let gameStateData = await response.json();

        updateDiceFaces(gameStateData.diceValues);

        //reset html elements

        //unhold all dice
        for (let i = 0; i < gameStateData.held.length; i++) {
            let response = await fetch("/hold-unhold-dice/" + i + "?reset=true");
            let data = await response.json();
            $("#die" + (i + 1)).css("border", data);
        }

        //hide end screen
        $("#endScreen").css("display", "none");

        //add event listner to all "current" score boxes
        $(".current").off('click').on('click', endRound);

        $(".current").html("");

        $("#upper_subtotal").html("");
        $("#bonus").html("");
        $("#upper_total").html("");

        $("#upper_total2").html("");
        $("#lower_total").html("");
        $("#grand_total").html("");

        $("#roll").html("<strong>Roll " + gameStateData.rollsLeft + "/3</strong>");
        $("#instructions").html("");

    } catch (error) {
        console.error('Error:', error);
    }
}

//old
function oldEndRound(e) {
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

//new for node.js
async function endRound(e) {
    try {
        
        let gameStateResponse = await fetch("/game-state");
        let gameState = await gameStateResponse.json();

        const roundScore = await calculateScore($(this));
        
        let endRoundResponse = await fetch("/end-round/" + $("#upper_section").has(this).length + "/" + roundScore);
        gameState = await endRoundResponse.json();

        $(this).off('click');
        
        $(this).text(roundScore);

        if ($("#upper_section").has(this).length) {
            $("#upper_subtotal").text(gameState.gameScores.upperScore);
            if (gameState.gameScores.bonus) {
                $("#bonus").text(35);
            }
            $("#upper_total").text(gameState.gameScores.upperScore);
            $("#upper_total2").text(gameState.gameScores.upperScore);
        } else if ($("#lower_section").has(this).length) {
            
            $("#lower_total").text(gameState.gameScores.lowerScore);
        }

        $("#grand_total").text(gameState.gameScores.totalScore);

        //reset dice
        for (let i = 0; i < gameState.held.length; i++) {
            let response = await fetch("/hold-unhold-dice/" + i + "?reset=true");
            let data = await response.json();
            $("#die" + (i + 1)).css("border", data);
        }

        diceValues = [0, 0, 0, 0, 0]
        updateDiceFaces(diceValues);

        if (gameState.round > 13) {
            endGame();
        }
    } catch (error) {
        console.error('Error:', error);
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