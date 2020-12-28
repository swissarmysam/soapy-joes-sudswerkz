/**
 * @file Initialise all game logic and start timers
 */

/**
 * @import Required modules for game functionality
 */
import ContinuumEngine from '../../src/js/engine.js';
import SudswerkzUI from './ui.js';
import ResourceList from './resources.js';
import ProducerList from './producers.js';
import ManagerList from './managers.js';
import MilestoneList from './milestones.js';

/** @type {*} */
const engine = new ContinuumEngine();
/** @type {*} */
const ui = new SudswerkzUI(engine);

/** @type {Object} has to be created here for export scope - set value on window load */
let currency;

window.onload = function() {
  /** if you would like to test with more credits then increase the 0 value */
  engine.createCurrency('suds', 0);

  /** invoke all functions to create game objects */
  createResources();
  createProducers();
  createManagers();
  createMilestoneRactors();

  ui.init();

  window.requestAnimationFrame(onTick);
  /** set currency var for export - this makes value available in gameEvent module */
  currency = engine.currencies.suds;
};

/**
 * Recursively called to update game loop
 * @function
 * @param {Number} dt date/time in milliseconds
 */
function onTick(dt) {
  engine.onTick(Date.now());
  ui.update();
  window.requestAnimationFrame(onTick);
}

function createResources() {
  for (const res in ResourceList) {
    engine.createResource(ResourceList[res]);
  }
}

function createProducers() {
  for (const prod in ProducerList) {
    const producer = engine.createProducer(ProducerList[prod]);

    /** increase the cost of producer and output value */
    producer.on('PRODUCER_OUTPUT', e => {
      engine.currencies.suds.incrementBy(
        e.output.calculatePrice(e.output.count).amount
      );
      e.output.incrementBy(-e.output.count);
    });
  }
}

function createManagers() {
  for (const mgr in ManagerList) {
    const manager = engine.createReactor(ManagerList[mgr]);

    /** enable automatic processing on associated producer if manager is purchased */
    manager.on('REACTOR_PURCHASED', e => {
      const manager = e;
      manager.entity.processingEnabled = true;
    });
  }
}

function createMilestoneRactors() {
  for (const ms in MilestoneList) {
    const reactor = engine.createReactor(MilestoneList[ms]);
    reactor.uiShouldIgnore = true;
  }
}

export { currency };
