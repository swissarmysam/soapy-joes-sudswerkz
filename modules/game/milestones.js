/**
 * @file Create milestone amounts for producers
 */

/** @type {object} this is the logic to increase production value/speed based on quantity of producer type owned */
const eventHandlers = [
  {
    event: 'PRODUCER_COUNT_UPDATED',
    handler(e) {
      const milestones = [
        5,
        10,
        25,
        50,
        75,
        100,
        150,
        200,
        300,
        400,
        500,
        750,
        1000,
        2500,
        5000,
        10000,
      ];
      const timeReductionFactor = 0.8;
      const resourceValueIncreaseFactor = 2;

      if (this.lastCount) {
        if (this.lastCount != e.obj.count) {
          for (let i = 0; i < milestones.length - 1; i++) {
            if (
              this.lastCount < milestones[i] &&
              e.obj.count >= milestones[i]
            ) {
              for (const key in e.obj.outputs.resources) {
                e.obj.outputs.resources[
                  key
                ].productionTime *= timeReductionFactor;
                if (i % 2 !== 0) {
                  this.engine.resource(
                    key
                  ).basePrice.amount *= resourceValueIncreaseFactor;
                }
              }
            }
          }
        }
      }
      this.lastCount = e.obj.count;
    },
  },
];

/**
 * @type {object} associate milestones with each producer type
 * @export
 */
export default {
  MSFurnace: {
    key: 'Furnace Milestones',
    entityType: 'producer',
    entityKey: 'Furnace',
    count: 1,
    maxCount: 1,
    eventHandlers,
  },
  MSMixer: {
    key: 'Mixer Milestones',
    entityType: 'producer',
    entityKey: 'Mixer',
    count: 1,
    maxCount: 1,
    eventHandlers,
  },
  MSDispenser: {
    key: 'Dispenser Milestones',
    entityType: 'producer',
    entityKey: 'Dispenser',
    count: 1,
    maxCount: 1,
    eventHandlers,
  },
  MSForager: {
    key: 'Forager Milestones',
    entityType: 'producer',
    entityKey: 'Forager',
    count: 1,
    maxCount: 1,
    eventHandlers,
  },
  MSShack: {
    key: 'Shack Milestones',
    entityType: 'producer',
    entityKey: 'Shack',
    count: 1,
    maxCount: 1,
    eventHandlers,
  },
  MSWagon: {
    key: 'Wagon Milestones',
    entityType: 'producer',
    entityKey: 'Wagon',
    count: 1,
    maxCount: 1,
    eventHandlers,
  },
};
