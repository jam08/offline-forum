import * as api from '../api/index';

it('should store current persona', () => {
  const persona = "Joshua";
  api.storeCurrentPersona(persona);
  const getPersona = api.fetchCurrentPersona();
  expect(getPersona).toBe(persona);
});

it('do not create post if title field missing', () => {
  expect(() => {
    api.createPostObject('', 'Something funny here', 'Dara OBrien')
  }).toThrowError('Missing title');
});

it('do not create post if content field missing', () => {
  expect(() => {
    api.createPostObject('Craic Dealer', '', 'Dara OBrien')
  }).toThrowError('Missing content');
});