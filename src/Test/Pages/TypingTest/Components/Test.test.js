import React from 'react';
import { shallow } from 'enzyme';
import Test from '../../../../Pages/TypingTest/Components/Test';

it('renders without crashing', () => {
  const props = {
    getDisplayText: () => 'test',
  };

  shallow(<Test {...props} />);
});
