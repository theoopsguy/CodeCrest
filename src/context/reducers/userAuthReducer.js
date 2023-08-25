const userAuthReducer = (state = null, action) => {
  switch (action.type) {
    case 'SET_USER':
      return {
        ...state,
        ...action.user
      };
    case 'SET_USER_NULL':
      return {
        ...state
      };
    default:
      return state;
  }
};

export default userAuthReducer;
