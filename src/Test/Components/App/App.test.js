import React from 'react';
import { shallow } from 'enzyme';
import App from '../../../Components/App';
import TypingHeader from '../../../Components/Header';
import TypingTest from '../../../Pages/TypingTest';
import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom';

const wrapper = shallow(<App />);

it('renders without crashing', () => {
  shallow(<App />);
});

it('renders a TypingHeader', () => {
  expect(wrapper.find(TypingHeader).length).toBe(1);
}); 

it('renders a Router', () => {
  expect(wrapper.find(Router).length).toBe(1);
}); 

it('renders a Switch', () => {
  expect(wrapper.find(Switch).length).toBe(1);
}); 

it('renders a Route to "/"', () => {
  expect(wrapper.contains(<Route exact path="/" component={TypingTest} />)).toBeTruthy();
});