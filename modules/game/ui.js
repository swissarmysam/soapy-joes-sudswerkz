/**
 * @file Create a class with all game UI elements
 */

/**
 * @import Make sound effects and game event objects available to be displayed in UI
 */
import * as allSounds from './soundEffects.js';
import { createAndDisplayEvent } from './gameEvent.js';

/**
 * Class for the engine that updates all UI elements and includes button logic
 * @export
 * @class SudswerkzUI
 */
export default class SudswerkzUI {
  /**
   * Creates an instance of SudswerkzUI.
   * @param {*} engine
   * @memberof SudswerkzUI
   */
  constructor(engine) {
    this.engine = engine;
    this.gameElem = document.getElementById('game');
    this.productionElem = document.getElementById('production');
    this.managementElem = document.getElementById('management');
    this.currencyElem = document.getElementById('currency');
    this.producerElems = {};
    this.managerElems = {};
  }

  /**
   * Initialise the game elements and game events interval
   * @memberof SudswerkzUI
   */
  init() {
    this._initProducerElements();
    this._initManagerElements();
    createAndDisplayEvent();
  }

  /**
   * Create a game loop to update UI elements
   * @memberof SudswerkzUI
   */
  update() {
    const now = Date.now();

    const sudsCount = this.engine.currencies.suds.value;

    /* Create soap production level */
    const soapProduction =
      sudsCount < 2000000 ? sudsCount / 15000 : sudsCount / 30000;

    const currentLevel = soapProduction.toFixed();

    /* Display amount of suds earned and current level */
    this.currencyElem.innerHTML = `Suds Count: ${this.engine.formatNumber(
      this.engine.currencies.suds.value
    )} - Soap Production Level: ${
      currentLevel < 1
        ? 'Darnit! Get to work!'
        : currentLevel >= 1
        ? currentLevel
        : currentLevel > 100000
        ? "Retirin' from the soap game"
        : 'Game Over'
    }`;

    /* Update the producer values  */
    for (const key in this.producerElems) {
      const prod = this.producerElems[key];
      const producer = this.engine.producers[key];

      prod.title.innerHTML = `${key} (${producer.count})`;
      prod.title.disabled = producer.count <= 0;

      for (const out of prod.outputs) {
        const resource = this.engine.resources[out.key];
        const progressPerc = this.calculatePercentageComplete(now, out).toFixed(
          0
        );
        const outputValue =
          resource.basePrice.amount *
          out.rule.productionAmount *
          producer.count;

        if (!Number.isNaN(outputValue)) {
          let text = `${this.engine.formatNumber(outputValue)} Suds`;

          if (producer.processingEnabled && producer.count > 0) {
            text = `${progressPerc}% ⤳ ${text}`;
          }

          // force production stats to show
          if (outputValue <= 0) {
            // console.log(producer);
            text = `Starts at ${out.rule.productionAmount *
              resource.basePrice.amount} suds every ${out.rule.productionTime /
              1000} seconds`;
          }

          out.elem.innerHTML = text;
        }
      }

      const cost = producer.calculateCost(1);
      prod.buy.innerHTML = `Buy x 1 - Suds ${this.engine.formatNumber(
        cost.price
      )}`;
      prod.buy.disabled = this.engine.currencies.suds.value - cost.price < 0;
    }

    for (const key in this.managerElems) {
      const manager = this.managerElems[key].title.managerObj;
      this.managerElems[key].title.disabled = manager.count > 0;
    }
  }

  /* Calculate the percentage that producer has run */
  calculatePercentageComplete(now, out) {
    return ((now - out.rule.lastProcessed) / out.rule.productionTime) * 100;
  }

  /**
   * Initialise and update the producer elements in game UI
   * @private
   * @memberof SudswerkzUI
   */
  _initProducerElements() {
    const onBuyButtonPressed = e => {
      const producer = e.target.producerObj;
      const cost = producer.calculateCost(1);
      if (this.engine.currencies.suds.value - cost.price >= 0) {
        producer.incrementBy(1);
        this.engine.currencies.suds.incrementBy(-cost.price);
      }
      if (!e.target.disabled) allSounds.selectAndPlaySound(producer.state.type);
      e.preventDefault();
    };

    const onStartProcessingButtonPressed = e => {
      const producer = e.target.producerObj;
      if (producer.count) {
        producer.processingEnabled = true;
      }
      if (!e.target.disabled && producer.state.type === 'producer') {
        allSounds.selectAndPlaySound(producer.processingEnabled);
      }
      // console.log(producer);
      e.preventDefault();
    };

    for (const key in this.engine.producers) {
      const producer = this.engine.producers[key];

      this.producerElems[key] = { title: null, outputs: [] };

      const p = document.createElement('div');
      p.className = 'producer';

      // Title
      const pTitle = document.createElement('button');
      pTitle.className = 'title custom-font';
      pTitle.producerObj = producer;
      pTitle.innerHTML = `${key} (${producer.count})`;
      p.appendChild(pTitle);
      this.producerElems[key].title = pTitle;
      pTitle.addEventListener('touchstart', onStartProcessingButtonPressed);
      pTitle.addEventListener('click', onStartProcessingButtonPressed);

      for (const o in producer.outputs.resources) {
        const out = producer.outputs.resources[o];
        const pOutput = document.createElement('div');
        pOutput.className = 'output custom-font';
        pOutput.innerHTML = `${out.productionAmount *
          producer.count} ${o}(s) per ${out.productionTime}ms`;
        p.appendChild(pOutput);

        // console.log(out);

        this.producerElems[key].outputs.push({
          key: o,
          rule: out,
          elem: pOutput,
        });
      }

      const pButton = document.createElement('button');
      pButton.className = 'button custom-font';
      pButton.innerHTML = `Buy x 1 - Suds ${this.engine.formatNumber(
        this.engine.producers[key].calculateCost(1).price
      )}`;
      pButton.producerObj = this.engine.producers[key];
      pButton.addEventListener('touchstart', onBuyButtonPressed);
      pButton.addEventListener('click', onBuyButtonPressed);
      p.appendChild(pButton);
      this.producerElems[key].buy = pButton;

      this.productionElem.appendChild(p);
    }
  }

  /**
   * Initialise and update the manager elements in game UI
   * @private
   * @memberof SudswerkzUI
   */
  _initManagerElements() {
    const onBuyManagerPressed = e => {
      const manager = e.target.managerObj;
      const currency = this.engine.currency(manager.basePrice.currency);

      if (manager.count <= 0) {
        if (manager.purchase(currency)) {
          this.managerElems[manager.key].block.classList.add('disabled');
          this.managerElems[manager.key].block.setAttribute('disabled', true);
          allSounds.selectAndPlaySound(manager.state.key);
        }
      }

      e.preventDefault();
    };

    for (const key in this.engine.reactors) {
      const manager = this.engine.reactor(key);
      if (manager.uiShouldIgnore) continue;
      const p = document.createElement('div');
      p.className = 'manager ';

      this.managerElems[manager.key] = { block: p, title: null };

      // Title
      const pTitle = document.createElement('button');
      pTitle.className = 'title custom-font';
      pTitle.managerObj = manager;
      pTitle.innerHTML = `${manager.key}<br>(${this.engine.formatNumber(
        manager.basePrice.amount
      )} ${manager.basePrice.currency})`;
      p.appendChild(pTitle);
      this.managerElems[manager.key].title = pTitle;
      pTitle.addEventListener('click', onBuyManagerPressed);
      pTitle.addEventListener('touchstart', onBuyManagerPressed);

      this.managementElem.appendChild(p);
    }
  }
}
