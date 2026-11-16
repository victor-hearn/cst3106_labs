const dieFace1 = "<div class=\"pip middle\"></div>";
const dieFace2 = "<div class=\"pip top-left\"></div> <div class=\"pip bottom-right\"></div>";
const dieFace3 = "<div class=\"pip top-left\"></div> <div class=\"pip middle\"></div> <div class=\"pip bottom-right\"></div>";
const dieFace4 = "<div class=\"pip top-left\"></div> <div class=\"pip top-right\"></div> <div class=\"pip bottom-left\"></div> <div class=\"pip bottom-right\"></div>";
const dieFace5 = "<div class=\"pip top-left\"></div> <div class=\"pip top-right\"></div> <div class=\"pip middle\"></div> <div class=\"pip bottom-left\"></div> <div class=\"pip bottom-right\"></div>";
const dieFace6 = "<div class=\"pip top-left\"></div> <div class=\"pip top-right\"></div> <div class=\"pip middle-left\"></div> <div class=\"pip middle-right\"></div> <div class=\"pip bottom-left\"></div> <div class=\"pip bottom-right\"></div>";


let faceValues = [dieFace1, dieFace2, dieFace3, dieFace4, dieFace5, dieFace6];



//new method for node.js
async function rollDice() {
    try {
        let response = await fetch("/roll-dice");
        let data = await response.json();

        switch (typeof data) {
            case "string":
                $("#instructions").text(data);
                break;
            case "object":
                updateDiceFaces(data.values);
                $("#roll").html("<strong>Roll " + data.rolls + "/3</strong>")
                break;
            case "boolean":
                break;
        }

    } catch (error) {
        console.error('Error:', error);
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
