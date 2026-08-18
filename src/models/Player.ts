import { IPlayer, IPlayerProps } from "../interfaces/IPlayer";

/**
 * Player — Implementação concreta da entidade de domínio IPlayer.
 *
 * Encapsula todo o estado de um jogador de kart e os métodos de mutação
 * que representam transições válidas do jogo (ganhar / perder pontos).
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
   * Adiciona pontos à pontuação do jogador.
   * @param amount - Pontos a adicionar (padrão: 1)
   */
  public addPoint(amount: number = 1): void {
    this.pontos += amount;
  }

  /**
   * Remove um ponto da pontuação do jogador.
   * A pontuação tem piso em 0 — nunca pode ser negativa.
   */
  public losePoint(): void {
    if (this.pontos > 0) {
      this.pontos--;
    }
  }

  /**
   * Retorna um resumo legível do estado atual do jogador.
   */
  public toString(): string {
    return `${this.name} — Vel:${this.velocidade} Man:${this.manobrabilidade} Pod:${this.poder} | Pts:${this.pontos}`;
  }
}

