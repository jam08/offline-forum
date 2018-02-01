import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import sinon from  'sinon';
import App from '../components/App';
import Button from '../components/Button';

it('calls componentDidMount', () => {
  sinon.spy(App.prototype, 'componentDidMount');
  shallow(<App />);
  expect(App.prototype.componentDidMount.calledOnce).toEqual(true);
});

it('loads the bot page on click', () => {
  const wrapper = shallow(<App currentPage="home" />);
  wrapper.find(Button).simulate('click');
  expect(wrapper.state().currentPage).toEqual('bot');
});

it('button is named "Talk to a real human" if current page is home', () => {
  const wrapper = shallow(<App currentPage="home" />);
  expect(wrapper.find(Button).children().text()).toEqual("Talk to a real human");
});

it('loads <Posts /> if current page is home', () => {
  const wrapper = shallow(<App />);
  expect(toJson(wrapper)).toMatchSnapshot();
});

it('loads <Bot /> if currentpage is bot', () => {
  const wrapper = shallow(<App />);
  wrapper.find(Button).simulate('click');
  expect(toJson(wrapper)).toMatchSnapshot();
});