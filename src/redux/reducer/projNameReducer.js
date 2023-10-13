export const projNameReducer = (state = {}, action) => {
  switch (action.type) {
    case 'SET_PROJNAME':
      return {
        ...state,
        projName: action.payload,
      };
    default:
      return state;
  }
};
