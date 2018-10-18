import React from 'react';
import { shallow } from 'enzyme';
import Test from '../../../../Pages/TypingTest/Components/Test';

it('renders without crashing', () => {
  const props = {
    getDisplayText: () => 'test',
  };

  shallow(<Test {...props} />);
});

it('calls componentDidMount once', () => {
  const spy = jest.spyOn(Test.prototype, 'componentDidMount');
  const props = {
    getDisplayText: () => 'test',
  };

  shallow(<Test {...props} />);

  expect(spy).toHaveBeenCalled();
  spy.mockRestore();
});
