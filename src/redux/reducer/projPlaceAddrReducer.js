export const projPlaceAddrReducer = (state = {}, action) => {
  switch (action.type) {
    case 'SET_PROJPLACEADDR':
      return {
        ...state,
        projPlaceAddr: action.payload,
      };
    default:
      return state;
  }
};
