import React from 'react';
import { mount, shallow } from 'enzyme';
import sinon from 'sinon';
import * as api from '../api/index';
import Posts from '../components/Posts';
import SinglePost from '../components/SinglePost';
import fakePosts from '../fakePosts';

beforeEach(() => {
  localStorage.clear();
});

it('calls componentDidMount', () => {
  localStorage.setItem('posts', JSON.stringify(fakePosts.data));
  sinon.spy(Posts.prototype, 'componentDidMount');
  const wrapper = mount(<Posts currentPersona='Zac' />);
  expect(Posts.prototype.componentDidMount.calledOnce).toEqual(true);
  expect(wrapper.state().posts).toHaveLength(3);
  wrapper.unmount();
});

describe('<CreateNewPost', () => {
  it('should create new post', () => {
    const newPost = {
      postTitle: "Craic Dealer",
      postContent: "Something funny here",
      currentPersona: "Zac"
    };
    localStorage.setItem('posts', JSON.stringify(fakePosts.data));
    const wrapper = mount(<Posts currentPersona={newPost.currentPersona} />);
    const form = wrapper.find('form').first();
    const textarea = wrapper.find('#content');
    const input = wrapper.find('#title');
    textarea.simulate('change', {target: {name: 'content', value: newPost.postContent} })
    input.simulate('change', { target: {name: 'title', value: newPost.postTitle} });
    
    form.simulate('submit');
    expect(wrapper.find(SinglePost)).toHaveLength(4);
  });
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
