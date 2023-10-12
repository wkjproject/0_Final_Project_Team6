export const userAddrReducer = (state = {}, action) => {
  switch (action.type) {
    case 'SET_USERADDR':
      return {
        ...state,
        userAddr: action.payload,
      };
    default:
      return state;
  }
};
