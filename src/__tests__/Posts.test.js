import React from 'react';
import { shallow, mount } from 'enzyme';
import sinon from 'sinon';
import Posts from '../components/Posts';
import fakePosts from '../fakePosts';
import SinglePost from '../components/SinglePost';

beforeEach(() => {
  localStorage.clear();
});

describe('<Posts />', () => {
  it('calls componentDidMount', () => {
    sinon.spy(Posts.prototype, 'componentDidMount');
    shallow(<Posts currentPersona='Zac' />);
    expect(Posts.prototype.componentDidMount.calledOnce).toEqual(true);
  });

  it('render all posts', () => {
    localStorage.setItem('posts', JSON.stringify(fakePosts.data));
    const wrapper = shallow(<Posts currentPersona='Zac' /> );
    const posts =  wrapper.state().posts.length;
    expect(posts).toBe(3);
  });
});

describe('<SinglePost />', () => {
  const remove = jest.fn();
  const postId = "565ddy34";
  const date = (new Date()).toLocaleString();
  function componentWrapper(mockFunc) {
    return mount(
      <SinglePost 
        title="hello" 
        content="bla bla" 
        author="Zac"
        id={postId} 
        date={date} 
        currentPersona="Zac" 
        onClick={mockFunc} 
      />
    );
  }
  it('onClick is called with right parameters', () => {
    const wrapper = componentWrapper(remove);
    const button = wrapper.find('button');
    button.simulate('click');
    expect(remove).toHaveBeenCalledWith(postId);
  });

  it('delete button should not be visible if currentPersona is not author', () => {
    const postId = "565ddy34";
    const date = (new Date()).toLocaleString()
    const wrapper = mount(
      <SinglePost 
        title="hello" 
        content="bla bla" 
        author="Zac"
        id={postId} 
        date={date} 
        currentPersona="Morgana" 
        onClick={() => {}} 
      />);
    const button = wrapper.find('button');
    expect(button).toHaveLength(0);
  });
});



