import React from 'react';
import { mount, shallow } from 'enzyme';
import sinon from 'sinon';
import CreateNewComment from '../components/CreateNewComment';
import Comments from '../components/Comments';
import SingleComment from '../components/SingleComment';
import Button from '../components/Button';

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
    const remove = jest.fn();
    const newComment = {
        comment: "this is nonsense!",
        id: "2",
        postId: "565ddy34",
        author:"Zac",
        date: (new Date()).toLocaleString()
      };
    const wrapper = shallow(
      <SingleComment 
        id={newComment.id}
        author={newComment.author}
        onClick={remove}
        currentPersona="Zac"
        comment={newComment.comment}
        date={newComment.date}
      />
    );
    wrapper.find(Button).simulate('click');
    expect(remove).toHaveBeenCalledWith("2");
  });
});
  
  describe('<CreateNewComment />', () => {
    it('onChange should set commment state in <CreateNewComment />', () => {
      const comment = {
          comment: "great stuff!",
          id: "2",
          postId: "565ddy34",
          author:"Zac",
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

