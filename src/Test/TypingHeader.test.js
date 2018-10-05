import React from 'react';
import { shallow } from 'enzyme';
import TypingHeader from '../Components/Header';

it('renders without crashing', () => {
  shallow(<TypingHeader />);
});
