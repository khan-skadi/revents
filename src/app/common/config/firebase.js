import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/database';
import 'firebase/auth';
import 'firebase/storage';

const firebaseConfig = {
  apiKey: 'AIzaSyAHAFJLqEo6aRVpCRHvOvz9eJlO8hcQTnQ',
  authDomain: 'revents-274814.firebaseapp.com',
  databaseURL: 'https://revents-274814.firebaseio.com',
  projectId: 'revents-274814',
  storageBucket: 'revents-274814.appspot.com',
  messagingSenderId: '993379838118',
  appId: '1:993379838118:web:2a137df1cc120aaaf9ac67',
  measurementId: 'G-KWEVLEK8LR'
};

firebase.initializeApp(firebaseConfig);
firebase.firestore();

export default firebase;
