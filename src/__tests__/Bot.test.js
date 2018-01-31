import React from 'react';
import { shallow, mount } from 'enzyme';
import { stub } from 'sinon';
import Bot from '../components/Bot/Bot';
import * as api from '../api/index';
import MessageForm from '../components/Bot/MessageForm';

function flushAllPromises() {
  return new Promise(resolve => setImmediate(resolve));
}

jest.useFakeTimers();

describe('<MessageForm />', () => {
  it('MessageFrom state should have user message', () => {
    const wrapper = shallow(<MessageForm onSubmit={() => {}} />);
    const input= wrapper.find('input').filterWhere(node => node.props().type === "text");
    input.simulate('change', {target: {name: 'userMessage', value: "hello, hello"} });
    expect(wrapper.state().userMessage).toEqual("hello, hello");
  });

  it('calls preventDefault on submit', () => {
    const preventDefault = jest.fn();
    const wrapper = shallow(<MessageForm onSubmit={() => {}} />);
    wrapper.find('form').simulate('submit', { preventDefault });
    expect(preventDefault).toHaveBeenCalled();
  });

  it('resets userMessage on submit', () => {
    const wrapper = shallow(<MessageForm onSubmit={() => {}} />);
    const input= wrapper.find('input').filterWhere(node => node.props().type === "text");
    input.simulate('change', {target: {name: 'userMessage', value: "hello"} });
    wrapper.find('form').simulate('submit', { preventDefault() {} });
    expect(wrapper.state().userMessage).toBe('');
  });
});

describe('<Bot />', () => {
  it('typing and message state changes on submit', () => {
    const usermsg = "hello";
    const wrapper = shallow(<Bot />);
    const messageForm = wrapper.find('MessageForm');
    messageForm.simulate('submit', usermsg);
    expect(wrapper.state().message).not.toBe([]);
    // console.log(wrapper.state());
  });

  it('gets a bot reply on submit', async() => {
    const usermsg = "hello";
    const wrapper = shallow(<Bot />);
    const messageForm = wrapper.find(MessageForm);
    messageForm.simulate('submit', usermsg);
    jest.runAllTimers();
    await flushAllPromises()
    // console.log(wrapper.state());
    expect(wrapper.state().messages[1].bot).toBe(true);
  });
});

