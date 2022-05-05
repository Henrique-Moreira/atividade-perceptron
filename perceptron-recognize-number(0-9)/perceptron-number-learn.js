var threshold = 1
var rate = 1

var x = [
    [1,     1, 1, 1,    1, -1, 1,   1, -1, 1,    1, -1, 1,    1, 1, 1],
    [1,     -1, 1, -1,    1, 1, -1,   -1, 1, -1,    -1, 1, -1,    1, 1, 1],
    [1,     1, 1, 1,    -1, -1, 1,   1, 1, 1,    1, -1, -1,    1, 1, 1],
    [1,     1, 1, 1,    -1, -1, 1,   1, 1, 1,    -1, -1, 1,    1, 1, 1],
    [1,     1, -1, 1,    1, -1, 1,   1, 1, 1,    -1, -1, 1,    -1, -1, 1],
    [1,     1, 1, 1,    1, -1, -1,   1, 1, 1,    -1, -1, 1,    1, 1, 1],
    [1,     1, 1, 1,    1, -1, -1,   1, 1, 1,    1, -1, 1,    1, 1, 1],
    [1,     1, 1, 1,    -1, -1, 1,   -1, -1, 1,    -1, -1, 1,    -1, -1, 1],
    [1,     1, 1, 1,    1, -1, 1,   1, 1, 1,    1, -1, 1,    1, 1, 1],
    [1,     1, 1, 1,    1, -1, 1,   1, 1, 1,    -1, -1, 1,    1, 1, 1],
];

var target = [
    [-1, -1, -1, -1, -1, 1, 1, 1, 1, 1],
    [-1, 1, -1, 1, 1, -1, 1, -1, 1, 1],
    [-1, -1, 1, 1, 1, -1, -1, 1, 1, 1],
    [-1, -1, -1, -1, 1, -1, -1, -1, -1, 1],
];

function calcAllWeight() {
    let arrMaster = []
    for(let i = 0; i < target.length; i++) {
        let arr = calcWeight(target[i]);
        arrMaster.push(arr);
    }
    return arrMaster;
}

function calcWeight(t) {
    let stoppedWeight = 0;
    let generation = 1;

    let w = [
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0] 
    ];

    while(true) {
        if (generation != 1) {
            let oldW = w[w.length-1];
            let newW = [];
            newW.push(...oldW);
            w = [newW];
        }

        for (let i = 0; i < x.length; i++) {
            let yent = 0;
            let fYent;

            // Calculate Yent
            for (let j = 0; j < x[i].length; j++) {
                yent += x[i][j] * w[i][j]
            }

            // Calculate FYent
            if (yent > threshold){
                fYent = 1
            } else if(yent < (threshold * -1)){
                fYent = -1
            } else {
                fYent = 0
            }

            w.push([])

            let stoppedWeightNow = 0;

            // Calculate Weight
            for (let j = 0; j < x[i].length; j++) {
                if (fYent != t[i]) {
                    stoppedWeightNow = 0
                    deltaW = rate * (t[i] - fYent) * x[i][j]
                    weightBefore = w[i][j]
                    w[i+1].push(deltaW + weightBefore)
                } else {
                    stoppedWeightNow += 1
                    w[i+1].push(w[i][j])
                }
            }

            if (stoppedWeightNow >= x[i].length) {
                stoppedWeight += 1
            } else {
                stoppedWeight = 0
            }

            // Test Weight
            let result = 0
            if (stoppedWeight >= x.length) {
                for (let k = 0; k < x.length; k++) {
                    let yentWeight = 0;
                    let fYentWeight;
                    // Calculate Yent
                    for (let l = 0; l < x[k].length; l++) {
                        yentWeight += x[k][l] * w[i+1][l]
                    }

                    // Calculate FYent
                    if (yentWeight > threshold){
                        fYentWeight = 1
                    } else if(yentWeight < (threshold * -1)){
                        fYentWeight = -1
                    } else {
                        fYentWeight = 0
                    }

                    if (fYentWeight == t[k]){
                        result += 1
                    }
                }
                if (result == x.length){
                    console.log("Result found !");
                    console.log(w[i+1]);
                    console.log("Generation: " + generation);
                    return w[w.length - 1];
                }
                    
            }

        }
        console.log("---------------------------------------");
        console.log("Generation: " + generation);
        console.log("Last weight: " + w[w.length - 1]);
        console.log("---------------------------------------");
        
        generation += 1;

        if (generation == 1000) {
            return;
        }
    }
    
}

function testWeight(w, e) {
    // w -> Weight
    // e -> Entry
    let yentWeight = 0;
    let fYentWeight;
    // Calculate Yent
    for (let i = 0; i < w.length; i++) {
        yentWeight += w[i] * e[i];
    }

    // Calculate FYent
    if (yentWeight > threshold){
        fYentWeight = 1
    } else if(yentWeight < (threshold * -1)){
        fYentWeight = -1
    } else {
        fYentWeight = 0
    }

    return fYentWeight;
}



