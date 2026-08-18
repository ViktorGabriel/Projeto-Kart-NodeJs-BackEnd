const BlockStrategy = require("./BlockStrategy");

/**
 * ConfrontoStrategy — Resolves "Confronto" blocks using the `poder` attribute.
 *
 * The winner of the confrontation causes the loser to lose 1 point (min 0).
 * If tied, no points are exchanged.
 */
class ConfrontoStrategy extends BlockStrategy {
  /**
   * @inheritdoc
   */
  async resolve(character1, character2, dice1, dice2, logResult) {
    const power1 = dice1 + character1.poder;
    const power2 = dice2 + character2.poder;

    console.log(`${character1.name} confrontou com ${character2.name}! 🥊`);
    logResult(character1.name, "poder", dice1, character1.poder);
    logResult(character2.name, "poder", dice2, character2.poder);

    if (power1 > power2) {
      console.log(`${character1.name} Venceu o confronto! ${character2.name} perdeu 1 ponto 🐢`);
      character2.losePoint();
    } else if (power2 > power1) {
      console.log(`${character2.name} Venceu o confronto! ${character1.name} perdeu 1 ponto 🐢`);
      character1.losePoint();
    } else {
      console.log(`Confronto empatado, nenhum ponto foi perdido`);
    }
  }
}

module.exports = ConfrontoStrategy;
