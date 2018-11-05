import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import {
  Grid, Header, Icon, Segment,
} from 'semantic-ui-react';

import { signOut } from '../../core/firebase-functions';
import './TypingHeader.css';

class TypingHeader extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(e) {
    const { history, userName } = this.props;
    const { route } = e.currentTarget.dataset;
    if (route === '/login' && userName !== null) {
      signOut();
    } else {
      history.push(route);
    }
  }

  render() {
    const { userName } = this.props;
    const loggedInHeading = userName !== null ? `hello ${userName}` : 'Log in!';
    const loggedInSubHeading = userName !== null ? 'Logout!' : 'Login to save your scores ';
    return (
      <div className="typingHeader">
        <Grid columns={3}>
          <Grid.Row>
            <Grid.Column data-route="/" onClick={this.handleClick}>
              <Segment inverted color="yellow">
                <Header as="h2" icon>
                  <Icon name="play" />
                  {'Typing Test'}
                  <Header.Subheader> start a test</Header.Subheader>
                </Header>
              </Segment>
            </Grid.Column>
            <Grid.Column data-route="/login" onClick={this.handleClick}>
              <Segment inverted color="blue">
                <Header as="h2" icon>
                  <Icon name="user" />
                  {loggedInHeading}
                  <Header.Subheader>
                    {loggedInSubHeading}
                  </Header.Subheader>
                </Header>
              </Segment>
            </Grid.Column>
            <Grid.Column data-route="/scores" onClick={this.handleClick}>
              <Segment inverted color="green">
                <Header as="h2" icon>
                  <Icon name="trophy" />
                  {'Scores'}
                  <Header.Subheader> Your high scores </Header.Subheader>
                </Header>
              </Segment>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </div>
    );
  }
}

export default withRouter(TypingHeader);
