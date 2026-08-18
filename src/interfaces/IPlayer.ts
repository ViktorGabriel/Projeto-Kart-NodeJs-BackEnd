/**
 * IPlayer — Domain contract for a kart racing player.
 *
 * All code that interacts with a player entity MUST depend on this
 * interface, never on the concrete `Player` class directly. This
 * decouples the domain logic from the implementation and enables
 * easy mocking in tests.
 */
export interface IPlayer {
  /** Display name of the player / character. */
  readonly name: string;

  /** Speed attribute — used to resolve "Reta" blocks. */
  readonly velocidade: number;

  /** Handling attribute — used to resolve "Curva" blocks. */
  readonly manobrabilidade: number;

  /** Power attribute — used to resolve "Confronto" blocks. */
  readonly poder: number;

  /** Current accumulated score. Always >= 0. */
  pontos: number;

  /**
   * Adds points to the player's score.
   * @param amount - Points to add. Defaults to 1.
   */
  addPoint(amount?: number): void;

  /**
   * Removes one point from the player's score.
   * Score cannot go below 0.
   */
  losePoint(): void;

  /** Returns a human-readable summary of the player's state. */
  toString(): string;
}

/**
 * IPlayerProps — Shape of the object passed to the Player constructor.
 */
export interface IPlayerProps {
  name: string;
  velocidade: number;
  manobrabilidade: number;
  poder: number;
}
