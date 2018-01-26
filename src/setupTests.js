import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });
/*
const localStorageMock = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  clear: jest.fn()
};
// */
///*
const localStorageMock = (() => {
  let store = {}
  return {
    getItem: jest.fn(key => store[key]),
    setItem: jest.fn((key, value) => {
      store[key] = value.toString();
    }),
    clear: jest.fn(() => {
      store = {}
    }),
    removeItem: jest.fn(key => {
      delete store[key];
    })
  }
});
// */

global.localStorage = localStorageMock();
