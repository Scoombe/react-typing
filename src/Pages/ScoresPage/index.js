import React, { Component } from 'react';
import { Grid, List, Icon } from 'semantic-ui-react';

import { getTop100Scores } from '../../core/firebase-functions';

function returnScoreListItem(score, first) {
  return (
    <List.Item>
      {first && <Icon name="trophy" />}
      <List.Content>
        <List.Header>{score.username}</List.Header>
        {`WPM: ${score.wpm} average WPM: ${score.averageWPM}`}
      </List.Content>
    </List.Item>
  );
}

class ScoresPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      scores: [],
    };
    this.getsScoresCallBack = this.getsScoresCallBack.bind(this);
    this.getScores = this.getScores.bind(this);
    this.getScores();
  }

  getScores() {
    getTop100Scores(this.getsScoresCallBack);
  }

  getsScoresCallBack(scores) {
    console.log(scores.val());
    this.setState({ scores: scores.val() });
  }

  createListItems() {
    const { scores } = this.state;
    const scoresList = [];
    console.log(`object length: ${Object.keys(scores).length}`);
    for (let i = 0; i < Object.keys(scores).length; i += 1) {
      scoresList.push(returnScoreListItem(scores[Object.keys(scores)[i]]), i === 0);
    }
    return scoresList;
  }

  render() {
    return (
      <Grid>
        <Grid.Column width="6" />
        <Grid.Column width="3">
          <List size="large" celled>
            {
              this.createListItems()
            }
          </List>
        </Grid.Column>
        <Grid.Column width="7" />
      </Grid>
    );
  }
}

export default ScoresPage;
