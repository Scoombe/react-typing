import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
} from 'react-router-dom';
import TypingTest from '../../Pages/TypingTest';
import TypingHeader from '../Header';

function App() {
  return (
    <div className="App">
      <TypingHeader />
      <Router>
        <Switch>
          <Route exact path="/" component={TypingTest} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
