import React, { Component } from 'react';
import './TypingTest.css';

let wordsPerMinTest = require('wpmtest');
// eslint-disable-next-line prefer-destructuring
wordsPerMinTest = wordsPerMinTest.wordsPerMinTest;

class TypingTest extends Component {
  constructor(props) {
    super(props);
    const context = this;
    // eslint-disable-next-line new-cap
    this.wordsTest = new wordsPerMinTest(() => { context.finishedFunction(); }, 0.5);
    this.onInputChange = this.onInputChange.bind(this);
    this.countdown = this.countdown.bind(this);
    this.finishedFunction = this.finishedFunction.bind(this);
    this.setDisplayText = this.setDisplayText.bind(this);
    this.countdown();
    this.state = {
      displayString: this.wordsTest.curDisplayText,
    };
  }

  componentDidMount() {
    document.addEventListener('keydown', this.onInputChange, false);
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.onInputChange, false);
  }

  onInputChange(event) {
    this.checkKey(event.key);
  }

  setDisplayText(clear, error) {
    let displayText;
    const { displayString } = this.state;
    if (clear) {
      displayText = '';
    }

    displayText = (
      <div>
        {
          error !== undefined
          && (
            <p className="red">
              {' '}
              {error}
              {' '}
            </p>
          )
        }
        {
          clear === true
          && (
            <p>
              {' '}
              {displayString}
              {' '}
            </p>
          )
        }
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
      if (charCheck.isCharCorrect === true) {
        this.setDisplayText(false);
      } else {
        this.setDisplayText(false, charCheck.errorText);
      }
    }
  }


  countdown() {
    const context = this;
    setTimeout(() => {
      context.setDisplayText(false, '3');
    }, 1000);
    setTimeout(() => {
      context.setDisplayText(false, '2');
    }, 2000);
    setTimeout(() => {
      context.setDisplayText(false, '1');
    }, 3000);
    setTimeout(() => {
      context.setDisplayText(false, 'Go');
      context.wordsTest.started = true;
      context.wordsTest.startStopWatch();
    }, 4000);
  }

  finishedFunction() {
    this.wordsTest.started = false;
    this.setState({ displayString: 'You have finished' });
  }

  render() {
    const { displayString } = this.state;
    return (
      <div className="typingTest">
        { displayString }
      </div>
    );
  }
}

export default TypingTest;
