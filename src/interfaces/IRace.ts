import { IPlayer } from "./IPlayer";

/**
 * BlockType — Union of all valid track block names.
 *
 * Using a literal union instead of `string` lets TypeScript catch
 * any typo at compile-time (e.g. "Retta" would be a type error).
 */
export type BlockType = "Reta" | "Curva" | "Confronto";

/**
 * LogResultFn — Signature of the dice-roll logging callback.
 *
 * Passed from RaceEngine into each BlockStrategy so the strategy
 * can format its own output without coupling to `console.log`.
 */
export type LogResultFn = (
  name: string,
  blockLabel: string,
  dice: number,
  attribute: number
) => void;

/**
 * IBlockStrategy — Contract for all block resolution strategies.
 *
 * Each concrete strategy (Reta, Curva, Confronto) MUST implement
 * this interface. RaceEngine depends only on IBlockStrategy, never
 * on concrete classes — fulfilling the Dependency Inversion Principle.
 */
export interface IBlockStrategy {
  /**
   * Resolves a single block round: computes totals, logs results,
   * and mutates the players' `pontos` as appropriate.
   *
   * @param character1 - First player
   * @param character2 - Second player
   * @param dice1      - Raw dice roll for character1 (1–6)
   * @param dice2      - Raw dice roll for character2 (1–6)
   * @param logResult  - Callback to log a formatted roll result
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
 * StrategyResolver — Function that maps a BlockType to its strategy.
 *
 * Injected into RaceEngine.run(), keeping the engine decoupled from
 * all concrete strategy implementations.
 */
export type StrategyResolver = (block: BlockType) => IBlockStrategy;

/**
 * IDiceService — Contract for all randomization used on the track.
 */
export interface IDiceService {
  /** Returns a random integer between 1 and 6 (inclusive). */
  rollDice(): number;

  /** Returns a random BlockType. */
  getRandomBlock(): BlockType;
}
