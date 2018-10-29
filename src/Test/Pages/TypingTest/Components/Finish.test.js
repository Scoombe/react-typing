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

it('has the right finish text', () => {
  const props = {
    restart: () => null,
    wordCount: 90,
    minutes: 1,
    wpm: 90,
    lastTenAvWPM: 90,
    averageWPM: 85,
  };
  const wrapper = shallow(<Finish {...props} />);
  expect(wrapper.find('h3').first().text()).toBe('You have Finished!');
  expect(wrapper.find('li').first().text()).toBe('Words typed: 90 in 1 minutes');
  expect(wrapper.find('li').at(1).text()).toBe('Your WPM: 90');
  expect(wrapper.find('li').at(2).text()).toBe('Average words per minute(last 10 seconds): 90.00');
  expect(wrapper.find('li').at(3).text()).toBe('Average words per minute(total): 85.00');
});
