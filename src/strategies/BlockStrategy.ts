import { IPlayer } from "../interfaces/IPlayer";
import { IBlockStrategy, LogResultFn } from "../interfaces/IRace";

/**
 * BlockStrategy — Abstract base class for all block-resolution strategies.
 *
 * Implements IBlockStrategy and throws a descriptive error if a subclass
 * forgets to override `resolve`. Using an abstract class (instead of a
 * plain interface) allows subclasses to share common helpers in the future.
 */
export abstract class BlockStrategy implements IBlockStrategy {
  /**
   * Resolves a single round block. Subclasses MUST override this method.
   *
   * @param character1 - First player
   * @param character2 - Second player
   * @param dice1      - Raw dice roll for character1
   * @param dice2      - Raw dice roll for character2
   * @param logResult  - Formatted roll-result logger callback
   */
  public abstract resolve(
    character1: IPlayer,
    character2: IPlayer,
    dice1: number,
    dice2: number,
    logResult: LogResultFn
  ): Promise<void>;
}
