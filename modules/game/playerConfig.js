/**
 * @file Handle save data and if player has played the game before
 * idea for save implementation is to regularly update, parse as string and obfuscate
 * can be loaded on page visit by unscrambling data and converting back to object
 */

/**
 * @type {object} core details on player
 */
const player = {
  hasPlayed: false,
  gameStats: {
    sudsCount: 0,
    producers: {
      furnace: {
        output: 0,
        count: 0,
      },
      mixer: {
        output: 0,
        count: 0,
      },
      dispenser: {
        output: 0,
        count: 0,
      },
      forager: {
        output: 0,
        count: 0,
      },
      shack: {
        output: 0,
        count: 0,
      },
      wagon: {
        output: 0,
        count: 0,
      },
    },
    managers: {
      furnaceMgr: false,
      mixerMgr: false,
      dispenserMgr: false,
      foragerMgr: false,
      shackMgr: false,
      wagonMgr: false,
    },
  },
};

/** @export player object */
export { player };
