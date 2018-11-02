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
  database.ref('usernames').orderByKey().equalTo(username).once('value', (snapshot) => {
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

export function signOut() {
  auth.signOut();
}

export function getUsername(userId, callback) {
  database.ref('usernames').orderByChild('userId').equalTo(userId).once('value', (snapshot) => {
    if (snapshot.exists()) {
      callback(Object.keys(snapshot.val())[0]);
    } else {
      callback(null);
    }
  });
}

export function createScore(score, callback) {
  if (auth.currentUser) {
    const userScore = score;
    userScore.userId = auth.currentUser.Id;
    database.ref('scores').push(userScore).then(() => {
      callback({ error: false, signIn: true });
    }).catch(() => {
      callback({ error: true, signedIn: true });
    });
  } else {
    callback({ error: false, signedIn: false });
  }
}

export function getAllScores() {

}

export function getUserScores(/** username */) {

}

export function getScoresOfTheDay() {

}
