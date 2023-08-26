const projectReducer = (state = null, action) => {
  switch (action.type) {
    case 'SET_PROJECTS':
      return {
        ...state,
        ...action.projects
      };
    case 'SET_PROJECTS_NULL':
      return {
        ...state
      };
    default:
      return state;
  }
};

export default projectReducer;
