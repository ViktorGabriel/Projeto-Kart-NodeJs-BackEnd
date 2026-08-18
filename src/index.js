/**
 * src/index.js — Application entry point.
 *
 * Responsibilities of this file:
 *   1. Instantiate domain objects (Players)
 *   2. Compose the race engine with its dependencies
 *   3. Wire strategy resolution (Strategy Pattern)
 *   4. Kick off the race
 *
 * Zero business logic lives here — all decisions belong to their
 * respective domain classes (Player, RaceEngine, *Strategy).
 */

const Player = require("./models/Player");
const RaceEngine = require("./services/RaceEngine");
const DiceService = require("./services/DiceService");
const RetaStrategy = require("./strategies/RetaStrategy");
const CurvaStrategy = require("./strategies/CurvaStrategy");
const ConfrontoStrategy = require("./strategies/ConfrontoStrategy");

// ── Players ──────────────────────────────────────────────────────────────────
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

// ── Strategy Map ──────────────────────────────────────────────────────────────
// Maps each block name to a concrete Strategy instance (singleton-per-run).
const strategies = {
  Reta: new RetaStrategy(),
  Curva: new CurvaStrategy(),
  Confronto: new ConfrontoStrategy(),
};

/**
 * Resolves the correct block strategy by name.
 * @param {string} block - Block identifier returned by DiceService
 * @returns {import("./strategies/BlockStrategy")}
 */
const strategyResolver = (block) => {
  const strategy = strategies[block];
  if (!strategy) throw new Error(`Unknown block: "${block}"`);
  return strategy;
};

// ── Composition Root & Race Bootstrap ────────────────────────────────────────
(async function main() {
  const diceService = new DiceService();
  const engine = new RaceEngine(diceService);

  console.log(`🏁 A corrida entre ${player1.name} e ${player2.name} está começando...`);

  await engine.run(player1, player2, strategyResolver);
  engine.declareWinner(player1, player2);
})();
