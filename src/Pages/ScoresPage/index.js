import React, { Component } from 'react';
import {
  Grid, List, Icon, Header,
} from 'semantic-ui-react';

import { firebaseAuth as auth } from '../../config/fire';
import { getTop100Scores, getUsersTopScores, isUserOn } from '../../core/firebase-functions';

function returnScoreListItem(score, key, first) {
  return (
    <List.Item key={key}>
      <List.Content>
        <List.Header>{score.username}  {first && <Icon name="trophy" color="yellow" />}</List.Header>
        WPM: {score.wpm}  <br />
        Average WPM: {score.averageWPM}
      </List.Content>
    </List.Item>
  );
}

function sortScoreData(scores) {
  let scoresList = [];
  let lastScore;
  scores.forEach((score) => {
    lastScore = score;
    scoresList.push(returnScoreListItem(score.val(), score.key));
  });
  scoresList = scoresList.reverse();
  if (lastScore) {
    scoresList[0] = returnScoreListItem(lastScore.val(), lastScore.key, true);
  }
  return scoresList;
}

class ScoresPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      scores: [],
      userScoreListItems: [],
    };
    this.getScoresCallBack = this.getScoresCallBack.bind(this);
    this.getScores = this.getScores.bind(this);
    this.getUserScoresCallBack = this.getUserScoresCallBack.bind(this);
    this.getUserScores = this.getUserScores.bind(this);
    this.getScores();
  }

  componentDidMount() {
    this.authListener();
    this.getScores();
  }

  getScores() {
    getTop100Scores(this.getScoresCallBack);
  }

  getUserScores() {
    getUsersTopScores(this.getUserScoresCallBack);
  }

  getUserScoresCallBack(userScore) {
    const { userScoreListItems } = this.state;
    userScoreListItems.push(returnScoreListItem(userScore.val(), userScore.key));
    this.setState({ userScoreListItems });
  }

  getScoresCallBack(scores) {
    this.setState({ scores });
  }

  createGlobalScoresListItems() {
    const { scores } = this.state;
    return sortScoreData(scores);
  }

  createUserScoresListItems() {
    const { userScores } = this.state;
    return sortScoreData(userScores);
  }

  authListener() {
    auth.onAuthStateChanged((user) => {
      if (user) {
        this.getUserScores();
      }
    });
  }


  render() {
    const firstColWidth = isUserOn() ? 3 : 6;
    const { userScoreListItems } = this.state;
    return (
      <Grid>
        <Grid.Column width={firstColWidth} />
        <Grid.Column width="4">
          <Header as="h2" icon textAlign="center">
            <Icon name="globe" circular />
            <Header.Content>Global Scores</Header.Content>
          </Header>
          <List size="large" celled>
            {
              this.createGlobalScoresListItems()
            }
          </List>
        </Grid.Column>
        <Grid.Column width="2" />
        { isUserOn()
        && (
          <Grid.Column width="4">
            <Header as="h2" icon textAlign="center">
              <Icon name="user" circular />
              <Header.Content>User Scores</Header.Content>
            </Header>
            <List size="large" celled>
              {
                userScoreListItems
              }
            </List>
          </Grid.Column>
        )
        }
      </Grid>
    );
  }
}

export default ScoresPage;
