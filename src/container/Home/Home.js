import React, { Component } from 'react';
import classes from './Home.module.css';
import ReactPlayer from 'react-player';
import { connect } from 'react-redux';
import * as actions from '../../store/actions/index';

// child Component
import PostsController from '../../components/Posts/PostsController';
import MyProfile from '../../components/Users/Profile/Profile';
import Modal from '../../components/UI/Modal/Modal';
import Backdrop from '../../components/UI/Backdrop/Backdrop';

class Home extends Component {
  constructor(props) {
    super(props);
    this.text = React.createRef();
  }

  state = {
    posts: null,
    search: false,
    showModal: false,
    image: null,
    videos: null,
    textField: '',
  };

  showModalHandler = () => {
    this.setState({ showModal: !this.state.showModal });
  };

  changeHandler = (e) => {
    let input = this.state.textField;
    input = e.target.value;
    this.setState({ textField: input });
  };

  addImageHandler = (e) => {
    // this.setState({ image: null, videos: null });
    const files = e.target.files[0];
    const reader = new FileReader();
    reader.onload = () => {
      if (reader.readyState === 2) {
        if (reader.result.split(':')[1].split('/')[0] === 'image') {
          this.setState({ image: reader.result, showModal: true });
        }
        if (reader.result.split(':')[1].split('/')[0] === 'video') {
          this.setState({ videos: reader.result, showModal: true });
        }
      }
    };
    if (files) {
      reader.readAsDataURL(files);
    }
  };

  openAddImageHandler = () => {
    const fileInput = document.getElementById('imageInput');
    fileInput.click();
  };

  submitHandler = () => {
    const { image, videos, textField } = this.state;
    const d = new Date();
    const postData = {
      date: `${d}`,
      body: textField,
      img: image,
      videos,
    };
    this.props.addPost(postData);
    document.getElementById('textareaContent').value = '';
    this.setState({
      showModal: false,
      image: null,
      videos: null,
      textField: '',
    });
  };

  filtered = (input) => {
    let filter = this.props.usersData[0].posts.filter((post) => {
      // console.log(post);
      const regex = new RegExp(`${input}`, 'gi');
      return post.body.match(regex);
    });
    this.setState({ posts: filter });
  };

  changeSearchHandler = (e) => {
    if (this.text.current.value !== '') {
      this.filtered(e.target.value);
      this.setState({ search: true });
    } else {
      this.setState({ search: false });
    }
  };

  render() {
    if (this.state.showModal) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }

    return (
      <div className='container'>
        <div className={classes.Content_Conatiner}>
          <div className={classes.Posts_Container}>
            {!this.state.search ? (
              <div className={classes.Create_post_Container}>
                <div className={classes.Avatar_Container}>
                  <img src={this.props.usersData[0].avatar} alt=''></img>
                  <div onClick={this.showModalHandler}>
                    what's on your mind, {this.props.usersData[0].name} ?
                  </div>
                </div>

                <div className={classes.Icons}>
                  <div
                    onClick={this.openAddImageHandler}
                    className={classes.Icon_Container}
                  >
                    <i className='fas fa-photo-video'></i>
                    <span>Photo/Video</span>
                  </div>
                </div>
              </div>
            ) : null}

            <div className={classes.Modal_container}>
              <Backdrop
                show={this.state.showModal}
                clicked={this.showModalHandler}
              />

              <Modal show={this.state.showModal}>
                <div className={classes.Content_Container}>
                  <textarea
                    name='textField'
                    id='textareaContent'
                    placeholder={`what's on your mind, ${this.props.usersData[0].name} ?`}
                    onChange={this.changeHandler}
                  ></textarea>

                  {this.state.image ? (
                    <img src={this.state.image} alt=''></img>
                  ) : null}
                  {this.state.videos ? (
                    <ReactPlayer
                      height='300px'
                      width='100%'
                      controls
                      url={this.state.videos}
                    />
                  ) : null}
                </div>

                <input
                  type='file'
                  id='imageInput'
                  hidden='hidden'
                  onChange={this.addImageHandler}
                />

                <div className={classes.SubmitPost_Container}>
                  <div
                    onClick={this.openAddImageHandler}
                    className={classes.Icon_Container}
                  >
                    <i className='fas fa-photo-video'></i>
                    <span>Photo/Video</span>
                  </div>
                  <button onClick={this.submitHandler} className={classes.Btn}>
                    Submit
                  </button>
                </div>
              </Modal>
            </div>

            {this.state.search ? (
              <PostsController
                posts={this.state.posts}
                name={this.props.usersData[0].name}
                avatar={this.props.usersData[0].avatar}
              />
            ) : (
              <PostsController
                posts={this.props.usersData[0].posts}
                name={this.props.usersData[0].name}
                avatar={this.props.usersData[0].avatar}
              />
            )}
          </div>
          <div className={classes.User_Container}>
            <MyProfile userData={this.props.usersData[0]} />
            <div className={classes.SearchBar}>
              <i className='fas fa-search'></i>
              <input
                type='text'
                name=''
                id=''
                placeholder='Search Post'
                ref={this.text}
                onChange={this.changeSearchHandler}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    usersData: state.users.usersData,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addPost: (postData) => dispatch(actions.addPost(postData)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
