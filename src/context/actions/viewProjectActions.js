export const SET_PROJECT_CONTENT = (projectContent) => {
  return {
    type: 'SET_PROJECT_CONTENT',
    projectContent: projectContent
  };
};

export const SET_PROJECTS_CONTENT_NULL = () => {
  return {
    type: 'SET_PROJECT_CONTENT_NULL'
  };
};
