import React from 'react';
import { mount, shallow } from 'enzyme';
import sinon from 'sinon';
// import * as api from '../api/index';
// import Posts from '../components/Posts';
// import CreateNewPost from '../components/CreateNewPost';
// import SinglePost from '../components/SinglePost';
// import fakePosts from '../fakePosts';
import CreateNewComment from '../components/CreateNewComment';
import Comments from '../components/Comments';
import SingleComment from '../components/SingleComment';

describe('<Commments />', () => {
  it('calls componentDidMout', () => {
    sinon.spy(Comments.prototype, 'componentDidMount');
    shallow(<Comments postId="565ddy34" currentPersona='Zac' />);
    expect(Comments.prototype.componentDidMount.calledOnce).toEqual(true);
  });

  it('should render all comments for a post', () => {
    const newComment = [
      {
        comment: "this is shite!",
        id: "2",
        postId: "565ddy34",
        author:"Esmeralda",
        date: (new Date()).toLocaleString()
      }
    ];
    const stringifiedObject = JSON.stringify(newComment);
    localStorage.setItem('comments', stringifiedObject);
    const wrapper = shallow(<Comments postId="565ddy34" currentPersona='Zac' />);
    expect(wrapper.state().comments).not.toBe([]);
  });

  it('onClick to remove comment is called', () => {
    const click = jest.fn();
    const comment = {
        comment: "this is shite!",
        id: "2",
        postId: "565ddy34",
        author:"Esmeralda",
        date: (new Date()).toLocaleString()
      };
    const wrapper = mount(
      <SingleComment
        {...comment}
        key={comment.id}
        onClick={click}
        currentPersona="Esmeralda"
      />
    );
    wrapper.find('button').simulate('click');
    expect(click).toHaveBeenCalled();
    wrapper.unmount();
  });

  it('should remove comment on click', () => {
    const newComment = [
      {
        comment: "this is shite!",
        id: "2",
        postId: "565ddy34",
        author:"Esmeralda",
        date: (new Date()).toLocaleString()
      }
    ];
    const stringifiedObject = JSON.stringify(newComment);
    localStorage.setItem('comments', stringifiedObject);
    const wrapper = shallow(<Comments postId="565ddy34" currentPersona='Zac' />);
    expect(wrapper.state().comments).not.toEqual([]);
    wrapper.find(SingleComment).simulate('click', "2");
    expect(wrapper.state().comments).toEqual([]);
  });
});
  
  describe('<CreateNewComment />', () => {
    it('should set comment state with new commment', () => {
      const comment = {
          comment: "great stuff!",
          id: "2",
          postId: "565ddy34",
          author:"Esmeralda",
          date: (new Date()).toLocaleString()
      };
      const wrapper = mount(
        <CreateNewComment 
          postId="565ddy34" 
          author={comment.author} 
          updateComments={() => {}} 
        />
      );
      const textarea = wrapper.find('#comment');
      textarea.simulate('change', {target: {name: 'comment', value: comment.comment}});
      expect(wrapper.state().comment).toEqual(comment.comment);
      wrapper.unmount();
    });
  
    it('reset state on submit', () => {
      const wrapper = mount(
        <CreateNewComment 
          postId="565ddy34" 
          author="Esmeralda"
          updateComments={() => {}} 
        />
      );
      wrapper.setState({comment: "Time to go"});
      expect(wrapper.state().comment).toEqual("Time to go");
      wrapper.simulate('submit');
      expect(wrapper.state().comment).toEqual('');      
    });
  });

