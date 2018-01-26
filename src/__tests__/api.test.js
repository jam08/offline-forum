import React from 'react';
import * as api from '../api/index';

beforeEach(() =>{
  localStorage.clear();
});

afterEach(() =>{
  localStorage.clear();
});

it('should store current persona', () => {
  const persona = "Joshua";
  api.storeCurrentPersona(persona);
  const getPersona = api.fetchCurrentPersona();
  expect(getPersona).toBe(persona);
});