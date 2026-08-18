/**
 * src/index.ts — Ponto de entrada da aplicação (Raiz de Composição).
 *
 * Responsabilidades:
 *   1. Instanciar os objetos de domínio (Players)
 *   2. Compor o motor de corrida com suas dependências
 *   3. Conectar a resolução de estratégias (Strategy Pattern)
 *   4. Inicializar a corrida
 *
 * Nenhuma lógica de negócio vive aqui — todas as decisões pertencem
 * às suas respectivas classes de domínio (Player, RaceEngine, *Strategy).
 */

import { Player } from "./models/Player";
import { RaceEngine } from "./services/RaceEngine";
import { DiceService } from "./services/DiceService";
import { RetaStrategy } from "./strategies/RetaStrategy";
import { CurvaStrategy } from "./strategies/CurvaStrategy";
import { ConfrontoStrategy } from "./strategies/ConfrontoStrategy";
import { BlockType, IBlockStrategy, StrategyResolver } from "./interfaces/IRace";

// ── Jogadores ──────────────────────────────────────────────────────────────
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

// ── Mapa de Estratégias ────────────────────────────────────────────────────
// Singleton por execução: cada estratégia é instanciada uma única vez e reutilizada.
const strategies: Record<BlockType, IBlockStrategy> = {
  Reta: new RetaStrategy(),
  Curva: new CurvaStrategy(),
  Confronto: new ConfrontoStrategy(),
};

/**
 * Resolve a estratégia de bloco correta pelo nome.
 * Lança um erro em tempo de execução se um bloco desconhecido for encontrado.
 */
const strategyResolver: StrategyResolver = (block: BlockType): IBlockStrategy => {
  const strategy = strategies[block];
  if (!strategy) throw new Error(`Bloco desconhecido: "${block}"`);
  return strategy;
};

// ── Raiz de Composição & Inicialização da Corrida ─────────────────────────
(async function main(): Promise<void> {
  const diceService = new DiceService();
  const engine = new RaceEngine(diceService);

  console.log(
    `🏁 A corrida entre ${player1.name} e ${player2.name} está começando...`
  );

  await engine.run(player1, player2, strategyResolver);
  engine.declareWinner(player1, player2);
})();
