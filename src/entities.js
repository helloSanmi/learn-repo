import { GAME_CONFIG } from "./config.js";
import { applyPowerUp, isShieldActive, POWER_UP_TYPES } from "./powerups.js";

function randomRange(min, max) {
  return Math.random() * (max - min) + min;
}

function createFalling(state, radius) {
  const difficulty = state.difficulty || 1;
  return {
    x: randomRange(radius, GAME_CONFIG.width - radius),
    y: -radius,
    radius,
    speed: randomRange(GAME_CONFIG.fallSpeedMin, GAME_CONFIG.fallSpeedMax) * difficulty,
  };
}

export function spawnStar(state) {
  state.stars.push(createFalling(state, GAME_CONFIG.starRadius));
}

export function spawnBomb(state) {
  state.bombs.push(createFalling(state, GAME_CONFIG.bombRadius));
}

export function spawnPowerUp(state) {
  state.powerUps.push({
    ...createFalling(state, GAME_CONFIG.powerUpRadius),
    type: POWER_UP_TYPES.SHIELD,
  });
}

function overlapsPlayer(circle, player) {
  const nearestX = Math.max(player.x, Math.min(circle.x, player.x + player.width));
  const nearestY = Math.max(player.y, Math.min(circle.y, player.y + player.height));
  const dx = circle.x - nearestX;
  const dy = circle.y - nearestY;
  return dx * dx + dy * dy <= circle.radius * circle.radius;
}

function updateFalling(list, deltaSeconds) {
  for (const item of list) {
    item.y += item.speed * deltaSeconds;
  }
}

export function updateEntities(state, deltaSeconds) {
  let starHits = 0, bombHits = 0, powerHits = 0;
  updateFalling(state.stars, deltaSeconds);
  updateFalling(state.bombs, deltaSeconds);
  updateFalling(state.powerUps, deltaSeconds);

  state.stars = state.stars.filter((star) => {
    if (overlapsPlayer(star, state.player)) {
      state.metrics.stars += 1;
      starHits += 1;
      return false;
    }
    return star.y - star.radius <= GAME_CONFIG.height;
  });

  state.bombs = state.bombs.filter((bomb) => {
    if (overlapsPlayer(bomb, state.player)) {
      if (!isShieldActive(state)) {
        state.lives -= 1;
        state.metrics.bombsHit += 1;
        bombHits += 1;
      }
      return false;
    }
    return bomb.y - bomb.radius <= GAME_CONFIG.height;
  });

  state.powerUps = state.powerUps.filter((powerUp) => {
    if (overlapsPlayer(powerUp, state.player)) {
      applyPowerUp(state, powerUp.type);
      state.metrics.powerUps += 1;
      powerHits += 1;
      return false;
    }
    return powerUp.y - powerUp.radius <= GAME_CONFIG.height;
  });
  return { starHits, bombHits, powerHits };
}
