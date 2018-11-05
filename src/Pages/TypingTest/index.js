
import React, { Component } from 'react';

import { Grid, Message } from 'semantic-ui-react';

import Test from './Components/Test';
import Finish from './Components/Finish';
import './TypingTest.css';
import { createScore } from '../../core/firebase-functions';

let wordsPerMinTest = require('wpmtest');
// eslint-disable-next-line prefer-destructuring
wordsPerMinTest = wordsPerMinTest.wordsPerMinTest;

class TypingTest extends Component {
  constructor(props) {
    super(props);
    // eslint-disable-next-line new-cap
    this.wordsTest = new wordsPerMinTest(() => { this.finishedFunction(); }, 0.5);
    this.finishedFunction = this.finishedFunction.bind(this);
    this.createScoreCallback = this.createScoreCallback.bind(this);
    this.getDisplayText = this.getDisplayText.bind(this);
    this.checkKey = this.checkKey.bind(this);
    this.startStopWatch = this.startStopWatch.bind(this);
    this.restartTest = this.restartTest.bind(this);
    this.renderFinish = this.renderFinish.bind(this);
    this.renderTest = this.renderTest.bind(this);
    this.wordsTest.interrupted = false;
    this.state = {
      finished: false,
      error: '',
      message: '',
    };
  }

  componentWillUnmount() {
    this.wordsTest.finishStopWatch();
    this.wordsTest.interrupted = true;
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
    const {
      wordCount,
      averageWPM,
      minutes,
    } = this.wordsTest;
    const score = {
      wpm: wordCount / minutes,
      averageWPM: averageWPM.toFixed(2),
    };
    if (this.wordsTest.interrupted) {
      this.wordsTest.interrupted = false;
    } else {
      createScore(score, this.createScoreCallback);
    }
  }

  createScoreCallback(callbackObj) {
    if (callbackObj.error) {
      this.setState({ error: 'error creating score!' });
    } else if (!callbackObj.signedIn) {
      this.setState({ message: 'sign in to save scores!' });
    }
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
    const { finished, error, message } = this.state;
    return (
      <Grid>
        <Grid.Column width={3} />
        <Grid.Column width={9}>
          { finished ? (this.renderFinish()) : (this.renderTest()) }
          { error
            && (
              <Message negative>
                <Message.Header> Score update failed </Message.Header>
                <p>{error}</p>
              </Message>
            )}
          { message
          && (
            <Message>
              <p>{message}</p>
            </Message>
          )}
        </Grid.Column>
        <Grid.Column width={3} />
      </Grid>
    );
  }
}

export default TypingTest;
