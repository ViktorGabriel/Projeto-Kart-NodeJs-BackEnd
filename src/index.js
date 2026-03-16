const player1 = {
    name:"Mario",
    velocidade: 4,
    manobrabilidade: 3,
    poder: 3,
    pontos: 0
}

const player2 = {
    name:"Luigi",
    velocidade: 3,
    manobrabilidade: 4,
    poder: 4,
    pontos: 0

}

function rollDice() {
   return Math.floor(Math.random() * 6) + 1
}

async function playEngine(character1, character2) {
    for(let round = 1; round <= 5; round++) {
        console.log(`Rodada ${round}`)

        //sortear o bloco
    }

}

(async function main(){
    console.log(`A corrida entre ${player1.name} e ${player2.name} esta comçando...`)

    playEngine(player1, player2)
})()

