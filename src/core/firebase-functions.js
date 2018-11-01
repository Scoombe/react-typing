import { firebaseAuth as auth, firebaseDB as database } from '../config/fire';

export function createUser(email, password, callback) {
  auth.createUserWithEmailAndPassword(email, password).then(() => {
    callback(false);
  }).catch((error) => {
    callback(error.message);
  });
}

export function createUsername(username, callback) {
  database.ref('usernames').child(username).set({
    userId: auth.currentUser.uid,
  }).then(() => {
    callback(false);
  })
    .catch((error) => {
      callback(error.message);
    });
}

export function checkUsername(username, callback) {
  database.ref('usernames').orderByChild('username').equalTo(username).once('value', (snapshot) => {
    if (snapshot.exists()) {
      callback('that username exists!');
    } else {
      callback(false);
    }
  });
}

export function signIn(email, password, callback) {
  auth.signInWithEmailAndPassword(email, password).then(() => {
    callback(false);
  }).catch((error) => {
    callback(error.message);
  });
}

export function getAllScores() {

}

export function getUserScores(username) {

}

export function getScoresOfTheDay() {

}

export function createScore() {

}
