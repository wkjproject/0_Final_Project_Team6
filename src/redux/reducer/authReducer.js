export const authReducer = (
  state = {
    auth: {
      _id: null,
      isLogin: false,
      isAdmin: false,
      userId: null,
      userAddr: null,
      userName: null,
      userPhoneNum: null,
      userMail: null,
    },
  },
  action
) => {
  switch (action.type) {
    case 'SET_AUTHUSER':
      return {
        ...state,
        auth: action.payload,
      };
    default:
      return state;
  }
};
