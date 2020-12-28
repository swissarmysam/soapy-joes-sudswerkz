import { wait } from './wait.js';

async function selectAllElems() {
  await wait(500);
  const allElems = [document.querySelectorAll('button.button')];
  return allElems;
}

export { selectAllElems };
