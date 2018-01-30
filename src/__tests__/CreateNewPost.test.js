import React from 'react';
import { mount, shallow } from 'enzyme';
import sinon from 'sinon';
// import * as api from '../api/index';
import Posts from '../components/Posts';
import CreateNewPost from '../components/CreateNewPost';
import SinglePost from '../components/SinglePost';
import fakePosts from '../fakePosts';
import CreateNewComment from '../components/CreateNewComment';
import Comments from '../components/Comments';

describe('<CreateNewPost />', () => {
  it('calls preventDefault on submit', () => {
    const preventDefault = jest.fn();
    const createNewPost = shallow(
      <CreateNewPost 
        updatePosts={() => {}}
        author='Zac'
      />
    );
    createNewPost.find('#title').simulate('change', { target: {name: 'title', value: "newpost"} });
    createNewPost.find('#content').simulate('change', { target: {name: 'content', value: "nonsense"} });
    createNewPost.find('form').simulate('submit', { preventDefault });
    expect(preventDefault).toHaveBeenCalled();
  });

  it('clear state on submit', () => {
    const createNewPost = shallow(
      <CreateNewPost 
        updatePosts={() => {}}
        author='Zac'
      />
    );
    createNewPost.find('#title').simulate('change', { target: {name: 'title', value: "newpost"} });
    createNewPost.find('#content').simulate('change', { target: {name: 'content', value: "nonsense"} });
    createNewPost.find('form').simulate('submit', { preventDefault() {} });
    expect(createNewPost.state().title).toBe('');
  });

  it.skip('CreateNewPost calls on onChange', () => {
    const submit = jest.fn();
    const createNewPost = shallow(
      <CreateNewPost 
        updatePosts={() => {}}
        author='Zac'
      />
    );
    createNewPost.find('#title').simulate('change', { target: {name: 'title', value: "newpost"} });
    createNewPost.find('#content').simulate('change', { target: {name: 'content', value: "nonsense"} });
    createNewPost.find('form').simulate('submit', { preventDefault() {} });
    // console.log(createNewPost.state());
    expect(submit).toHaveBeenCalled();
  });
});