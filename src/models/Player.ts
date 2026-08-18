import { IPlayer, IPlayerProps } from "../interfaces/IPlayer";

/**
 * Player — Concrete implementation of the IPlayer domain entity.
 *
 * Encapsulates all kart-racing player state and the mutation methods
 * that represent valid game transitions (earning / losing points).
 */
export class Player implements IPlayer {
  public readonly name: string;
  public readonly velocidade: number;
  public readonly manobrabilidade: number;
  public readonly poder: number;
  public pontos: number;

  constructor({ name, velocidade, manobrabilidade, poder }: IPlayerProps) {
    this.name = name;
    this.velocidade = velocidade;
    this.manobrabilidade = manobrabilidade;
    this.poder = poder;
    this.pontos = 0;
  }

  /**
   * Adds points to the player's score.
   * @param amount - Points to add (default: 1)
   */
  public addPoint(amount: number = 1): void {
    this.pontos += amount;
  }

  /**
   * Removes one point from the player's score.
   * Score is floored at 0 — it can never go negative.
   */
  public losePoint(): void {
    if (this.pontos > 0) {
      this.pontos--;
    }
  }

  /**
   * Returns a human-readable summary of the player's current state.
   */
  public toString(): string {
    return `${this.name} — Vel:${this.velocidade} Man:${this.manobrabilidade} Pod:${this.poder} | Pts:${this.pontos}`;
  }
}
