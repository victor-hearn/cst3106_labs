const dieFace1 = "<div class=\"pip middle\"></div>";
const dieFace2 = "<div class=\"pip top-left\"></div> <div class=\"pip bottom-right\"></div>";
const dieFace3 = "<div class=\"pip top-left\"></div> <div class=\"pip middle\"></div> <div class=\"pip bottom-right\"></div>";
const dieFace4 = "<div class=\"pip top-left\"></div> <div class=\"pip top-right\"></div> <div class=\"pip bottom-left\"></div> <div class=\"pip bottom-right\"></div>";
const dieFace5 = "<div class=\"pip top-left\"></div> <div class=\"pip top-right\"></div> <div class=\"pip middle\"></div> <div class=\"pip bottom-left\"></div> <div class=\"pip bottom-right\"></div>";
const dieFace6 = "<div class=\"pip top-left\"></div> <div class=\"pip top-right\"></div> <div class=\"pip middle-left\"></div> <div class=\"pip middle-right\"></div> <div class=\"pip bottom-left\"></div> <div class=\"pip bottom-right\"></div>";


let faceValues = [dieFace1, dieFace2, dieFace3, dieFace4, dieFace5, dieFace6];

let diceValues = [0, 0, 0, 0, 0];

let held = [false, false, false, false, false];

//old js only method
function roll() {
    if (gameState.round == 0) {
        return;
    } else if (gameState.rollsLeft > 0) {
        for (let i = 0; i < diceValues.length; i++) {
            if (!held[i]) {
                diceValues[i] = Math.floor(Math.random() * 6);
            }
        }
        updateDiceFaces(diceValues);

        gameState.rollsLeft--;
        document.getElementById("roll").innerHTML = "<strong>Roll " + gameState.rollsLeft + "/3</strong>"
    } else {
        document.getElementById("instructions").innerHTML = "Click a score box to end the round";
    }
}

//new method for node.js
async function rollDice() {
    try {
        let response = await fetch("/roll-dice");
        let data = await response.json();

        console.log(data);

        switch (typeof data) {
            case "string":
                $("#instructions").text(data);
                break;
            case "object":
                updateDiceFaces(data);
                break;
            case "boolean":
                break;
        }

    } catch (error) {
        console.error('Error:', error);
    }
}

//old js only method
function hold(die) {
    if (!held[die - 1]) {
        //console.log("die"+die+"; Held: " + held[die-1])
        held[die - 1] = true
        document.getElementById("die" + die).style = "border: 5px solid yellow;"
    } else {
        //console.log("die"+die+"; Held: " + held[die-1])
        held[die - 1] = false
        document.getElementById("die" + die).style = "border: none;"
    }
}

//new method for node.js
async function holdDie(die) {
    try {
        let response = await fetch("/hold-unhold-dice/" + die);
        let data = await response.json();
        $("#die" + die).css("border", data);
    } catch (error) {
        console.error('Error:', error);
    }
}

function updateDiceFaces(values) {
    for (let i = 0; i < 5; i++) {
        $("#die" + (i + 1)).html(faceValues[values[i]]);
    }

}

//currently unused
function updateDiceHTML(hidden) {
    let btn = $("#roll");

    for (let i = 0; i < 5; i++) {
        die = $("#die" + (i + 1));
        if (hidden) {
            console.log("hidden: true");
            die.css({"top": "0", "opacity": "1"});
        } else {
            console.log("hidden: false");
            die.css({"top": ((btn.offset().top - die.offset().top) + "px"), "opacity": "0"});
        }
    }

}

//currently unused + old
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

//old js only method
function oldGetDiceValues() {
    return diceValues;
}

//new method for node.js
async function getDiceValues() {
    try {
        let response = await fetch("/dice-values");
        return response.json();
    } catch (error) {
        console.error('Error:', error);
    }
}