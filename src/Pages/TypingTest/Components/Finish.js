import React from 'react';
import PropTypes from 'prop-types';

const Finish = ({ restart, wordCount, minutes, wpm, lastTenAvWPM, averageWPM }) => {
  return (
    <div className="typingTest">
      <h3>You have Finished!</h3>
      <ul>
        <li>
          <p>Words typed: <strong>{wordCount}</strong>
          </p>
          <p> In <strong>{minutes}</strong> minutes </p>
        </li>
        <li>
          Your WPM: <strong>{wpm}</strong>
        </li>
        <li>
          Average words per minute
          <small>(last 10 seconds): </small>
          <strong>{lastTenAvWPM.toFixed(2)}</strong>
        </li>
        <li>
          Average words per minute
          <small>(total): </small>
          <strong>{averageWPM.toFixed(2)}</strong>
        </li>
      </ul>
      <button type="button" className="retry" onClick={restart}>Retry</button>
    </div>
  );
};

Finish.propTypes = {
  restart: PropTypes.func.isRequired,
  wordCount: PropTypes.number.isRequired,
  minutes: PropTypes.string.isRequired,
  wpm: PropTypes.number.isRequired,
  lastTenAvWPM: PropTypes.number.isRequired,
  averageWPM: PropTypes.number.isRequired,
};

export default Finish;
