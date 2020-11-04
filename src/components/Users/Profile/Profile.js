import React, { Component } from 'react';
import classes from './Profile.module.css';

class Profile extends Component {
  render() {
    return (
      <div className={classes.Profile_Container}>
        <img src={this.props.userData.avatar} alt='' />
        <span>name : {this.props.userData.name}</span>
        <span>age : {this.props.userData.age}</span>
        <span>location : {this.props.userData.location}</span>
      </div>
    );
  }
}

export default Profile;
