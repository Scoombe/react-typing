import React from 'react';
import { shallow } from 'enzyme';
import TypingTest from '../Components/TypingTest';

it('finishes the typing test', () => {
  const wrapper = shallow(<TypingTest />);
  wrapper.instance().finishedFunction();
  expect(wrapper.instance().wordsTest.started).toBe(false);
  expect(wrapper.find('div').text()).toBe('You have finished');
});
