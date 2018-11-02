import React, { Component } from 'react';
import {
  Route,
  Switch,
} from 'react-router-dom';
import TypingTest from '../../Pages/TypingTest';
import TypingHeader from '../Header';
import LoginPage from '../../Pages/LoginPage';
import { firebaseAuth as auth } from '../../config/fire';
import { getUsername } from '../../core/firebase-functions';

class App extends Component {
  constructor() {
    super();
    this.state = {
      user: null,
    };
    this.getUsernameCallback = this.getUsernameCallback.bind(this);
  }

  componentDidMount() {
    this.authListener();
  }

  getUsernameCallback(username) {
    if (username !== null) {
      this.setState({ user: username });
    }
  }

  authListener() {
    auth.onAuthStateChanged((user) => {
      if (user) {
        getUsername(user.uid, this.getUsernameCallback);
      } else {
        this.setState({ user: null });
      }
    });
  }

  render() {
    const { user } = this.state;
    return (
      <div className="App">
        <TypingHeader userName={user} />
        <Switch>
          <Route exact path="/" component={TypingTest} />
          <Route exact path="/login" component={LoginPage} />
          <Route exact path="/signup" component={LoginPage} />
        </Switch>
      </div>
    );
  }
}

export default App;
