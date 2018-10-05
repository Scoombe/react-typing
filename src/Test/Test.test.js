import React from 'react';
import { shallow } from 'enzyme';
import Test from '../Components/Test';

it('finishes the typing test', () => {
  const wrapper = shallow(<Test />);
  wrapper.instance().finishedFunction();
  expect(wrapper.instance().wordsTest.started).toBe(false);
  expect(wrapper.find('div').text()).toBe('You have finished');
});
