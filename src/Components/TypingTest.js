import React, { Component } from 'react';
import { Input } from 'semantic-ui-react';
let wordsPerMinTest = require('wpmtest');

wordsPerMinTest = wordsPerMinTest.wordsPerMinTest;

class TypingTest extends Component {
  constructor(props) {
    super(props);
    this.wordsTest = new wordsPerMinTest(this.finishedFunction, 0.5);
    this.onInputChange = this.onInputChange.bind(this);
    this.countdown = this.countdown.bind(this);
    this.state = {
      displayString: this.wordsTest.curDisplayText,
      started: false,
    };
  }


  getDisplayText(clear, error) {
    let displayString;
    if (clear) {
      displayString = '';
    }
    if (error) {
      displayString += `${error}
  `;
    }
    displayString += `${this.wordsTest.curDisplayText}
  words typed: ${this.wordsTest.wordCount}
  word average WPM: ${this.wordsTest.lastTenAvWPM}
  total average WPM: ${this.wordsTest.averageWPM}`;
    this.setState(displayString, displayString);
  }

  countdown() {
    const context = this;
    setTimeout(() => {
      context.setState('displayString', '3');
    }, 1000);
    setTimeout(() => {
      context.setState('displayString', '2');
    }, 2000);
    setTimeout(() => {
      context.setState('displayString', '3');
      context.wordsTest.Started = true;
      context.wordsTest.startStopWatch();
    }, 1000);
  }

  onInputChange(event, value) {

  }

  finishedFunction() {
    this.setState({ displayString: 'You have finished' });
  }

  render() {
    const { displayString } = this.state;
    const { onInputChange } = this;
    return (
      <div>
        { displayString }
        <Input placeholder="Type.." onChange={onInputChange} />
      </div>
    );
  }
}

export default TypingTest;
