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

describe('<CreateNewComment />', () => {
  it('calls componentDidMout', () => {
    // localStorage.setItem('posts', JSON.stringify(fakePosts.data));
    sinon.spy(Comments.prototype, 'componentDidMount');
    const wrapper = shallow(<Comments postId="565ddy34" currentPersona='Zac' />);
    expect(Comments.prototype.componentDidMount.calledOnce).toEqual(true);
    wrapper.unmount();
  });
  it('should create new comment', () => {
    const currentPersona = "Zac";
    //const submit = sinon.stub(CreateNewComment, 'onSubmit');
    
    const newComment = "Nothing funny here";
   
    const wrapper = mount(<Comments postId="565ddy34" currentPersona={currentPersona} />);
    const form = wrapper.find(CreateNewComment);
    const textarea = wrapper.find('#comment');
    // console.log(textarea);
    textarea.simulate('change', {target: {value: newComment}});
    //console.log(form.props());
  });
});

