const BlockStrategy = require("./BlockStrategy");

/**
 * RetaStrategy — Resolves "Reta" blocks using the `velocidade` attribute.
 *
 * Awards 1 point to the player with the highest (dice + velocidade) total.
 */
class RetaStrategy extends BlockStrategy {
  /**
   * @inheritdoc
   */
  async resolve(character1, character2, dice1, dice2, logResult) {
    const total1 = dice1 + character1.velocidade;
    const total2 = dice2 + character2.velocidade;

    logResult(character1.name, "velocidade", dice1, character1.velocidade);
    logResult(character2.name, "velocidade", dice2, character2.velocidade);

    if (total1 > total2) {
      console.log(`${character1.name} marcou 1 ponto!`);
      character1.addPoint();
    } else if (total2 > total1) {
      console.log(`${character2.name} marcou 1 ponto!`);
      character2.addPoint();
    }
  }
}

module.exports = RetaStrategy;
