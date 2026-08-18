import { IPlayer } from "../interfaces/IPlayer";
import { IBlockStrategy, LogResultFn } from "../interfaces/IRace";

/**
 * BlockStrategy — Classe base abstrata para todas as estratégias de resolução de bloco.
 *
 * Implementa IBlockStrategy. Usar uma classe abstrata (em vez de uma interface
 * simples) permite que subclasses compartilhem helpers comuns no futuro.
 */
export abstract class BlockStrategy implements IBlockStrategy {
  /**
   * Resolve um bloco de rodada. As subclasses DEVEM sobrescrever este método.
   *
   * @param character1 - Primeiro jogador
   * @param character2 - Segundo jogador
   * @param dice1      - Resultado bruto do dado do character1
   * @param dice2      - Resultado bruto do dado do character2
   * @param logResult  - Callback de registro formatado do resultado da rolagem
   */
  public abstract resolve(
    character1: IPlayer,
    character2: IPlayer,
    dice1: number,
    dice2: number,
    logResult: LogResultFn
  ): Promise<void>;
}

