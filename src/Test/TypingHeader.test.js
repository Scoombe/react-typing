import React from 'react';
import { shallow } from 'enzyme';
import TypingHeader from '../Components/TypingHeader';

it('renders without crashing', () => {
  shallow(<TypingHeader />);
});
