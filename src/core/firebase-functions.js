import fire from '../config/fire';

export function createUser(email, password, username, callback) {
  fire.auth().createUserWithEmailAndPassword(email, password).then((authData) => {
    fire.child('users').child(authData.uid).set({
      name: username,
    });
    callback(false);
  }).catch((error) => {
    callback(error.message);
  });
}

export function signIn(email, password, callback) {
  fire.auth().signInWithEmailAndPassword(email, password).then(() => {
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
