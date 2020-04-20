import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
// Store enhancer | Get an instance of firebase in our actions. (These give us Bindings)
import { reactReduxFirebase, getFirebase } from 'react-redux-firebase';
import { reduxFirestore, getFirestore } from 'redux-firestore';
import rootReducer from '../reducers/rootReducer';
import thunk from 'redux-thunk';
import firebase from '../common/config/firebase.js';

const rrfConfig = {
  userProfile: 'users',
  attachAuthIsReady: true,
  useFirestoreForProfile: true
  // updateProfileOnLogin: false
};

export const configureStore = () => {
  // getFirebase, getFirestore is an instance of firebase and firestore. It allows us to use the firebase API like delete, update, create etc.
  const middlewares = [thunk.withExtraArgument({ getFirebase, getFirestore })];

  const composedEnhancer = composeWithDevTools(
    applyMiddleware(...middlewares),
    reactReduxFirebase(firebase, rrfConfig),
    reduxFirestore(firebase)
  );

  const store = createStore(rootReducer, composedEnhancer);

  return store;
};
