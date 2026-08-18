import { IPlayer } from "../interfaces/IPlayer";
import {
  IDiceService,
  IBlockStrategy,
  LogResultFn,
  StrategyResolver,
} from "../interfaces/IRace";
import { DiceService } from "./DiceService";

/**
 * RaceEngine — Orchestrates a full race between two players.
 *
 * Depends on IDiceService (not the concrete class) and receives block
 * strategies via a StrategyResolver function — both dependencies are
 * injected, keeping this class fully decoupled and independently testable.
 */
export class RaceEngine {
  public static readonly TOTAL_ROUNDS: number = 5;

  private readonly diceService: IDiceService;

  constructor(diceService: IDiceService = new DiceService()) {
    this.diceService = diceService;
  }

  /**
   * Logs a formatted dice roll result to the console.
   */
  private _logRollResult: LogResultFn = (
    name: string,
    blockLabel: string,
    dice: number,
    attribute: number
  ): void => {
    console.log(
      `${name} 🎲 rolou um dado de ${blockLabel} ${dice} + ${attribute} = ${dice + attribute}`
    );
  };

  /**
   * Executes the full race across all rounds.
   *
   * @param character1       - First player
   * @param character2       - Second player
   * @param strategyResolver - Maps a BlockType to the correct IBlockStrategy
   */
  public async run(
    character1: IPlayer,
    character2: IPlayer,
    strategyResolver: StrategyResolver
  ): Promise<void> {
    for (let round = 1; round <= RaceEngine.TOTAL_ROUNDS; round++) {
      const block = this.diceService.getRandomBlock();
      console.log(`\nRodada ${round}`);
      console.log(`Bloco: ${block}`);

      const dice1: number = this.diceService.rollDice();
      const dice2: number = this.diceService.rollDice();

      const strategy: IBlockStrategy = strategyResolver(block);
      await strategy.resolve(
        character1,
        character2,
        dice1,
        dice2,
        this._logRollResult
      );

      console.log("-------------------------");
    }
  }

  /**
   * Evaluates final scores and prints the race winner.
   *
   * @param character1 - First player
   * @param character2 - Second player
   */
  public declareWinner(character1: IPlayer, character2: IPlayer): void {
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
