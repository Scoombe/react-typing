import firebase from 'firebase';

const config = {
  apiKey: 'AIzaSyARJv5DXqYcoOFb0_r8WG9PrQ-uCX98zyE',
  authDomain: 'react-typing.firebaseapp.com',
  databaseURL: 'https://react-typing.firebaseio.com',
  projectId: 'react-typing',
  storageBucket: 'react-typing.appspot.com',
  messagingSenderId: '393599620146',
};

const fire = firebase.initializeApp(config);
export const firebaseAuth = fire.auth();
export const firebaseDB = fire.database();
export default fire;
