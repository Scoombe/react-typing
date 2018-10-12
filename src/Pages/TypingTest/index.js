
import React, { Component } from 'react';

import { Grid } from 'semantic-ui-react';

import Test from './Components/Test';
import Finish from './Components/Finish';
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
    this.finishedFunction = this.finishedFunction.bind(this);
    this.getDisplayText = this.getDisplayText.bind(this);
    this.checkKey = this.checkKey.bind(this);
    this.startStopWatch = this.startStopWatch.bind(this);
    this.restartTest = this.restartTest.bind(this);
    this.renderFinish = this.renderFinish.bind(this);
    this.renderTest = this.renderTest.bind(this);
    this.state = { finished: false };
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

  getDisplayText(error) {
    const { wordsTest } = this;
    return (
      <div className="displayText">
        <div className={`error ${error ? 'show' : ''}`}>
          {
            error !== undefined
            && (
              <p className="red">
                {error}
              </p>
            )
          }
        </div>
        <p>{wordsTest.curDisplayText}</p>
        {this.getStats()}
      </div>
    );
  }

  startStopWatch() {
    this.wordsTest.started = true;
    this.wordsTest.startStopWatch();
  }

  checkKey(value) {
    if (this.wordsTest.started) {
      const charCheck = this.wordsTest.checkKeyChar(value);
      return charCheck;
    }
    return null;
  }

  finishedFunction() {
    this.setState({ finished: true });
  }

  restartTest() {
    this.wordsTest.restartTest();
    this.setState({ finished: false });
  }

  renderTest() {
    return (
      <Test
        getDisplayText={this.getDisplayText}
        checkKey={this.checkKey}
        startStopWatch={this.startStopWatch}
      />
    );
  }

  renderFinish() {
    const {
      wordCount,
      minutes,
      lastTenAvWPM,
      averageWPM,
    } = this.wordsTest;
    console.log(`wordCount: ${wordCount}, minutes ${minutes}`);
    const { restartTest } = this;
    return (
      <Finish
        restart={restartTest}
        wordCount={wordCount}
        minutes={minutes}
        wpm={wordCount / minutes}
        lastTenAvWPM={lastTenAvWPM}
        averageWPM={averageWPM}
      />
    );
  }

  render() {
    const { finished } = this.state;
    return (
      <Grid>
        <Grid.Column width={3} />
        <Grid.Column width={9}>
          { finished ? (this.renderFinish()) : (this.renderTest()) }
        </Grid.Column>
        <Grid.Column width={3} />
      </Grid>
    );
  }
}

export default TypingTest;
