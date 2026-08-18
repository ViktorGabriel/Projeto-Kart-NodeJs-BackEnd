import { IPlayer } from "./IPlayer";

/**
 * BlockType — União de todos os nomes válidos de blocos da pista.
 *
 * Usar uma união literal em vez de `string` permite que o TypeScript
 * detecte qualquer erro de digitação em tempo de compilação
 * (ex: "Retta" seria um erro de tipo).
 */
export type BlockType = "Reta" | "Curva" | "Confronto";

/**
 * LogResultFn — Assinatura do callback de registro da rolagem de dados.
 *
 * Passado do RaceEngine para cada BlockStrategy, permitindo que a estratégia
 * formate sua própria saída sem acoplamento direto ao `console.log`.
 */
export type LogResultFn = (
  name: string,
  blockLabel: string,
  dice: number,
  attribute: number
) => void;

/**
 * IBlockStrategy — Contrato para todas as estratégias de resolução de bloco.
 *
 * Cada estratégia concreta (Reta, Curva, Confronto) DEVE implementar
 * esta interface. O RaceEngine depende apenas de IBlockStrategy, nunca
 * de classes concretas — satisfazendo o Princípio da Inversão de Dependência.
 */
export interface IBlockStrategy {
  /**
   * Resolve uma rodada de bloco: calcula os totais, registra os resultados
   * e modifica o campo `pontos` dos jogadores conforme apropriado.
   *
   * @param character1 - Primeiro jogador
   * @param character2 - Segundo jogador
   * @param dice1      - Resultado bruto do dado do character1 (1–6)
   * @param dice2      - Resultado bruto do dado do character2 (1–6)
   * @param logResult  - Callback para registrar o resultado formatado da rolagem
   */
  resolve(
    character1: IPlayer,
    character2: IPlayer,
    dice1: number,
    dice2: number,
    logResult: LogResultFn
  ): Promise<void>;
}

/**
 * StrategyResolver — Função que mapeia um BlockType para sua estratégia.
 *
 * Injetada em RaceEngine.run(), mantendo o motor desacoplado de todas
 * as implementações concretas de estratégia.
 */
export type StrategyResolver = (block: BlockType) => IBlockStrategy;

/**
 * IDiceService — Contrato para toda a aleatoriedade utilizada na pista.
 */
export interface IDiceService {
  /** Retorna um inteiro aleatório entre 1 e 6 (inclusivo). */
  rollDice(): number;

  /** Retorna um BlockType aleatório. */
  getRandomBlock(): BlockType;
}

