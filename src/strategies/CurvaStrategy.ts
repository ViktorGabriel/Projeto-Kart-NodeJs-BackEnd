import { IPlayer } from "../interfaces/IPlayer";
import { LogResultFn } from "../interfaces/IRace";
import { BlockStrategy } from "./BlockStrategy";

/**
 * CurvaStrategy — Resolves "Curva" blocks using the `manobrabilidade` attribute.
 *
 * Awards 1 point to the player with the highest (dice + manobrabilidade) total.
 * In case of a tie, no points are awarded.
 */
export class CurvaStrategy extends BlockStrategy {
  public async resolve(
    character1: IPlayer,
    character2: IPlayer,
    dice1: number,
    dice2: number,
    logResult: LogResultFn
  ): Promise<void> {
    const total1: number = dice1 + character1.manobrabilidade;
    const total2: number = dice2 + character2.manobrabilidade;

    logResult(
      character1.name,
      "manobrabilidade",
      dice1,
      character1.manobrabilidade
    );
    logResult(
      character2.name,
      "manobrabilidade",
      dice2,
      character2.manobrabilidade
    );

    if (total1 > total2) {
      console.log(`${character1.name} marcou 1 ponto!`);
      character1.addPoint();
    } else if (total2 > total1) {
      console.log(`${character2.name} marcou 1 ponto!`);
      character2.addPoint();
    }
  }
}
