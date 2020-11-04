import * as actionTypes from '../actions/actionTypes';
import img1 from '../../assets/image/item1.jpg';
import img2 from '../../assets/image/item2.jpg';
import video1 from '../../assets/video/video1.mp4';
import avatar from '../../assets/avatar/av1.jpg';

const initialState = {
  usersData: [
    {
      id: 1,
      name: 'abdullah Bayomy',
      age: 26,
      location: 'cairo',
      avatar: avatar,
      posts: [
        {
          date:
            'Tue Nov 02 2020 00:39:49 GMT+0200 (Eastern European Standard Time)',
          body: `the act of composing and sending electronic messages`,
          img: null,
          videos: null,
        },
        {
          date:
            'Tue Nov 02 2020 00:47:39 GMT+0200 (Eastern European Standard Time)',
          body: `
          Text messaging  Wikipediaen.wikipedia.org  wiki, or texting, is , typically consisting of alphabetic and numeric characters`,
          img: img1,
          videos: null,
        },
        {
          date:
            'Tue Nov 02 2020 00:59:39 GMT+0200 (Eastern European Standard Time)',
          body: `we have courses, lessons and activities which lead to internationally recognised qualifications`,
          img: null,
          videos: video1,
        },
        {
          date:
            'Tue Nov 03 2020 02:54:16 GMT+0200 (Eastern European Standard Time) ',
          body: `Practise and improve your English language skills from beginner to advanced level. Choose which skill you want to practise today, then find your level and start ...
          `,
          img: null,
          videos: null,
        },
        {
          date:
            'Tue Nov 03 2020 03:54:16 GMT+0200 (Eastern European Standard Time) ',
          body: `this website created by Abdullah bayomy 
          - email: abdullah.bayomy11@gamil.com `,
          img: img2,
          videos: null,
        },
      ],
    },
  ],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ADD_POST:
      const newPost = state.usersData[0].posts.concat(action.postData);
      let newUsersData = state.usersData;
      newUsersData[0].posts = newPost;
      return {
        ...state,
        usersData: newUsersData,
      };
    default:
      return state;
  }
};

export default reducer;
