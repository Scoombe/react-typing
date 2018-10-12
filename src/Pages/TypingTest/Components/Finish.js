import React from 'react';

function Finish(props) {
  const {
    restart, wordCount, minutes, wpm, lastTenAvWPM, averageWPM,
  } = props;
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
}

export default Finish;
