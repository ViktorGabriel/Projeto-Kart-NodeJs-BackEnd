import { Player } from "../src/models/Player";
import { IPlayerProps } from "../src/interfaces/IPlayer";

describe("Player", () => {
  /**
   * Helper: creates a default test player with optional overrides.
   */
  const makePlayer = (overrides: Partial<IPlayerProps> = {}): Player =>
    new Player({
      name: "TestPlayer",
      velocidade: 4,
      manobrabilidade: 3,
      poder: 3,
      ...overrides,
    });

  // ── Constructor ────────────────────────────────────────────────────────────

  describe("constructor", () => {
    it("should assign all attributes correctly", () => {
      const player = makePlayer();

      expect(player.name).toBe("TestPlayer");
      expect(player.velocidade).toBe(4);
      expect(player.manobrabilidade).toBe(3);
      expect(player.poder).toBe(3);
    });

    it("should initialise pontos at 0", () => {
      const player = makePlayer();
      expect(player.pontos).toBe(0);
    });
  });

  // ── addPoint ───────────────────────────────────────────────────────────────

  describe("addPoint()", () => {
    it("should increment pontos by 1 by default", () => {
      const player = makePlayer();
      player.addPoint();
      expect(player.pontos).toBe(1);
    });

    it("should increment pontos by a custom amount", () => {
      const player = makePlayer();
      player.addPoint(3);
      expect(player.pontos).toBe(3);
    });

    it("should accumulate multiple addPoint calls", () => {
      const player = makePlayer();
      player.addPoint();
      player.addPoint();
      player.addPoint();
      expect(player.pontos).toBe(3);
    });
  });

  // ── losePoint ─────────────────────────────────────────────────────────────

  describe("losePoint()", () => {
    it("should decrement pontos by 1", () => {
      const player = makePlayer();
      player.addPoint(2);
      player.losePoint();
      expect(player.pontos).toBe(1);
    });

    it("should NOT go below 0 (guard clause)", () => {
      const player = makePlayer();
      // pontos already at 0
      player.losePoint();
      expect(player.pontos).toBe(0);
    });

    it("should stop at 0 when called multiple times", () => {
      const player = makePlayer();
      player.addPoint(1);
      player.losePoint();
      player.losePoint();
      player.losePoint();
      expect(player.pontos).toBe(0);
    });
  });

  // ── toString ───────────────────────────────────────────────────────────────

  describe("toString()", () => {
    it("should return a formatted string with all attributes", () => {
      const player = makePlayer();
      const result: string = player.toString();

      expect(result).toContain("TestPlayer");
      expect(result).toContain("4"); // velocidade
      expect(result).toContain("3"); // manobrabilidade / poder
      expect(result).toContain("0"); // pontos
    });
  });
});
