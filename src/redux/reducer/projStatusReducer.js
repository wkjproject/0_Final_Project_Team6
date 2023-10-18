export const projStatusReducer = (state = {}, action) => {
  switch (action.type) {
    case 'SET_PROJSTATUS':
      return {
        ...state,
        projStatus: action.payload,
      };
    default:
      return state;
  }
};
