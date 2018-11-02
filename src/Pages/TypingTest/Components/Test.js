import React, { Component } from 'react';

class Test extends Component {
  constructor(props) {
    super(props);
    const { getDisplayText } = this.props;
    this.onInputChange = this.onInputChange.bind(this);
    this.countdown = this.countdown.bind(this);
    this.setDisplayText = this.setDisplayText.bind(this);
    this.state = {
      displayString: getDisplayText(),
    };
  }

  componentDidMount() {
    this.mounted = true;
    document.addEventListener('keydown', this.onInputChange, false);
    this.countdown();
  }

  componentWillUnmount() {
    this.mounted = false;
    document.removeEventListener('keydown', this.onInputChange, false);
  }

  onInputChange(event) {
    const { checkKey } = this.props;
    const keyCheck = checkKey(event.key);
    if (keyCheck !== null) {
      if (keyCheck.isCharCorrect === true) {
        this.setDisplayText();
      } else {
        this.setDisplayText(keyCheck.errorText);
      }
    }
  }

  setDisplayText(error) {
    if (this.mounted) {
      const { getDisplayText } = this.props;
      const displayText = getDisplayText(error);
      this.setState({ displayString: displayText });
    }
  }

  countdown() {
    const context = this;
    const { startStopWatch } = this.props;
    context.setDisplayText('3');
    setTimeout(() => {
      context.setDisplayText('2');
    }, 1000);
    setTimeout(() => {
      context.setDisplayText('1');
    }, 2000);
    setTimeout(() => {
      context.setDisplayText('Type!');
      startStopWatch();
    }, 3000);
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
