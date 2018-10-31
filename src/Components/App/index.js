import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
} from 'react-router-dom';
import TypingTest from '../../Pages/TypingTest';
import TypingHeader from '../Header';
import LoginPage from '../../Pages/LoginPage';
import fire from '../../config/fire';

class App extends Component {
  constructor() {
    super();
    this.state = {
      user: null,
    };
  }

  componentDidMount() {
    this.authListener();
  }

  authListener() {
    fire.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({ user });
      }
      else {
        this.setState({ user: null });
      }
    });
  }

  render() {
    const { user } = this.state;
    return (
      <div className="App">
        <TypingHeader userName={user} />
        <Router>
          <Switch>
            <Route exact path="/" component={LoginPage} />
            <Route exact path="/login" component={LoginPage} />
            <Route exact path="/signup" component={LoginPage} />
          </Switch>
        </Router>
      </div>
    );
  }
}

export default App;
