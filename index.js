const prompt = require('prompt-sync')();

var participantes = [];
var vitorias = [];
var jogadas = +prompt("quantas jogadas iram acontecer? ");
var jogadores = +prompt("quantos jogadores iram participar? ");
// for para montar a lista com os objetos contendo os nomes dos jogadores
for (let j = 0; j < jogadores; j++) {
    let jogador = { nome: "", numeroTirado: [] };
    jogador.nome = prompt(`diga seu nome participante nº ${j+1}:`);
    participantes.push(jogador);
}
// for adicionando os numros sortidos de todas as rodadas
for (let i = 0; i < jogadas; i++) {
    for (let j = 0; j < jogadores; j++) {
        participantes[j].numeroTirado.push(Math.floor(Math.random() * (6 - 1 + 1) + 1));
    }
}
//console.log.(participantes);
// for's criando a matriz onde ira guardar o nome dos jogadores junto com as vitorias de cada rodada
for (let i = 0; i < jogadores; i++) {
    vitorias.push([]);
    for (let j = 0; j <= jogadas; j++) {
        vitorias[i][j] = 0;
    }
}
for (let i = 0; i < jogadores; i++) {
    vitorias[i][0] = participantes[i].nome;
}
//console.log(vitorias)
for (let i = 0; i < jogadas; i++) {
    let rodadas = [];
    let maior = 0;
    let nome = "";
    //for para montar uma mini matriz com o nome dos jogadores e o valor do dado tirado em cada rodada
    for (let j = 0; j < jogadores; j++) {
        rodadas.push([participantes[j].nome, participantes[j].numeroTirado[i]]);
    }
    //console.log(rodadas)
    //duplo for para fazer a função de sort
    for (let contador = 1; contador < jogadores; contador++) {
        for (let j = 0; j < jogadores - 1; j++) {
            if (rodadas[j][1] < rodadas[j + 1][1]) {
                let aux = rodadas[j];
                rodadas[j] = rodadas[j + 1];
                rodadas[j + 1] = aux;
            }
        }
    }
    //for para verificar os empates de cada rodada
    for (let j = 0; j < jogadores; j++) {
        if (maior === rodadas[j][1]) {
            nome = "$#@";
            break;
        } else if (maior < rodadas[j][1]) {
            maior = rodadas[j][1];
            nome = rodadas[j][0];
        }
    }
    //for para marca a vitoria do jogador na rodada que se esta verificando
    for (let j = 0; j < jogadores; j++) {
        if (nome == vitorias[j][0]) {
            vitorias[j][i + 1]++;
        }
    }
}
//for para fazer a soma das vitorias totais de cada jogador
var resultado = []
for (let i = 0; i < jogadores; i++) {
    resultado.push([vitorias[i][0], 0])
    for (let j = 1; j <= jogadas; j++) {
        resultado[i][1] = resultado[i][1] + vitorias[i][j]
    }
}
//for para o sort de totais de vitorias dos jogadores
for (let contador = 1; contador < jogadores; contador++) {
    for (let j = 0; j < jogadores - 1; j++) {
        if (resultado[j][1] < resultado[j + 1][1]) {
            let aux = resultado[j];
            resultado[j] = resultado[j + 1];
            resultado[j + 1] = aux;
        }
    }
}
var maior = 0;
var nome = "";
var empate = 0;
//verificaão de empate entre os jogadores no totais das jogadas
for (let j = 0; j < jogadores; j++) {
    if (maior === resultado[j][1]) {
        nome = "";
        break;
    } else if (maior < resultado[j][1]) {
        maior = resultado[j][1];
        nome = resultado[j][0];
    }
}
// for para verificar o ganhador e mostrar na tela as quantidade de vitorias
for (let j = 0; j < jogadores; j++) {
    if (nome === resultado[j][0]) {
        console.log(`O grande ganhador é ${nome} com ${resultado[0][1]} vitórias`)
    } else {
        empate++;
    }
}
// condiçao de empate para mostra os 2 jogadores empatados
if (empate === jogadores) {
    console.log(`deu empate entre ${resultado[0][0]} com ${resultado[0][1]} vitórias e ${resultado[1][0]} com ${resultado[1][1]} vitórias!`);
}