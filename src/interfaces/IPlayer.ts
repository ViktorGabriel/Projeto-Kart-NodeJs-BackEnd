/**
 * IPlayer — Contrato de domínio para um jogador de corrida de kart.
 *
 * Todo código que interage com uma entidade de jogador DEVE depender desta
 * interface, nunca diretamente da classe concreta `Player`. Isso desacopla
 * a lógica de domínio da implementação e facilita a criação de mocks em testes.
 */
export interface IPlayer {
  /** Nome de exibição do jogador / personagem. */
  readonly name: string;

  /** Atributo de velocidade — usado para resolver blocos do tipo "Reta". */
  readonly velocidade: number;

  /** Atributo de manobrabilidade — usado para resolver blocos do tipo "Curva". */
  readonly manobrabilidade: number;

  /** Atributo de poder — usado para resolver blocos do tipo "Confronto". */
  readonly poder: number;

  /** Pontuação acumulada atual. Sempre >= 0. */
  pontos: number;

  /**
   * Adiciona pontos à pontuação do jogador.
   * @param amount - Pontos a adicionar. Padrão: 1.
   */
  addPoint(amount?: number): void;

  /**
   * Remove um ponto da pontuação do jogador.
   * A pontuação não pode ser inferior a 0.
   */
  losePoint(): void;

  /** Retorna um resumo legível do estado atual do jogador. */
  toString(): string;
}

/**
 * IPlayerProps — Formato do objeto passado ao construtor de Player.
 */
export interface IPlayerProps {
  name: string;
  velocidade: number;
  manobrabilidade: number;
  poder: number;
}

