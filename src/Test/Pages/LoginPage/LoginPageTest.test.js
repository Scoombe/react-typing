import React from 'react';
import { shallow } from 'enzyme';
import LoginPage from '../../../Pages/LoginPage';

it('renders without crashing', () => {
  shallow(<LoginPage />);
});
