import { BlockType, IDiceService } from "../interfaces/IRace";

/**
 * DiceService — Responsible for all randomization used on the track.
 *
 * Implements IDiceService so it can be easily swapped for a deterministic
 * stub in unit tests (e.g., a mock that always returns fixed values).
 */
export class DiceService implements IDiceService {
  public static readonly BLOCKS: readonly BlockType[] = [
    "Reta",
    "Curva",
    "Confronto",
  ];

  /**
   * Rolls a standard six-sided die.
   * @returns Integer between 1 and 6 (inclusive)
   */
  public rollDice(): number {
    return Math.floor(Math.random() * 6) + 1;
  }

  /**
   * Randomly selects a track block type.
   * @returns One of "Reta" | "Curva" | "Confronto"
   */
  public getRandomBlock(): BlockType {
    const random = Math.random();

    if (random < 0.33) return "Reta";
    if (random > 0.66) return "Curva";
    return "Confronto";
  }
}
