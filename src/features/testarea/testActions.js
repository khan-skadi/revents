import { INCREMENT_COUNTER, DECREMENT_COUNTER } from './testConstants.js';
import { asyncActionStart, asyncActionFinish } from '../async/asyncActions.js';
import { ASYNC_ACTION_START } from '../async/asyncConstants.js';

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

const delay = ms => {
  return new Promise(resolve => setTimeout(resolve, ms));
};

export const incrementAsync = name => {
  return async dispatch => {
    dispatch({ type: ASYNC_ACTION_START, payload: name });
    await delay(1000);
    dispatch(incrementCounter());
    dispatch(asyncActionFinish());
  };
};

export const decrementAsync = name => {
  return async dispatch => {
    dispatch({ type: ASYNC_ACTION_START, payload: name });
    await delay(1000);
    dispatch({ type: DECREMENT_COUNTER });
    dispatch(asyncActionFinish());
  };
};

// {
//     type: INCREMENT_COUNTER,
//     payload: {
//         data: 43
//     }
// }
