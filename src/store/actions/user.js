import * as actionTypes from './actionTypes';

export const addPost = (postData) => {
  return {
    type: actionTypes.ADD_POST,
    postData,
  };
};
