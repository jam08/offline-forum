import React from 'react';
import { mount } from 'enzyme';
import PersonaSwitcher from '../components/PersonaSwitcher';
import App from '../components/App';

it('changes current persona', () => {
  const currentPersona = "Zac";
  const wrapper = mount(<App />);
  wrapper.setState({ currentPersona });
  const select = wrapper.find('select');
  select.simulate('change', { target: {value:'Morgana'} });
  expect(wrapper.find(PersonaSwitcher).props().currentPersona).toEqual('Morgana');
  wrapper.unmount();
});