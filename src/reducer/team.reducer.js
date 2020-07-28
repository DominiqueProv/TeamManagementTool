const teamReducer = (state, action) => {
  switch (action.type) {
    case 'ADD':
      return [...state, { task: action.task, completed: false }];
    case 'REMOVE':
      return state.filter((todo) => todo.id !== action.id);
    default:
      return state;
  }
};

export default teamReducer;
