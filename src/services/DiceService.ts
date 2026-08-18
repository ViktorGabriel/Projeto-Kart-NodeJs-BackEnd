import { BlockType, IDiceService } from "../interfaces/IRace";

/**
 * DiceService — Responsável por toda a aleatoriedade utilizada na pista.
 *
 * Implementa IDiceService para que possa ser facilmente substituído por um
 * stub determinístico em testes unitários (ex: um mock que sempre retorna valores fixos).
 */
export class DiceService implements IDiceService {
  public static readonly BLOCKS: readonly BlockType[] = [
    "Reta",
    "Curva",
    "Confronto",
  ];

  /**
   * Rola um dado de seis lados padrão.
   * @returns Inteiro entre 1 e 6 (inclusivo)
   */
  public rollDice(): number {
    return Math.floor(Math.random() * 6) + 1;
  }

  /**
   * Seleciona aleatoriamente um tipo de bloco da pista.
   * @returns Um dos valores: "Reta" | "Curva" | "Confronto"
   */
  public getRandomBlock(): BlockType {
    const random = Math.random();

    if (random < 0.33) return "Reta";
    if (random > 0.66) return "Curva";
    return "Confronto";
  }
}

