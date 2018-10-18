import React from 'react';
import { shallow } from 'enzyme';
import Finish from '../../../../Pages/TypingTest/Components/Finish';

it('renders without crashing', () => {
  const props = {
    restart: () => null,
    wordCount: 0,
    minutes: 1,
    wpm: 90,
    lastTenAvWPM: 80,
    averageWPM: 85,
  };

  shallow(<Finish {...props} />);
});
