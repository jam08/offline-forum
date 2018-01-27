import React from 'react';
import { shallow, mount } from 'enzyme';
import { stub } from 'sinon';
import Bot from '../components/Bot/Bot';
import * as api from '../api/index';
import MessageForm from '../components/Bot/MessageForm';

//jest.useFakeTimers();

it('should send message on submit', () => {
  const newMessage = "hello hello";
  const wrapper = mount(<Bot />);
  const input = wrapper.find('input').filterWhere(node => node.props().type === 'text');
  input.simulate('change', { target: {name:'userMessage', value: newMessage} });
  // on submit, a Message component should be created.
  const form = wrapper.find('MessageForm');
  form.simulate('submit', newMessage);
  const message = wrapper.find('p').filterWhere(node => node.text() === newMessage);
  expect(message.text()).toEqual(newMessage);
  expect(wrapper.state().messages[0].bot).toBe(false);

  /* 
  const message = "hello";
  const onSubmit = stub().withArgs('hello');
  const wrapper = mount(<MessageForm onSubmit={onSubmit} />);
  wrapper.find('MessageForm').simulate('submit');
  console.log(onSubmit.firstCall.args);
  expect(onSubmit.calledOnce).toEqual(true);
  */
});
