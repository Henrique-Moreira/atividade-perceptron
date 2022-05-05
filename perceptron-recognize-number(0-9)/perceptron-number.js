row = 5
col = 3

values = [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1];
position = {};
position.val = 1;
for (let r = 0; r < row; r++) {
    let rowElement = $("<div class='row'>")
    for(let c = 0; c < col; c++) {
        let newPosition = position.val;
        let colElement = $("<div class='col box boxBlue'>")
            .attr('id', newPosition)
            .click(function(){
                calcItem(newPosition);
            });
        rowElement.append(colElement)
        position.val += 1;
    }
    $("#numpad").append(rowElement)
}

var calculatedWeight = calcAllWeight();

function calcItem(position) {
    let id = "#" + position;
    let e = $(id);

    if(e.hasClass("boxBlue")) {
        e.removeClass("boxBlue")
        .addClass("boxRed");
        values[position-1] = 1;
    } else {
        e.removeClass("boxRed")
        .addClass("boxBlue");
        values[position-1] = -1;
    }
}

function calcPerceptron() {
    newValues = [...values]
    newValues.unshift(1);

    let neuron = [];

    for(let i = 0; i < calculatedWeight.length; i++) {
        neuron.push(testWeight(calculatedWeight[i], newValues));
    }

    let results = [
        [-1, -1, -1, -1],
        [-1, 1, -1, -1],
        [-1, -1, 1, -1],
        [-1, 1, 1, -1],
        [-1, 1, 1, 1],
        [1, -1, -1, -1],
        [1, 1, -1, -1],
        [1, -1, 1, -1],
        [1, 1, 1, -1],
        [1, 1, 1, 1]
    ]

    for(let i = 0; i < results.length; i++) {
        let check = 0
        for(let j = 0; j < results[i].length; j++) {
            if(results[i][j] == neuron[j]) {
                check += 1;
            }
        }
        if(check == neuron.length) {
            $("#result").text(i);
            return;
        }
    }

    $("#result").text("Não encontrado");
    
    if (neuron[0] == -1 && neuron[1] == -1 && neuron[0] == -1 && neuron[0] == -1) {
        alert("0");
    }
}