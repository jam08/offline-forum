import React from 'react';
import { render, shallow } from 'enzyme';
import App from '../components/App';
import * as api from '../api/index';

it('loads the app', () => {
  const wrapper = shallow(<App />);
  expect(wrapper.find('.mt-8')).to.have.length(1);
});

it('let select a persona');
it('loads posts');
it('loads comments');
it('x button visible for post author');
it('no x button on other users posts');
it('input component takes users input');
it('should add new post when create button is clicked');
it('should add comment when comment button is clicked');
it('should delete post when x button is clicked');
it('loads bot page when talk to real human button is clicked');
it('get a reply from bot after sicka button is clicked');
it('sicka button should be disable if no message');