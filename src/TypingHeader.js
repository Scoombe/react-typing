import React, { Component } from 'react';
import { Header, Icon, Segment } from 'semantic-ui-react';

class TypingHeader extends Component {
    render() {
      return (
          <Segment inverted color='blue'>
            <Header as='h2' icon>
              <Icon name='keyboard'/>
              Typing Test
              <Header.Subheader> Test your typing skills and get a word per minute score </Header.Subheader>
            </Header>
          </Segment>
      );
    }
  }

  export default TypingHeader;