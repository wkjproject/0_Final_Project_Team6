export const userPhoneNumReducer = (state = {}, action) => {
  switch (action.type) {
    case 'SET_USERPHONENUM':
      return {
        ...state,
        userPhoneNum: action.payload,
      };
    default:
      return state;
  }
};
