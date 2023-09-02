const viewProjectReducer = (state = null, action) => {
  switch (action.type) {
    case 'SET_PROJECT_CONTENT':
      return {
        ...state,
        ...action.projectContent
      };
    case 'SET_PROJECT_CONTENT_NULL':
      return {
        ...state
      };
    default:
      return state;
  }
};

export default viewProjectReducer;
