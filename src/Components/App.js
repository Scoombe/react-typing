import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
} from 'react-router-dom';
import { Grid } from 'semantic-ui-react';
import TypingTest from './TypingTest';
import TypingHeader from './TypingHeader';

function App() {
  return (
    <div className="App">
      <TypingHeader />
      <Grid>
        <Grid.Column width={3} />
        <Grid.Column width={9}>
          <Router>
            <Switch>
              <Route exact path="/" component={TypingTest} />
            </Switch>
          </Router>
        </Grid.Column>
        <Grid.Column width={3} />
      </Grid>
    </div>
  );
}

export default App;
