/**
 * @file Create producer details (cost, association, co-efficient etc)
 */

/**
 * Used for establishing game logic around managers - key also used to play unique sound effects
 * @type {object} core details on producers such as cost, prod time, prod output and co-efficient for increase
 * @export producers
 */
export default {
  Furnace: {
    key: 'Furnace',
    outputs: {
      resources: {
        coal: {
          productionTime: 1000,
          productionAmount: 2,
        },
      },
    },
    baseCost: {
      currency: 'suds',
      amount: 6,
    },
    costCoefficient: 1.13,
    count: 1,
    processingEnabled: false,
  },
  Mixer: {
    key: 'Mixer',
    outputs: {
      resources: {
        cranks: {
          productionTime: 2500,
          productionAmount: 8,
        },
      },
    },
    baseCost: {
      currency: 'suds',
      amount: 750,
    },
    costCoefficient: 1.12,
    count: 0,
    processingEnabled: false,
  },
  Dispenser: {
    key: 'Dispenser',
    outputs: {
      resources: {
        mixture: {
          productionTime: 5000,
          productionAmount: 33,
        },
      },
    },
    baseCost: {
      currency: 'suds',
      amount: 3800,
    },
    costCoefficient: 1.11,
    count: 0,
    processingEnabled: false,
  },
  Forager: {
    key: 'Forager',
    outputs: {
      resources: {
        piggies: {
          productionTime: 10000,
          productionAmount: 99,
        },
      },
    },
    baseCost: {
      currency: 'suds',
      amount: 14536,
    },
    costCoefficient: 1.1,
    count: 0,
    processingEnabled: false,
  },
  Shack: {
    key: 'Shack',
    outputs: {
      resources: {
        nails: {
          productionTime: 20000,
          productionAmount: 888,
        },
      },
    },
    baseCost: {
      currency: 'suds',
      amount: 77777,
    },
    costCoefficient: 1.09,
    count: 0,
    processingEnabled: false,
  },
  Wagon: {
    key: 'Wagon',
    outputs: {
      resources: {
        gas: {
          productionTime: 50000,
          productionAmount: 1337,
        },
      },
    },
    baseCost: {
      currency: 'suds',
      amount: 333333,
    },
    costCoefficient: 1.08,
    count: 0,
    processingEnabled: false,
  },
};
