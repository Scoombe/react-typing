import React from 'react';
import { shallow } from 'enzyme';
import Test from '../../../../Pages/TypingTest/Components/Test';

const defaultProps = {
  getDisplayText: () => 'test',
  checkKey: () => 'test',
  startStopWatch: () => 'test',
};

it('renders without crashing', () => {
  shallow(<Test {...defaultProps} />);
});
it('calls componentDidMount once', () => {
  const spy = jest.spyOn(Test.prototype, 'componentDidMount');
  shallow(<Test {...defaultProps} />);
  expect(spy).toHaveBeenCalled();
  spy.mockRestore();
});
it('adds keydown event listener in componentDidMount', () => {
  const spy = jest.spyOn(document, 'addEventListener');
  Test.prototype.onInputChange = jest.fn();
  const wrapper = shallow(<Test {...defaultProps} />);
  expect(spy).toHaveBeenCalledWith('keydown', wrapper.instance().onInputChange, false);
  spy.mockRestore();
});
