import React from 'react';
import { shallow } from 'enzyme';
import App from '../Components/App/index';

it('renders without crashing', () => {
  shallow(<App />);
});
