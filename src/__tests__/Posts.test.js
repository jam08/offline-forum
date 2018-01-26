import React from 'react';
import { mount, shallow } from 'enzyme';
// import App from '../components/Posts';
import * as api from '../api/index';
import Posts from '../components/Posts';
import SinglePost from '../components/SinglePost';
// import CreateNewPost from '../components/CreateNewPost';
import fakePosts from '../fakePosts';


it('should load all posts', () => {
  localStorage.setItem('posts', JSON.stringify(fakePosts.data));
  const wrapper = shallow(<Posts currentPersona='Zac' />);
  // const container = wrapper.find(CreateNewPost);
  // console.log(wrapper.find(SinglePost).first().html());
  expect(wrapper.find(SinglePost)).toHaveLength(3);
});

it('create post', () => {
  const newPost = api.createPostObject('Craic Dealer', 'Something funny here', 'Dara OBrien');
  localStorage.setItem('posts', JSON.stringify(fakePosts.data));
  const fetchedPosts = api.fetchAllPosts();
  api.storePostObject([newPost, ...fetchedPosts]);
  const wrapper = shallow(<Posts currentPersona='Dara OBrien' />);
  expect(wrapper.find(SinglePost)).toHaveLength(4);
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

it('x button is visible', () => {
  const currentPersona = "Zac";
  localStorage.setItem('posts', JSON.stringify(fakePosts.data));
  const wrapper = mount(<Posts currentPersona={currentPersona} />);
  const author = wrapper.find(SinglePost).filterWhere(node => node.props().author === `${currentPersona}`);
  // console.log(author.find('button'));
  expect(author.find('button').text()).toEqual('x');
});

it('x button is not visible', () => {
  const currentPersona = "Zac";
  localStorage.setItem('posts', JSON.stringify(fakePosts.data));
  const wrapper = mount(<Posts currentPersona={currentPersona} />);
  const author = wrapper.find(SinglePost).filterWhere(node => node.props().author !== `${currentPersona}`);
  expect(author.find('button')).toHaveLength(0);
});
