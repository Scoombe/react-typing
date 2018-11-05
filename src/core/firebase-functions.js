import { firebaseAuth as auth, firebaseDB as database } from '../config/fire';

export function isUserOn() {
  return auth.currentUser;
}

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
  if (score.wpm === 0) {
    callback({ error: false, signedIn: true });
  } else if (auth.currentUser) {
    const userScore = score;
    getUsername(auth.currentUser.uid, (username) => {
      userScore.username = username;
      database.ref('scores').push(userScore).then(() => {
        callback({ error: false, signedIn: true });
      }).catch(() => {
        callback({ error: true, signedIn: true });
      });
    });
  } else {
    callback({ error: false, signedIn: false });
  }
}

export function getAllScores() {
  database.ref('scores').orderByChild();
}

export function getTop100Scores(callback) {
  database.ref('scores').orderByChild('wpm').limitToLast(100).once('value', (snapshot) => {
    callback(snapshot);
  });
}
export function getUserScores(/** username */) {

}

export function getUsersTopScores(callback) {
  if (auth.currentUser) {
    getUsername(auth.currentUser.uid, (username) => {
      database.ref('scores').orderByChild('wpm')
        .on('child_added', (snapshot) => {
          if (snapshot.val().username === username) {
            callback(snapshot);
          }
        });
    });
  }
}

export function getScoresOfTheDay() {

}
