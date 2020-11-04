import React, { Component } from 'react';
import Post from './Post/Post';

class PostsController extends Component {
  render() {
    const posts = this.props.posts.sort(
      (a, b) => new Date(b.date) - new Date(a.date)
    );

    return posts.map((post, index) => (
      <Post
        key={index}
        id={index}
        name={this.props.name}
        body={post.body}
        date={post.date}
        img={post.img}
        videos={post.videos}
        avatar={this.props.avatar}
      />
    ));
  }
}

export default PostsController;
