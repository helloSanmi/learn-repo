import { GAME_CONFIG } from "./config.js";
import { createInitialState } from "./state.js";
import { spawnBomb, spawnPowerUp, spawnStar, updateEntities } from "./entities.js";
import { getPowerUpLabel, tickPowerUpEffects } from "./powerups.js";
import { intervalFor, tickProgression } from "./progression.js";

export function createGame({ input, renderer, onHUDUpdate, onSessionEnd }) {
  let state = createInitialState(), running = false, paused = false, last = 0, raf = 0, sent = false;
  const hud = () => onHUDUpdate({
    score: state.score, level: state.level, lives: Math.max(0, state.lives),
    time: Math.max(0, Math.ceil(state.timeLeft)), powerUp: getPowerUpLabel(state), combo: state.combo,
  });
  const end = () => {
    if (sent || !state.isGameOver) return;
    sent = true;
    onSessionEnd?.({
      score: state.score, level: state.level, lives: Math.max(0, state.lives),
      won: state.result === "won", stars: state.metrics.stars, bombsHit: state.metrics.bombsHit,
      powerUps: state.metrics.powerUps,
    });
  };
  const step = (d) => {
    const px = input.getPointerX();
    if (typeof px === "number") { state.player.velocityX = 0; state.player.x = px - state.player.width / 2; }
    else {
      const axis = input.getHorizontalAxis();
      state.player.velocityX = axis * GAME_CONFIG.playerSpeed;
      state.player.x += state.player.velocityX * d;
    }
    state.player.x = Math.max(0, Math.min(GAME_CONFIG.width - state.player.width, state.player.x));
    tickProgression(state);
    state.spawn.starTimer += d * 1000; state.spawn.bombTimer += d * 1000;
    state.spawn.powerUpTimer += d * 1000; state.spawn.secondTimer += d;
    if (state.spawn.starTimer >= intervalFor(GAME_CONFIG.starSpawnInterval, state.difficulty)) {
      state.spawn.starTimer = 0; spawnStar(state);
    }
    if (state.spawn.bombTimer >= intervalFor(GAME_CONFIG.bombSpawnInterval, state.difficulty)) {
      state.spawn.bombTimer = 0; spawnBomb(state);
    }
    if (state.spawn.powerUpTimer >= intervalFor(GAME_CONFIG.powerUpSpawnInterval, state.difficulty)) {
      state.spawn.powerUpTimer = 0; spawnPowerUp(state);
    }
    if (state.spawn.secondTimer >= 1) { state.spawn.secondTimer -= 1; state.timeLeft -= 1; }
    const hits = updateEntities(state, d); tickPowerUpEffects(state, d);
    state.comboTimer = Math.max(0, state.comboTimer - d);
    if (hits.starHits > 0) {
      state.combo = Math.min(12, state.combo + hits.starHits);
      state.comboTimer = 1.4;
      const mult = 1 + Math.floor(state.combo / 3);
      state.score += hits.starHits * 10 * mult;
    }
    if (hits.bombHits > 0 || state.comboTimer <= 0) state.combo = 0;
    if (hits.powerHits > 0) state.score += 8 * hits.powerHits;
    if (state.lives <= 0) { state.isGameOver = true; state.result = "lost"; }
    else if (state.timeLeft <= 0) { state.isGameOver = true; state.result = "won"; }
  };
  const tick = (now) => {
    if (!running || paused) return;
    if (!last) last = now;
    const d = Math.min((now - last) / 1000, 0.05);
    last = now;
    if (!state.isGameOver) step(d);
    hud(); renderer.render(state); end(); raf = requestAnimationFrame(tick);
  };
  return {
    start() {
      if (running) return;
      running = true; paused = false; state.isPaused = false; last = 0; sent = false;
      hud(); renderer.render(state); raf = requestAnimationFrame(tick);
    },
    pause() {
      if (!running || paused || state.isGameOver) return false;
      paused = true; state.isPaused = true; cancelAnimationFrame(raf); hud(); renderer.render(state); return true;
    },
    resume() {
      if (!running || !paused || state.isGameOver) return false;
      paused = false; state.isPaused = false; last = 0; raf = requestAnimationFrame(tick); return true;
    },
    restart() {
      paused = false; state = createInitialState(); state.isPaused = false; sent = false; hud(); renderer.render(state);
      if (running) { cancelAnimationFrame(raf); last = 0; raf = requestAnimationFrame(tick); }
    },
    stop() { running = false; paused = false; state.isPaused = false; cancelAnimationFrame(raf); input.cleanup(); },
  };
}
