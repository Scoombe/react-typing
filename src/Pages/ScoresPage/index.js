import React, { Component } from 'react';
import { Grid } from 'semantic-ui-react';

class ScoresPage extends Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }

  render() {
    return (
      <Grid>
        <Grid.Column width="6" />
        <Grid.Column width="3">
          <p> hello </p>
        </Grid.Column>
        <Grid.Column width="7" />
      </Grid>
    );
  }
}

export default ScoresPage;
