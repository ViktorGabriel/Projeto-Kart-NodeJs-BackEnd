/**
 * BlockStrategy — Abstract base interface for all block-resolution strategies.
 *
 * All concrete strategies MUST implement the `resolve` method.
 * This enforces the Strategy Pattern contract across the codebase.
 */
class BlockStrategy {
  /**
   * Resolves a single round block, updating players' scores and logging results.
   *
   * @param {import("../models/Player")} character1
   * @param {import("../models/Player")} character2
   * @param {number} dice1 - Raw dice result for character1
   * @param {number} dice2 - Raw dice result for character2
   * @param {Function} logResult - Callback: (name, blockLabel, dice, attribute) => void
   * @returns {Promise<void>}
   */
  async resolve(character1, character2, dice1, dice2, logResult) {
    throw new Error(`BlockStrategy.resolve() must be implemented by subclass: ${this.constructor.name}`);
  }
}

module.exports = BlockStrategy;
