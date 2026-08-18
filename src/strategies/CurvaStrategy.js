const BlockStrategy = require("./BlockStrategy");

/**
 * CurvaStrategy — Resolves "Curva" blocks using the `manobrabilidade` attribute.
 *
 * Awards 1 point to the player with the highest (dice + manobrabilidade) total.
 */
class CurvaStrategy extends BlockStrategy {
  /**
   * @inheritdoc
   */
  async resolve(character1, character2, dice1, dice2, logResult) {
    const total1 = dice1 + character1.manobrabilidade;
    const total2 = dice2 + character2.manobrabilidade;

    logResult(character1.name, "manobrabilidade", dice1, character1.manobrabilidade);
    logResult(character2.name, "manobrabilidade", dice2, character2.manobrabilidade);

    if (total1 > total2) {
      console.log(`${character1.name} marcou 1 ponto!`);
      character1.addPoint();
    } else if (total2 > total1) {
      console.log(`${character2.name} marcou 1 ponto!`);
      character2.addPoint();
    }
  }
}

module.exports = CurvaStrategy;
