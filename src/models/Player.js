/**
 * Represents a kart racing player with attributes and points tracking.
 */
class Player {
  /**
   * @param {Object} params
   * @param {string} params.name         - Player name
   * @param {number} params.velocidade   - Speed attribute (used on Reta blocks)
   * @param {number} params.manobrabilidade - Handling attribute (used on Curva blocks)
   * @param {number} params.poder        - Power attribute (used on Confronto blocks)
   */
  constructor({ name, velocidade, manobrabilidade, poder }) {
    this.name = name;
    this.velocidade = velocidade;
    this.manobrabilidade = manobrabilidade;
    this.poder = poder;
    this.pontos = 0;
  }

  /**
   * Adds points to the player's score.
   * @param {number} amount - Points to add (default: 1)
   */
  addPoint(amount = 1) {
    this.pontos += amount;
  }

  /**
   * Removes a point from the player's score (floor: 0).
   */
  losePoint() {
    if (this.pontos > 0) {
      this.pontos--;
    }
  }

  /**
   * Returns a string summary of the player's current state.
   * @returns {string}
   */
  toString() {
    return `${this.name} — Vel:${this.velocidade} Man:${this.manobrabilidade} Pod:${this.poder} | Pts:${this.pontos}`;
  }
}

module.exports = Player;
