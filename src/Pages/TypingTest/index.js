
import React from 'react';

import { Grid } from 'semantic-ui-react';

import Test from './Components/Test';
import './TypingTest.css';

function TypingTest() {
  return (
    <Grid>
      <Grid.Column width={3} />
      <Grid.Column width={9}>
        <Test />
      </Grid.Column>
      <Grid.Column width={3} />
    </Grid>
  );
}

export default TypingTest;
