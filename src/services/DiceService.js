/**
 * DiceService — Responsible for all randomization used on the track.
 *
 * Separates the concerns of random number generation and block selection
 * from the game engine, making each component independently testable.
 */
class DiceService {
  /** @type {string[]} */
  static BLOCKS = ["Reta", "Curva", "Confronto"];

  /**
   * Rolls a standard six-sided die.
   * @returns {number} Integer between 1 and 6 (inclusive)
   */
  rollDice() {
    return Math.floor(Math.random() * 6) + 1;
  }

  /**
   * Randomly selects a track block type.
   * @returns {string} One of "Reta" | "Curva" | "Confronto"
   */
  getRandomBlock() {
    const random = Math.random();

    if (random < 0.33) return "Reta";
    if (random > 0.66) return "Curva";
    return "Confronto";
  }
}

module.exports = DiceService;
