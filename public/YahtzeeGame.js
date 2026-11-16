
//new function for node.js + jquery
async function startNewGame() {
    try {
        //reset gamestate
        let response = await fetch("/new-game");
        let gameStateData = await response.json();

        updateDiceFaces(gameStateData.diceValues);

        //reset html elements

        //unhold all dice
        for (let i = 1; i <= gameStateData.held.length; i++) {
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



//new for node.js
async function endRound(e) {
    try {
        const roundScore = await calculateScore($(this));
        
        let endRoundResponse = await fetch("/end-round/" + $("#upper_section").has(this).length + "/" + roundScore);
        gameState = await endRoundResponse.json();

        $(this).off('click');
        
        $(this).text(roundScore);

        let scores = gameState.gameScores;

        if ($("#upper_section").has(this).length) {
            $("#upper_subtotal").text(scores.upperScore);
            if (scores.bonus) {
                $("#bonus").text(35);
            }
            $("#upper_total").text(scores.upperScore);
            $("#upper_total2").text(scores.upperScore);
        } else if ($("#lower_section").has(this).length) {
            
            $("#lower_total").text(scores.lowerScore);
        }

        $("#grand_total").text(scores.totalScore);

        //reset dice
        for (let i = 1; i <= gameState.held.length; i++) {
            let response = await fetch("/hold-unhold-dice/" + i + "?reset=true");
            let data = await response.json();
            $("#die" + (i + 1)).css("border", data);
        }

        diceValues = [0, 0, 0, 0, 0]
        updateDiceFaces(diceValues);

        if (gameState.round > 13) {
            endGame();
        }

        $("#roll").html("<strong>Roll " + gameState.rollsLeft + "/3</strong>");
    } catch (error) {
        console.error('Error:', error);
    }
}



//new for node.js + jquery
async function endGame() {
    let response = await fetch("/end-game");
    let data = await response.json();
    $("#endScore").text(data);
    $("#endScreen").css("display", "block");
}



