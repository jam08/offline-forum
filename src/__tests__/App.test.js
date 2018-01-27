import React from 'react';
import { shallow, mount } from 'enzyme';
import sinon from  'sinon';
import App from '../components/App';
import * as api from '../api/index';

beforeEach(() => {
  localStorage.clear();
});

it('calls componentDidMount', () => {
  sinon.spy(App.prototype, 'componentDidMount');
  const wrapper = mount(<App />);
  expect(App.prototype.componentDidMount.calledOnce).toEqual(true);
  wrapper.unmount();
});

it('loads the app', () => {
  const wrapper = shallow(<App />);
  expect(wrapper.find('.mt-8').length).toBe(1);
});


it('loads comments');
it('no x button on other users posts');
it('input component takes users input');
it('should add new post when create button is clicked');
it('should add comment when comment button is clicked');
it('should delete post when x button is clicked');
it('loads bot page when talk to real human button is clicked');
it('get a reply from bot after sicka button is clicked');
it('sicka button should be disable if no message');