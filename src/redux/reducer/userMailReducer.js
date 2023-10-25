export const userMailReducer = (state = {}, action) => {
  switch (action.type) {
    case 'SET_USERMAIL':
      return {
        ...state,
        userMail: action.payload,
      };
    default:
      return state;
  }
};
