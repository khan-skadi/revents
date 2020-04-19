import { INCREMENT_COUNTER, DECREMENT_COUNTER } from './testConstants.js';

// We create Action Creators which return Actions. Actions payload has to be object. It cant be function
export const incrementCounter = () => {
  // Actions Creator above returns the action below.
  return {
    type: INCREMENT_COUNTER
  };
};

export const decrementCounter = () => {
  return {
    type: DECREMENT_COUNTER
  };
};

// {
//     type: INCREMENT_COUNTER,
//     payload: {
//         data: 43
//     }
// }
