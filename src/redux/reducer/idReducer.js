export const idReducer = (state = {}, action) => {
  switch (action.type) {
    case 'SET_ID':
      return {
        ...state,
        _id: action.payload,
      };
    default:
      return state;
  }
};
