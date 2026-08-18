import { IPlayer } from "../interfaces/IPlayer";
import { LogResultFn } from "../interfaces/IRace";
import { BlockStrategy } from "./BlockStrategy";

/**
 * RetaStrategy — Resolves "Reta" blocks using the `velocidade` attribute.
 *
 * Awards 1 point to the player with the highest (dice + velocidade) total.
 * In case of a tie, no points are awarded.
 */
export class RetaStrategy extends BlockStrategy {
  public async resolve(
    character1: IPlayer,
    character2: IPlayer,
    dice1: number,
    dice2: number,
    logResult: LogResultFn
  ): Promise<void> {
    const total1: number = dice1 + character1.velocidade;
    const total2: number = dice2 + character2.velocidade;

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
