import React from 'react';
import { shallow, mount } from 'enzyme';
import Test from '../../../../Pages/TypingTest/Components/Test';

const defaultProps = {
  getDisplayText: () => (<p>test</p>),
  checkKey: () => ({ isCharCorrect: true, errorText: 'none' }),
  startStopWatch: () => {},
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
it(' updates the display text ', () => {
  const wrapper = shallow(<Test {...defaultProps} />);
  expect(wrapper.find('p').first().text()).toBe('test');
});
it('calls onInputChange on keydown', () => {
  const spy = jest.spyOn(Test.prototype, 'onInputChange');
  mount(<Test {...defaultProps} />);
  document.dispatchEvent(new KeyboardEvent('keydown', { key: 'a' }));
  expect(spy).toHaveBeenCalled();
  spy.mockRestore();
});
