export const userDataReducer = (
  state = {
    userData: {
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
    case 'SET_USERDATA':
      return {
        ...state,
        userData: action.payload,
      };
    default:
      return state;
  }
};
