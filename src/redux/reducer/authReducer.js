export const authReducer = (state = {}, action) => {
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
