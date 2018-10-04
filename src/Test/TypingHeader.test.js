import React from 'react';
import { shallow } from 'enzyme';
import TypingHeader from '../Components/Header/index';

it('renders without crashing', () => {
  shallow(<TypingHeader />);
});
