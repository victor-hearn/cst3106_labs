function calculateScore(diceValues, box) {
    //will calculate the score based on the dice values and the box provided, then update that, boxes html
    let score = 0;
    if (isValidSelection(box)) {

        const counts = [0, 0, 0, 0, 0, 0];

        diceValues.forEach(val => {
            counts[val]++;
        });

        // console.log(counts);

        switch (box.id) {
            //upper
            case "ones":
                // console.log("ones");
                score = counts[0];
                break;
            case "twos":
                // console.log("twos");
                score = counts[1] * 2;
                break;
            case "threes":
                // console.log("threes");
                score = counts[2] * 3;
                break;
            case "fours":
                // console.log("fours");
                score = counts[3] * 4;
                break;
            case "fives":
                // console.log("fives");
                score = counts[4] * 5;
                break;
            case "sixes":
                // console.log("sixes");
                score = counts[5] * 6;
                break;
            //lower
            case "toak":
                // console.log("toak");

                for (let i = 0; i < counts.length; i++) {
                    if (counts[i] >= 3) {
                        score = (i + 1) * 3
                        break;
                    }
                }
                break;
            case "foak":
                // console.log("foak");

                for (let i = 0; i < counts.length; i++) {
                    if (counts[i] >= 4) {
                        score = (i + 1) * 4
                        break;
                    }
                }
                break;
            case "full_house":
                // console.log("full_house");

                if (counts.includes(3) && counts.includes(2)) {
                    score = ((counts.indexOf(3) + 1) * 3) + ((counts.indexOf(2) + 1) * 2)
                    if (score < 25) {
                        score = 25;
                    }
                }
                break;
            case "sm_straight":
                // console.log("sm_straight");

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
                // console.log("lg_straight");

                for (let i = 0; i < counts.length; i++) {
                    if (counts[i] > 1) {
                        return 0;
                    }
                }
                score = 40;
                break;
            case "yahtzee":
                // console.log("yahtzee");
                if (counts.includes(5)) {
                    score = 50;
                }
                break;
            case "chance":
                // console.log("chance");
                diceValues.forEach(val => {
                    score += val + 1;
                });
                break;
            default:
                console.log("invalid selection");
                break;
        }
        return score;
    } else {
        console.log("invalid");
    }
}

function isValidSelection(selection) {
    // Will use event listeners to check which element is being clicked, check if it is a valid place to put a score (ie does this spot have a score already), then call calculateScore with the dice values and the box to put the score into
    return selection.innerHTML == "";
}