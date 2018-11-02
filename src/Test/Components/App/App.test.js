import React from 'react';
import { shallow } from 'enzyme';
import {
  Route,
  Switch,
} from 'react-router-dom';
import App from '../../../Components/App';
import TypingHeader from '../../../Components/Header';
import TypingTest from '../../../Pages/TypingTest';
import LoginPage from '../../../Pages/LoginPage';

const wrapper = shallow(<App />);

it('renders without crashing', () => {
  shallow(<App />);
});

it('renders a TypingHeader', () => {
  expect(wrapper.find(TypingHeader).length).toBe(1);
});

it('renders a Switch', () => {
  expect(wrapper.find(Switch).length).toBe(1);
});

it('renders a Route to "/"', () => {
  expect(wrapper.contains(<Route exact path="/" component={TypingTest} />)).toBeTruthy();
});

it('renders a Route to "/"', () => {
  expect(wrapper.contains(<Route exact path="/" component={TypingTest} />)).toBeTruthy();
});

it('renders a Route to "/login"', () => {
  expect(wrapper.contains(<Route exact path="/login" component={LoginPage} />)).toBeTruthy();
});

it('renders a Route to "/signup"', () => {
  expect(wrapper.contains(<Route exact path="/signup" component={LoginPage} />)).toBeTruthy();
});
