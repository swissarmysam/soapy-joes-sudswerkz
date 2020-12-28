/**
 * @file Wait module
 */

/**
 * A util function to create a pause in async functions
 * @module wait
 * @param {number} [ms=0] how long should pause last in milliseconds
 */
const wait = (ms = 0) => new Promise(resolve => setTimeout(resolve, ms));

/** @export wait */
export { wait };
