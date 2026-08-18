/**
 * src/index.ts — Application entry point (Composition Root).
 *
 * Responsibilities:
 *   1. Instantiate domain objects (Players)
 *   2. Compose the race engine with its dependencies
 *   3. Wire strategy resolution (Strategy Pattern)
 *   4. Bootstrap the race
 *
 * Zero business logic lives here — all decisions belong to their
 * respective domain classes (Player, RaceEngine, *Strategy).
 */

import { Player } from "./models/Player";
import { RaceEngine } from "./services/RaceEngine";
import { DiceService } from "./services/DiceService";
import { RetaStrategy } from "./strategies/RetaStrategy";
import { CurvaStrategy } from "./strategies/CurvaStrategy";
import { ConfrontoStrategy } from "./strategies/ConfrontoStrategy";
import { BlockType, IBlockStrategy, StrategyResolver } from "./interfaces/IRace";

// ── Players ────────────────────────────────────────────────────────────────
const player1 = new Player({
  name: "Mario",
  velocidade: 4,
  manobrabilidade: 3,
  poder: 3,
});

const player2 = new Player({
  name: "Luigi",
  velocidade: 3,
  manobrabilidade: 4,
  poder: 4,
});

// ── Strategy Map ──────────────────────────────────────────────────────────
// Singleton-per-run: each strategy is instantiated once and reused.
const strategies: Record<BlockType, IBlockStrategy> = {
  Reta: new RetaStrategy(),
  Curva: new CurvaStrategy(),
  Confronto: new ConfrontoStrategy(),
};

/**
 * Resolves the correct block strategy by name.
 * Throws at runtime if an unknown block is encountered.
 */
const strategyResolver: StrategyResolver = (block: BlockType): IBlockStrategy => {
  const strategy = strategies[block];
  if (!strategy) throw new Error(`Unknown block: "${block}"`);
  return strategy;
};

// ── Composition Root & Race Bootstrap ─────────────────────────────────────
(async function main(): Promise<void> {
  const diceService = new DiceService();
  const engine = new RaceEngine(diceService);

  console.log(
    `🏁 A corrida entre ${player1.name} e ${player2.name} está começando...`
  );

  await engine.run(player1, player2, strategyResolver);
  engine.declareWinner(player1, player2);
})();
