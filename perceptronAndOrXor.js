// ALGORITMO DE PERCEPTRON COM 3 ENTRADAS, RESOLVENDO O AND, OR OU XOR = ENTRADAS E ALVOS BIPOLARES
// formula => ΔW =  α * [T - f(Yent) ] * X

// α = Taxa de aprendizado (0 < α <= 1)
// X = Valores de entrada
// T = Alvo ou saída desejada	

const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
  });

function calcula(option) {

var α = 1
var θ = 1

// var x1 = [1, 1, 0, 0]
// var x2 = [1, 0, 1, 0]
// var b = [1, 1, 1, 1]
var entradas = [
    [1, 1, 1, 1],
    [1, 1, -1, 1],
    [1, -1, 1, 1],
    [1, -1, -1, 1],
    [-1, 1, 1, 1],
    [-1, 1, -1, 1],
    [-1, -1, 1, 1],
    [-1, -1, -1, 1]
]
var novasEntradas = []
var targetAnd = [1, -1, -1, -1, -1, -1, -1, -1]
var targetOr = [1, 1, 1, 1, 1, 1, 1, -1]
var targetXor = [-1, 1, 1, 1, 1, 1, 1, -1]
var target = [...targetAnd]
switch (option) {
    case "AND":
        var target = [...targetAnd]
      break;
    case "OR":
        var target = [...targetOr]
      break;
    case "XOR":
        var target = [...targetXor]
      break;
  }

var p = [
    [0, 0, 0, 0]
]

var variacaoPeso = 0
var epoca = 0

while (variacaoPeso != 8) {

var yent = []
var fyent = []
var ΔW1 = 0
var ΔW2 = 0
var ΔW3 = 0
var ΔB = 0

epoca += 1;
console.log("----------------------------------------------------")
console.log("Geração de número " + epoca)
for (let i = 0; i < entradas.length; i++) {
    // calcula o yent

    // yent = 0;
    yent.push(
        entradas[i][0] * p[0][0]
        + entradas[i][1] * p[0][1]
        + entradas[i][2] * p[0][2]
        + entradas[i][3] * p[0][3]
    );

    // calcular o fyent, se o valor de yent[i] for maior = 1
    // se for igual = 0, se for menor do que o limiar de
    // disparo - = -1
    if (yent[i] > θ) {
        fyent.push(1)
    } else if (yent[i] < θ * -1) {
        fyent.push(-1)
    } else {
        fyent.push(0)
    }

    // calcular ΔW1, ΔW2 e ΔB
    // ΔW =  α * [T - f(Yent) ] * X
    var coluna = 0;
    ΔW1 = α * (target[i] - fyent[i]) * entradas[i][coluna]
    ΔW2 = α * (target[i] - fyent[i]) * entradas[i][coluna + 1]
    ΔW3 = α * (target[i] - fyent[i]) * entradas[i][coluna + 2]
    ΔB = α * (target[i] - fyent[i]) * entradas[i][coluna + 3]
    coluna = 0;

    p.push([])

    // insere o valor dos novos pesos do array
    p[1].push(ΔW1 + p[0][0])
    p[1].push(ΔW2 + p[0][1])
    p[1].push(ΔW3 + p[0][2])
    p[1].push(ΔB + p[0][3])

    // cria um novo array somente com os novos valores de pesos
    novasEntradas = [[...p[1]]]
    console.log(novasEntradas)
    // insere somente os ultimos pesos encontrados ao array de pesos
    p = novasEntradas

    // console.log(p)

    if ((ΔW1 == 0) && (ΔW2 == 0) && (ΔW3 == 0) && (ΔB == 0)) {
        if (variacaoPeso >= 8) {
            variacaoPeso = 8;
        } else {
            variacaoPeso += 1;
        }
    } else {
        variacaoPeso = 0;
    }
}

console.log("----------------------------------------------------")
}

console.log("////////////////////////////////////////////")
console.log("Pesos finais: " + p)
console.log("Foram necessárias " + epoca + " epoca(s).")
console.log("////////////////////////////////////////////")
}

readline.question('Escolha entre AND, OR ou XOR: ', option => {
    calcula(option);
    readline.close();
  });


