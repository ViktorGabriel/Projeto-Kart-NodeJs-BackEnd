const DiceService = require("./DiceService");

/**
 * RaceEngine — Orchestrates a full race between two players.
 *
 * Depends on DiceService for randomization (injected via constructor,
 * enabling testability without mocking globals).
 */
class RaceEngine {
  static TOTAL_ROUNDS = 5;

  /**
   * @param {import("./DiceService")} diceService - Injected randomization service
   */
  constructor(diceService = new DiceService()) {
    this.diceService = diceService;
  }

  /**
   * Logs a formatted dice roll result to the console.
   * @param {string} name      - Character name
   * @param {string} block     - Attribute label (velocidade, manobrabilidade, poder)
   * @param {number} dice      - Raw dice result
   * @param {number} attribute - Character's attribute value
   */
  _logRollResult(name, block, dice, attribute) {
    console.log(
      `${name} 🎲 rolou um dado de ${block} ${dice} + ${attribute} = ${dice + attribute}`
    );
  }

  /**
   * Runs a single round and mutates players' scores accordingly.
   * @param {number}                          round
   * @param {import("../models/Player")}      character1
   * @param {import("../models/Player")}      character2
   * @param {import("../strategies/BlockStrategy")} strategy - Strategy resolved externally
   */
  async _runRound(round, character1, character2, strategy) {
    console.log(`\nRodada ${round}`);

    const block = this.diceService.getRandomBlock();
    console.log(`Bloco: ${block}`);

    const dice1 = this.diceService.rollDice();
    const dice2 = this.diceService.rollDice();

    await strategy.resolve(character1, character2, dice1, dice2, this._logRollResult);

    console.log("-------------------------");
  }

  /**
   * Executes the full race (all rounds).
   * @param {import("../models/Player")} character1
   * @param {import("../models/Player")} character2
   * @param {Function} strategyResolver - Maps block name -> BlockStrategy instance
   */
  async run(character1, character2, strategyResolver) {
    for (let round = 1; round <= RaceEngine.TOTAL_ROUNDS; round++) {
      const block = this.diceService.getRandomBlock();
      console.log(`\nRodada ${round}`);
      console.log(`Bloco: ${block}`);

      const dice1 = this.diceService.rollDice();
      const dice2 = this.diceService.rollDice();

      const strategy = strategyResolver(block);
      await strategy.resolve(character1, character2, dice1, dice2, this._logRollResult.bind(this));

      console.log("-------------------------");
    }
  }

  /**
   * Evaluates scores and prints the race winner.
   * @param {import("../models/Player")} character1
   * @param {import("../models/Player")} character2
   */
  declareWinner(character1, character2) {
    console.log(`\nResultado final:`);
    console.log(`${character1.name}: ${character1.pontos} ponto(s)`);
    console.log(`${character2.name}: ${character2.pontos} ponto(s)`);

    if (character1.pontos > character2.pontos) {
      console.log(`\n ${character1.name} venceu a corrida! Parabéns! 🏆`);
    } else if (character2.pontos > character1.pontos) {
      console.log(`\n ${character2.name} venceu a corrida! Parabéns! 🏆`);
    } else {
      console.log(`A corrida terminou em empate!`);
    }
  }
}

module.exports = RaceEngine;
