const todo = (state, action) => {
  switch (action.type) {
    case "ADD_TODO":
      return { id: 0, text: action.text, completed: false };
    case "TODO_TOGGLE":
      if (state.id != action.id) {
        return state;
      }
      return { ...state, completed: !state.completed };
    default:
      return state;
  }
};

const todos = (state = [], action) => {
  switch (action.type) {
    case "ADD_TODO":
      return [...state, todo(undefined, action)];
    case "TODO_TOGGLE":
      state.map(t => todo(t, action));
    default:
      return state;
  }
};

const visibilityFilter = (state = "SHOW_ALL", action) => {
  switch (action.type) {
    case "SET_VISIBILITY_FILTER":
      return action.filter;
    default:
      return state;
  }
};

const todoApp = (state = {}, action) => {
  return {
    todos: todo(state.todos, action),
    visibilityFilter: visibilityFilter(state.visibilityFilter, action)
  };
};

const testAddTodo = () => {
  const stateBefore = [];
  const action = {
    type: "ADD_TODO",
    id: 0,
    text: "Testing"
  };
  const stateAfter = [
    {
      id: 0,
      text: "Testing",
      completed: false
    }
  ];

  deepFreeze(stateBefore);
  deepFreeze(action);

  expect(todos(stateBefore, action)).toEqual(stateAfter);
};

const testToggleTodo = () => {
  const stateBefore = [
    { id: 0, text: "Testing", completed: false },
    { id: 1, text: "Another Test", completed: false }
  ];
  const action = {
    type: "TODO_TOGGLE",
    id: 1
  };
  const stateAfter = [
    { id: 0, text: "Testing", completed: false },
    { id: 1, text: "Another Test", completed: true }
  ];
};

const { createStore } = Redux;
const store = createStore(todoApp);

store.dispatch({
  type: "ADD_TODO",
  id: 0,
  text: "Again Redux"
});
console.log(store.getState());
store.dispatch({
  type: "TODO_TOGGLE",
  id: 0
});
console.log(store.getState());
store.dispatch({
  type: "SET_VISIBILITY_FILTER",
  filter: "SHOW_COMPLETED"
});
console.log(store.getState());
