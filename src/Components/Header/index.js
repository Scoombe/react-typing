import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import {
  Grid, Header, Icon, Segment,
} from 'semantic-ui-react';

import './TypingHeader.css';

class TypingHeader extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
    this.state = {
      userName: props.userName,
    };
  }

  handleClick(e) {
    const { history } = this.props;
    history.push(e.currentTarget.dataset.route);
  }

  render() {
    const { userName } = this.state;
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
            <Grid.Column>
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
