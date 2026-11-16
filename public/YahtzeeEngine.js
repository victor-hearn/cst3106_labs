
//new method for node.js
async function calculateScore(box) {
    let response = await fetch("/calc-score/" + box.attr("id"));
    return await response.json();
}

