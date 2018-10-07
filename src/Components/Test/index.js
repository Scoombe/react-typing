import React, { Component } from 'react';
import './Test.css';

let wordsPerMinTest = require('wpmtest');
// eslint-disable-next-line prefer-destructuring
wordsPerMinTest = wordsPerMinTest.wordsPerMinTest;

class Test extends Component {
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
      <div className="displayText">
        <div className={`error ${error ? 'show' : ''}`}>
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
        </div>
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
        {this.getStats()}
      </div>
    );
    this.setState({ displayString: displayText });
  }

  getStats() {
    const { wordsTest } = this;

    return (
      <div>
        <ul>
          <li>
            Words typed:
            <strong>{wordsTest.wordCount}</strong>
          </li>
          <li>
            Average words per minute
            <small>(last 10 seconds): </small>
            <strong>{wordsTest.lastTenAvWPM.toFixed(2)}</strong>
          </li>
          <li>
            Average words per minute
            <small>(total): </small>
            <strong>{wordsTest.averageWPM.toFixed(2)}</strong>
          </li>
        </ul>
      </div>
    );
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

  finishedFunction() {
    this.wordsTest.started = false;
    this.setState({
      displayString: (
        <div>
          <h3>Finished</h3>
          {this.getStats()}
          <button type="button" className="retry" onClick={this.restart.bind(this)}>Retry</button>
        </div>
      ),
    });
  }

  restart() {
    this.wordsTest.restartTest();
    this.countdown();
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

export default Test;
