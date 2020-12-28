/**
 * @file Create game events overlay and logic
 */

/** @type {Object} gives access to suds count */
import { currency } from './game.js';

/**
 * Object that contains all event details to display in overlay and get effect
 * @type {object} core details on managers such as cost, what producer they belong etc
 */
const events = {
  chewee: {
    type: 'negative',
    effect: 0.7,
    title: 'Chewee The Bear',
    desc:
      'Goldarnit! Chewee The Bear damages some equipment! Suds count has taken a hit!',
  },
  bootlegger: {
    type: 'positive',
    effect: 1.2,
    title: "Smooth-talkin' Bootlegger",
    desc:
      "Good ol' bootlegger managed to bribe the do-do! Delivery was much faster earning a bonus!",
  },
};

/**
 * Generate a random milliseconds between 1.5 and 3 mins for event interval
 * @return {Number} - to be used as interval gap
 */
function getRandomInterval() {
  // 1.5 minutes min
  const MIN_EVENT_INTERVAL = 1000 * 90;
  // 3 minutes max
  const MAX_EVENT_INTERVAL = 1000 * 180;
  // get a random interval value
  return Math.floor(
    Math.random() * (MAX_EVENT_INTERVAL - MIN_EVENT_INTERVAL) +
      MIN_EVENT_INTERVAL
  );
}

/**
 * select a random event from events object
 * @param {*} evts - the events object needs to be passed to it
 * @return {String} the event name
 */
function getRandomEvent(evts) {
  return new Promise(resolve => {
    const timer = setInterval(async () => {
      const eventName = Object.keys(evts)[
        Math.floor(Math.random() * Object.keys(evts).length)
      ];
      clearInterval(timer);
      resolve(eventName);
    }, getRandomInterval());
  });
}

/**
 * Increase/decrease suds count dependent on event effect
 * @param {Number} effect - value taken from event effect in object
 */
const eventEffectResolution = effect => (currency.state.value *= effect);

/**
 * Handle the event and display to user - retrigger event cycle on closing the visible modal
 * @async waits for event name promise to fulfil before displaying event overlay and applying effects
 */
async function createAndDisplayEvent() {
  const modal = document.querySelector('.modal-container');
  const eventTitle = document.querySelector('h3.event-title');
  const eventDesc = document.querySelector('p.event-desc');
  const eventEffect = document.querySelector('span.event-effect');
  const closeEvent = document.querySelector('#close');

  /** @type {*} */
  const eventName = await getRandomEvent(events);

  // first check that an event has been generated
  if (eventName) {
    // set the correct logic
    // set correct event info
    eventTitle.innerHTML = events[eventName].title;
    eventDesc.innerHTML = events[eventName].desc;
    // tell how much suds count has been changed by
    // if effect is more than 1 then increased
    // and if effect is more than 1 then get remainder if shared by 1 and multiply by 100
    eventEffect.innerHTML = `Your suds count has ${
      events[eventName].effect > 1 ? 'increased' : 'decreased'
    } by ${
      events[eventName].effect > 1
        ? Math.ceil((events[eventName].effect % 1) * 100)
        : Math.floor((1 - events[eventName].effect) * 100)
    }%!`;
    // change the suds count amount based on effect
    eventEffectResolution(events[eventName].effect);
    // make the modal visible
    modal.classList.add('modal-grid');
    modal.classList.remove('hidden');
  }

  // add event listener to handle modal closure and create a new interval (recursive)
  closeEvent.addEventListener('click', createAndDisplayEvent);
  closeEvent.addEventListener('click', () => {
    modal.classList.remove('modal-grid');
    modal.classList.add('hidden');
  });
}

/** @export createAndDisplayEvent used to init game event overlay in ui.js */
export { createAndDisplayEvent };
