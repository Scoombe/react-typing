import React, { Component } from 'react';
import { Input } from 'semantic-ui-react';
let wordsPerMinTest = require('wpmtest');

wordsPerMinTest = wordsPerMinTest.wordsPerMinTest;

class TypingTest extends Component {
  constructor(props) {
    super(props);
    const context = this;
    this.wordsTest = new wordsPerMinTest( () => { context.finishedFunction(); }, 0.5);
    this.onInputChange = this.onInputChange.bind(this);
    this.countdown = this.countdown.bind(this);
    this.finishedFunction = this.finishedFunction.bind(this);
    this.getDisplayText = this.getDisplayText.bind(this);
    this.countdown();
    this.state = {
      displayString: this.wordsTest.curDisplayText,
    };
  }

  onInputChange(event, value) {
    this.checkKey(value.value);
  }

  getDisplayText(clear, error) {
    let displayText;
    if (clear) {
      displayText = '';
    }
    if (error) {
      displayText += `${error}
  `;
    }
    displayText = (
      <div>
        <p>{this.wordsTest.curDisplayText}</p>
        <p>{`words typed: ${this.wordsTest.wordCount}`}</p>
        <p>{`word average WPM: ${this.wordsTest.lastTenAvWPM}`}</p>
        <p>{`total average WPM: ${this.wordsTest.averageWPM}`}</p>
      </div>
    );
    this.setState({ displayString: displayText });
  }

  checkKey(value) {
    if (this.wordsTest.started) {
      const charCheck = this.wordsTest.checkKeyChar(value);
      console.log(`key: ${value}`);
      console.log(charCheck);
      if (charCheck.isCharCorrect) {
        this.getDisplayText(true);
      }
      else {
        this.getDisplayText(true, charCheck.errorText);
      }
    }
  }


  countdown() {
    const context = this;
    setTimeout(() => {
      context.setState({ displayString: '3' });
    }, 1000);
    setTimeout(() => {
      context.setState({ displayString: '2' });
    }, 2000);
    setTimeout(() => {
      context.setState({ displayString: '1' });
      console.log(context.wordsTest);
    }, 3000);
    setTimeout(() => {
      context.setState({ displayString: 'go' });
      this.getDisplayText();
      context.wordsTest.started = true;
      context.wordsTest.startStopWatch();
    }, 4000);
  }

  finishedFunction() {
    this.setState({ displayString: 'You have finished' });
  }

  render() {
    const { displayString } = this.state;
    const { onInputChange } = this;
    return (
      <div>
        <p>{ displayString }</p>
        <Input placeholder="Type.." onChange={onInputChange} />
      </div>
    );
  }
}

export default TypingTest;
