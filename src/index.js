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

async function getRandomBlock() {
    let random = Math.random()
    let result

    switch(true){
        case random < 0.33:
            result = "Reta"
            break;
        case random > 0.66:
            result = "Curva"
            break;
        default:
            result = "Confronto"
            break;
    }
    return result
}

async function logRollResult(characterName, block, diceResult, attribute) {
    console.log(`${characterName} 🎲 rolou um dado de ${block} ${diceResult}`)
}

async function playEngine(character1, character2) {
    for(let round = 1; round <= 5; round++) {
        console.log(`Rodada ${round}`)

        //sortear o bloco
        let block =  await getRandomBlock()
        console.log(`Bloco: ${block}`)
    }
        // rolar dados
        let diceResult1 = await rollDice()
        let diceResult2 = await rollDice()
        
        //teste de habilidade
        let totalTestSkill1 = 0;
        let totalTestSkill2 = 0;

    if(block === "Reta"){
        totalTestSkill1 = diceResult1 + character1.velocidade;
        totalTestSkill2 = diceResult2 + character2.velocidade;

        await logRollResult(character1.name, 
            "velocidade", 
            diceResult1, 
            character1.velocidade
        );
    }
    if(block === "Curva"){
        totalTestSkill1 = diceResult1 + character1.manobrabilidade;
        totalTestSkill2 = diceResult2 + character2.manobrabilidade;
    }
    if(block === "Confronto"){
        let powerResult1 = diceResult1 + character1.poder;
        let powerResult2 = diceResult2 + character2.poder;
    }
}

(async function main(){
    console.log(`A corrida entre ${player1.name} e ${player2.name} esta comçando...`)

    playEngine(player1, player2)
})()

