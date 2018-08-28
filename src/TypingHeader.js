import React, { Component } from 'react';
import { Grid, Header, Icon, Segment, Button } from 'semantic-ui-react';
import './TypingHeader.css'

class TypingHeader extends Component {
    render() {
      return (
        <div className='typingHeader'> 
          <Grid columns={3}>
            <Grid.Row>
              <Grid.Column>
                <Segment inverted color='yellow'>
                <Header as='h2' icon>
                    <Icon name='play'/>
                    Typing Test
                    <Header.Subheader> start a test</Header.Subheader>
                  </Header>
                </Segment>
              </Grid.Column>
              <Grid.Column>
                <Segment inverted color='blue'>
                  <Header as='h2' icon>
                    <Icon name='keyboard'/>
                    Typing Test
                    <Header.Subheader> Test your typing skills and get a word per minute score </Header.Subheader>
                  </Header>
                </Segment>
              </Grid.Column>
              <Grid.Column>
                <Segment inverted color='green'>
                <Header as='h2' icon>
                    <Icon name='trophy'/>
                    Scores
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

  export default TypingHeader;