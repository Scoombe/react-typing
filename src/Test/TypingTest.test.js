import React from 'react';
import { shallow } from 'enzyme';
import TypingTest from '../Components/TypingTest';

it('renders without crashing', () => {
  shallow(<TypingTest />);
});
