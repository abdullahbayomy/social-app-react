import React, { Component } from 'react';
import classes from './Post.module.css';
import getDateHandler from '../../../utility/getDateHandler';
import ReactPlayer from 'react-player';

class Post extends Component {
  render() {
    const { name, date, body, img, videos, avatar } = this.props;
    const actualDate = getDateHandler(date);

    return (
      <div className={classes.Post_Container}>
        <div className={classes.Post_Heading}>
          <img src={avatar} alt='' />
          <div>
            <span>{name}</span>
            <span>{actualDate}</span>
          </div>
        </div>
        <div className={classes.Post_Body}>
          <p>{body}</p>
          {img ? <img src={img} alt=''></img> : null}
          {videos ? (
            <ReactPlayer height='300px' width='100%' controls url={videos} />
          ) : null}
        </div>
      </div>
    );
  }
}

export default Post;
