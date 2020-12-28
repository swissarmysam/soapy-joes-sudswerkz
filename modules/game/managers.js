/**
 * @file Create manager details (cost, association) and handle automatic processing if manager is not purchased
 */

/** @type {object} if manager does not exist then stop automatic processing */
const eventHandlers = [
  {
    event: 'PRODUCER_OUTPUT',
    handler(e) {
      if (this.count === 0) {
        this.entity.processingEnabled = false;
      }
    },
  },
];

/**
 * Used for establishing game logic around managers - key also used to play unique sound effects
 * @type {object} core details on managers such as cost, what producer they belong etc
 * @export managers
 */
export default {
  KettleMgr: {
    key: "Shovellin' Stan",
    entityType: 'producer',
    entityKey: 'Furnace',
    basePrice: {
      currency: 'suds',
      amount: 1000,
    },
    count: 0,
    maxCount: 1,
    eventHandlers,
  },
  MixerMgr: {
    key: 'Cranky Caleb',
    entityType: 'producer',
    entityKey: 'Mixer',
    basePrice: {
      currency: 'suds',
      amount: 75000,
    },
    count: 0,
    eventHandlers,
  },
  DispenserMgr: {
    key: "Dispensin' Daisy",
    entityType: 'producer',
    entityKey: 'Dispenser',
    basePrice: {
      currency: 'suds',
      amount: 300000,
    },
    count: 0,
    eventHandlers,
  },
  ForagingMgr: {
    key: 'Piggy Pete',
    entityType: 'producer',
    entityKey: 'Forager',
    basePrice: {
      currency: 'suds',
      amount: 1500000,
    },
    count: 0,
    eventHandlers,
  },
  ShackMgr: {
    key: 'Handy Hank',
    entityType: 'producer',
    entityKey: 'Shack',
    basePrice: {
      currency: 'suds',
      amount: 4500000,
    },
    count: 0,
    eventHandlers,
  },
  WagonMgr: {
    key: "Bootleggin' Brook",
    entityType: 'producer',
    entityKey: 'Wagon',
    basePrice: {
      currency: 'suds',
      amount: 10000000,
    },
    count: 0,
    eventHandlers,
  },
};
