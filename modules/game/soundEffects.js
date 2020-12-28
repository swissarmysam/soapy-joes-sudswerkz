/**
 * @file Create sound object for sound effects and background music
 */

/** @type {object} - loaded from CDN and not as a dependency so need to make available in script */
const { Howl } = window;

/**
 * Load and play background music on a loop
 * Immediately-invoked on script load
 * @function
 */
(function playBackgroundMusic() {
  const backgroundMusic = new Howl({
    src:
      'https://res.cloudinary.com/el1248e7h/video/upload/v1606578972/sudswerkz/theme.mp3',
    autoplay: true,
    loop: true,
    volume: 0.15,
  });
  backgroundMusic.play();
})();

/**
 * Get correct sound file and preload into a new Howler instance
 * will be module:selectAndPlaySound
 * @param {string} key - the key for sound effect matched to object key
 * @function
 */
function selectAndPlaySound(key) {
  /** @type {string} baseUrl - the url minus file name */
  const baseUrl =
    'https://res.cloudinary.com/el1248e7h/video/upload/v1606657282/sudswerkz/';

  /** @type {object} allSounds - key/pair values for loading sound src */
  const allSounds = {
    producer: `${baseUrl}coins-tinkle.mp3`,
    true: `${baseUrl}cash-register-2.mp3`,
    level: `${baseUrl}water-bubble-1.mp3`,
    "Shovellin' Stan": `${baseUrl}shovel.mp3`,
    'Handy Hank': `${baseUrl}hammer.mp3`,
    'Piggy Pete': `${baseUrl}pig.mp3`,
    "Bootleggin' Brook": `${baseUrl}clink.mp3`,
    'Cranky Caleb': `${baseUrl}crank.mp3`,
    "Dispensin' Daisy": `${baseUrl}dispenser.mp3`,
  };

  /** @type {object} sound - create new instance of Howler with selected sound */
  const sound = new Howl({
    src: allSounds[key],
    volume: 0.4,
  });

  sound.play();
}

/** @export sound fx object available in other scripts */
export { selectAndPlaySound };
