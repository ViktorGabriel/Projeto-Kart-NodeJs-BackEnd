import { IPlayer } from "../interfaces/IPlayer";
import {
  IDiceService,
  IBlockStrategy,
  LogResultFn,
  StrategyResolver,
} from "../interfaces/IRace";
import { DiceService } from "./DiceService";

/**
 * RaceEngine — Orquestra uma corrida completa entre dois jogadores.
 *
 * Depende de IDiceService (não da classe concreta) e recebe as estratégias
 * de bloco via uma função StrategyResolver — ambas as dependências são
 * injetadas, mantendo esta classe totalmente desacoplada e testável de forma independente.
 */
export class RaceEngine {
  public static readonly TOTAL_ROUNDS: number = 5;

  private readonly diceService: IDiceService;

  constructor(diceService: IDiceService = new DiceService()) {
    this.diceService = diceService;
  }

  /**
   * Registra no console o resultado formatado de uma rolagem de dado.
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
   * Executa a corrida completa ao longo de todas as rodadas.
   *
   * @param character1       - Primeiro jogador
   * @param character2       - Segundo jogador
   * @param strategyResolver - Mapeia um BlockType para o IBlockStrategy correto
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
   * Avalia as pontuações finais e exibe o vencedor da corrida.
   *
   * @param character1 - Primeiro jogador
   * @param character2 - Segundo jogador
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

