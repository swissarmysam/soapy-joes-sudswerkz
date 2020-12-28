/**
 * @file Resources are associated with producers and is what they use to produce suds value
 */

/**
 * @type {Object} resource type and cost - associated with producers
 * @export managers
 */
export default {
  coal: {
    key: 'coal',
    basePrice: {
      currency: 'suds',
      amount: 2,
    },
    count: 0,
  },
  cranks: {
    key: 'cranks',
    basePrice: {
      currency: 'suds',
      amount: 10,
    },
    count: 0,
  },
  mixture: {
    key: 'mixture',
    basePrice: {
      currency: 'suds',
      amount: 7,
    },
    count: 0,
  },
  piggies: {
    key: 'piggies',
    basePrice: {
      currency: 'suds',
      amount: 5,
    },
    count: 0,
  },
  nails: {
    key: 'nails',
    basePrice: {
      currency: 'suds',
      amount: 2,
    },
    count: 0,
  },
  gas: {
    key: 'gas',
    basePrice: {
      currency: 'suds',
      amount: 3,
    },
    count: 0,
  },
};
