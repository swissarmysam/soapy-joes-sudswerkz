/**
 * @file Create and handle menu overlay
 */

/**
 * Make player config (for saves) and wait util for async logic available
 * @import
 */
import { player } from '../game/playerConfig.js';
import { wait } from '../../src/utils/wait.js';

/** @type {object} get required elements to handle events */
const canvas = document.querySelector('canvas');
const canvasWrapper = document.querySelector('.canvas-wrapper');

/**
 * Immediately invoke function to check if user has played before
 * This will be more useful when persistence and save states are implemented
 * @function
 */
(function hasPlayedBefore() {
  if (localStorage.getItem('hasPlayed')) canvasWrapper.classList.add('hidden');
})();

/**
 * update localStorage var to as played before
 * @property {boolean} hasPlayed- Indicates whether player has dismissed menu splash
 * @module module:player
 * @function
 */
function setHasPlayed() {
  player.hasPlayed = true;
  localStorage.setItem('hasPlayed', player.hasPlayed);
}

/**
 * Add CSS classes to fade out menu overlay
 * @module module:wait
 * @async
 */
async function fadeToGame() {
  canvas.classList.add('fade-to-black');
  await wait(50);
  canvasWrapper.classList.add('fade-out');
  await wait(950);
  canvasWrapper.classList.add('hidden');
  setHasPlayed();
}

/**
 * @event mouseup#fadeToGame
 */
canvas.addEventListener('mouseup', fadeToGame);
